"use client";

import { useState } from "react";
import Image from "next/image";
import buttonStyles from "@/components/button.module.css";
import { RollingNumber, formatRollingNumber } from "@/components/rolling-number";
import { cx } from "@/lib/class-names";
import styles from "./bar-broadcasts.module.css";

export function BarBroadcasts({ broadcasts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBroadcast = broadcasts[activeIndex];
  const hasMultipleBroadcasts = broadcasts.length > 1;

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? broadcasts.length - 1 : currentIndex - 1
    );
  }

  function showNext() {
    setActiveIndex((currentIndex) =>
      currentIndex === broadcasts.length - 1 ? 0 : currentIndex + 1
    );
  }

  if (!activeBroadcast) {
    return null;
  }

  return (
    <div className={styles.broadcastShell}>
      <article className={styles.broadcastCard}>
        <div className={styles.broadcastMedia}>
          <Image
            key={activeBroadcast.image.src}
            src={activeBroadcast.image.src}
            alt={activeBroadcast.image.alt}
            fill
            sizes="(max-width: 759px) 100vw, (max-width: 1160px) 48vw, 540px"
            className={styles.broadcastImage}
          />
        </div>

        <div className={styles.broadcastCopy}>
          <div className={styles.broadcastTopline}>
            <p className={styles.broadcastStatus}>{activeBroadcast.status}</p>
            <div className={styles.broadcastCounter} aria-label="Номер трансляции">
              <RollingNumber
                value={activeIndex + 1}
                total={broadcasts.length}
              />
              <span className={styles.broadcastCounterDivider}>/</span>
              <span>{formatRollingNumber(broadcasts.length)}</span>
            </div>
          </div>

          <div className={styles.broadcastMain}>
            <p className={styles.broadcastTime}>{activeBroadcast.timeLabel}</p>
            <h3>{activeBroadcast.title}</h3>
            <p>{activeBroadcast.description}</p>
          </div>

          {hasMultipleBroadcasts ? (
            <div className={styles.broadcastControls}>
              <button
                type="button"
                className={cx(
                  buttonStyles.buttonBase,
                  buttonStyles.buttonUtility,
                  styles.broadcastNavButton
                )}
                onClick={showPrevious}
                aria-label="Предыдущая трансляция"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className={cx(
                  buttonStyles.buttonBase,
                  buttonStyles.buttonUtility,
                  styles.broadcastNavButton
                )}
                onClick={showNext}
                aria-label="Следующая трансляция"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}
