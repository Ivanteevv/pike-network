"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import styles from "./age-gate.module.css";
import { AGE_GATE_SESSION_KEY, LEGAL_AGE } from "@/lib/age-gate";

const EXIT_DURATION_MS = 520;

function subscribeToAgeGateApproval(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event) => {
    if (event.key === null || event.key === AGE_GATE_SESSION_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("age-gate-change", callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("age-gate-change", callback);
  };
}

function getAgeGateApprovalSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(AGE_GATE_SESSION_KEY) === "verified";
}

function blockScroll(shouldBlock) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const htmlOverflow = document.documentElement.style.overflow;
  const bodyOverflow = document.body.style.overflow;

  if (shouldBlock) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.documentElement.style.overflow = htmlOverflow;
    document.body.style.overflow = bodyOverflow;
  };
}

export function AgeGate() {
  const isSessionApproved = useSyncExternalStore(
    subscribeToAgeGateApproval,
    getAgeGateApprovalSnapshot,
    () => false
  );
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const exitTimeoutRef = useRef(null);
  const isVisible = isClosing || !isSessionApproved;

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return undefined;
    }

    if (!isVisible) {
      if (dialog.open) {
        dialog.close();
      }

      return undefined;
    }

    if (!dialog.open) {
      dialog.showModal();
      dialog.focus();
    }

    return undefined;
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      delete document.documentElement.dataset.ageGate;
      return undefined;
    }

    document.documentElement.dataset.ageGate = "approved";
    return undefined;
  }, [isVisible]);

  useEffect(() => blockScroll(isVisible), [isVisible]);

  if (!isVisible) {
    return null;
  }

  function handleConfirm() {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    window.sessionStorage.setItem(AGE_GATE_SESSION_KEY, "verified");
    window.dispatchEvent(new Event("age-gate-change"));

    exitTimeoutRef.current = window.setTimeout(() => {
      setIsClosing(false);
    }, EXIT_DURATION_MS);
  }

  function handleExit() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.replace("https://yandex.ru/");
  }

  const confirmLabel = `Да, мне есть ${LEGAL_AGE}`;
  const confirmHoverLabel = "Добро пожаловать";
  const exitLabel = "Нет";
  const exitHoverLabel = "До встречи";

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.overlay} ${
        isClosing ? styles.overlayClosing : ""
      }`}
      tabIndex={-1}
      data-age-gate-overlay="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-description"
      onCancel={(event) => event.preventDefault()}
    >
      <div className={styles.backdrop} />
      <section className={styles.panel}>
        <div className={styles.brand}>Щука</div>
        <h1 id="age-gate-title" className={styles.title}>
          Вам уже есть 18?
        </h1>
        <p id="age-gate-description" className={styles.description}>
          На сайте есть информация о баре, напитках и событиях. Подтвердите
          возраст, чтобы продолжить.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            aria-label={confirmLabel}
            className={cx(
              buttonStyles.buttonBase,
              buttonStyles.buttonFillAction,
              buttonStyles.buttonFillPositive,
              buttonStyles.buttonLg,
              styles.actionButton
            )}
            onClick={handleConfirm}
          >
            <span className={buttonStyles.buttonLabelRoll} aria-hidden="true">
              <span className={buttonStyles.buttonLabelCurrent}>{confirmLabel}</span>
              <span className={buttonStyles.buttonLabelNext}>{confirmHoverLabel}</span>
            </span>
          </button>
          <button
            type="button"
            aria-label={exitLabel}
            className={cx(
              buttonStyles.buttonBase,
              buttonStyles.buttonFillAction,
              buttonStyles.buttonFillNegative,
              buttonStyles.buttonLg,
              styles.actionButton
            )}
            onClick={handleExit}
          >
            <span className={buttonStyles.buttonLabelRoll} aria-hidden="true">
              <span className={buttonStyles.buttonLabelCurrent}>{exitLabel}</span>
              <span className={buttonStyles.buttonLabelNext}>{exitHoverLabel}</span>
            </span>
          </button>
        </div>
      </section>
    </dialog>
  );
}
