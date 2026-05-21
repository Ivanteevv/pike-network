"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import { lockPageScroll, unlockPageScroll } from "@/lib/client-scroll-lock";
import { getRenderableMenus } from "@/lib/content/content-guards";
import styles from "./menu-pdf-viewer.module.css";

const MENU_SCROLL_LOCK_ID = "menu-pdf-viewer";
const LIGHTBOX_EXIT_MS = 200;
const MOBILE_PDF_NEW_TAB = "new-tab";

function getMobilePdfLinkProps(menu) {
  if (menu.mobilePdfOpenMode !== MOBILE_PDF_NEW_TAB) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noopener noreferrer",
  };
}

export function MenuPdfViewer({ menus = [] }) {
  const availableMenus = useMemo(
    () => getRenderableMenus(menus),
    [menus]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const activeMenu = availableMenus[activeIndex] ?? availableMenus[0];

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return undefined;
    }

    if (!isOpen) {
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
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      unlockPageScroll(MENU_SCROLL_LOCK_ID);
      return undefined;
    }

    return lockPageScroll(MENU_SCROLL_LOCK_ID);
  }, [isOpen]);

  if (availableMenus.length === 0) {
    return null;
  }

  function openMenu(index) {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setActiveIndex(index);
    setIsClosing(false);
    setIsOpen(true);
  }

  function closeMenu() {
    if (isClosing) {
      return;
    }

    setIsClosing(true);

    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      const dialog = dialogRef.current;

      if (dialog?.open) {
        dialog.close();
      }

      setIsOpen(false);
      setIsClosing(false);
    }, LIGHTBOX_EXIT_MS);
  }

  return (
    <div className={styles.menuViewer}>
      <div className={styles.menuLinks} aria-label="PDF меню">
        {availableMenus.map((menu, index) => {
          const actionClassName = cx(
            buttonStyles.buttonBase,
            buttonStyles.buttonGhostAction,
            styles.menuLink
          );

          return (
            <div key={menu.title} className={styles.menuAction}>
              <button
                type="button"
                className={cx(actionClassName, styles.desktopMenuAction)}
                onClick={() => openMenu(index)}
              >
                {menu.title}
              </button>
              <a
                className={cx(actionClassName, styles.mobileMenuAction)}
                href={menu.href}
                {...getMobilePdfLinkProps(menu)}
              >
                {menu.title}
              </a>
            </div>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        data-state={isClosing ? "closing" : isOpen ? "open" : "closed"}
        tabIndex={-1}
        aria-label={activeMenu ? `Просмотр PDF: ${activeMenu.title}` : "Просмотр PDF"}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          setIsOpen(false);
          setIsClosing(false);
        }}
      >
        <button
          type="button"
          className={styles.backdrop}
          onClick={closeMenu}
          aria-label="Закрыть меню"
        />

        <button
          type="button"
          className={styles.closeButton}
          onClick={closeMenu}
          aria-label="Закрыть меню"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.viewerStage}>
          <div className={styles.pageStack}>
            {activeMenu.previewImages.map((image) => (
              <Image
                key={image.src}
                className={styles.menuImage}
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1190}
                height={image.height ?? 1684}
                sizes="(max-width: 759px) 100vw, min(73vw, 1167px)"
              />
            ))}
          </div>
        </div>

        <a
          className={styles.pdfLink}
          href={activeMenu.href}
          target="_blank"
          rel="noreferrer"
        >
          Открыть PDF
        </a>
      </dialog>
    </div>
  );
}
