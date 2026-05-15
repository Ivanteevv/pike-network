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

export function RollingNumber({ value, total, format = formatRollingNumber }) {
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
  const currentText = format(renderState.value);
  const previousText = format(renderState.previousValue);
  const digitCount = Math.max(currentText.length, previousText.length);
  const currentDigits = currentText.padStart(digitCount, "0").split("");
  const previousDigits = previousText.padStart(digitCount, "0").split("");

  return (
    <span
      className={styles.rollingNumber}
      data-direction={renderState.direction}
      role="text"
      aria-label={format(value)}
    >
      <span className={styles.rollingNumberDigits} aria-hidden="true">
        {currentDigits.map((currentDigit, index) => {
          const previousDigit = previousDigits[index];
          const isDigitRolling = isRolling && previousDigit !== currentDigit;

          return (
            <span
              key={`${index}-${previousDigit}-${currentDigit}-${renderState.direction}`}
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
