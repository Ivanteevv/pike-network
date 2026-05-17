"use client";

import { useState } from "react";
import styles from "./rolling-number.module.css";

export function formatRollingNumber(value) {
  return String(value).padStart(2, "0");
}

function getRollingDirection(previousValue, nextValue, total) {
  if (previousValue === nextValue) {
    return "none";
  }

  if (previousValue === total && nextValue === 1) {
    return "next";
  }

  if (previousValue === 1 && nextValue === total) {
    return "previous";
  }

  return nextValue > previousValue ? "next" : "previous";
}

function clampProgress(progress) {
  return Math.max(0, Math.min(1, progress));
}

export function RollingNumber({
  value,
  total,
  format = formatRollingNumber,
  previewValue,
  progress = 0,
  direction: controlledDirection = "next",
  animateProgress = false,
}) {
  const [displayState, setDisplayState] = useState({
    value,
    previousValue: value,
    direction: "none",
  });

  let renderState = displayState;

  if (displayState.value !== value) {
    renderState = {
      value,
      previousValue: displayState.value,
      direction: getRollingDirection(displayState.value, value, total),
    };

    setDisplayState(renderState);
  }

  const isRolling = renderState.previousValue !== renderState.value;
  const controlledProgress = clampProgress(progress);
  const isControlled =
    previewValue !== undefined &&
    previewValue !== value &&
    (controlledProgress > 0 || animateProgress);
  const currentText = format(isControlled ? previewValue : renderState.value);
  const previousText = format(isControlled ? value : renderState.previousValue);
  const digitCount = Math.max(currentText.length, previousText.length);
  const currentDigits = currentText.padStart(digitCount, "0").split("");
  const previousDigits = previousText.padStart(digitCount, "0").split("");
  const direction = isControlled ? controlledDirection : renderState.direction;

  return (
    <span
      className={styles.rollingNumber}
      data-direction={direction}
      data-mode={isControlled ? "controlled" : "auto"}
      data-progress-motion={animateProgress ? "animated" : "direct"}
      role="text"
      aria-label={format(value)}
      style={{ "--rolling-progress": controlledProgress }}
    >
      <span className={styles.rollingNumberDigits} aria-hidden="true">
        {currentDigits.map((currentDigit, index) => {
          const previousDigit = previousDigits[index];
          const isDigitRolling =
            (isControlled || isRolling) && previousDigit !== currentDigit;

          return (
            <span
              key={`${index}-${previousDigit}-${currentDigit}-${direction}`}
              className={styles.rollingDigit}
              data-rolling={isDigitRolling ? "true" : "false"}
            >
              <span className={styles.rollingNumberTrack}>
                {isDigitRolling ? (
                  <span className={styles.rollingNumberPrevious}>
                    {previousDigit}
                  </span>
                ) : null}
                <span className={styles.rollingNumberCurrent}>
                  {currentDigit}
                </span>
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
