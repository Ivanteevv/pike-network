"use client";

import Link from "next/link";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import styles from "./network-points.module.css";

function formatBarsCount(barsCount, countLabels) {
  const label =
    barsCount === 1
      ? countLabels.one
      : barsCount < 5
        ? countLabels.few
        : countLabels.many;

  return `${barsCount} ${label}`;
}

export function NetworkPointsSection({ bars, copy, phoneE164 }) {
  const barsCountLabel =
    copy?.countLabels
      ? formatBarsCount(bars.length, copy.countLabels)
      : `${bars.length}`;

  return (
    <div className={styles.pointsShell}>
      <div className={styles.pointsMeta}>
        <span className={styles.pointsCount}>{barsCountLabel}</span>
        <a
          className={cx(
            buttonStyles.buttonBase,
            buttonStyles.buttonGhostAction,
            buttonStyles.buttonSm,
            styles.reservationLink
          )}
          href={`tel:${phoneE164}`}
        >
          {copy.reservationLabel}
        </a>
      </div>

      <div className={styles.pointsGrid} aria-label="Точки сети">
        {bars.map((bar, index) => (
          <article key={bar.slug} className={styles.pointCard}>
            <div className={styles.pointTopline}>
              <span>
                {copy.cardIndexLabel} {String(index + 1).padStart(2, "0")}
              </span>
              {bar.statusLabel ? (
                <span className={styles.status}>{bar.statusLabel}</span>
              ) : null}
            </div>

            <h3>{bar.shortLabel}</h3>
            <p className={styles.address}>{bar.addressLine}</p>
            <p className={styles.summary}>{bar.summary}</p>

            <div className={styles.cardActions}>
              <Link
                href={`/bars/${bar.slug}`}
                className={cx(
                  buttonStyles.buttonBase,
                  buttonStyles.buttonGhostAction,
                  buttonStyles.buttonMd,
                  buttonStyles.buttonArrow,
                  styles.cardAction
                )}
              >
                {copy.openLabel}
              </Link>
              <a
                href={`tel:${bar.phoneE164}`}
                className={cx(
                  buttonStyles.buttonBase,
                  buttonStyles.buttonGhostAction,
                  buttonStyles.buttonMd,
                  styles.cardAction
                )}
              >
                {copy.phoneLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
