"use client";

import Link from "next/link";
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

export function NetworkPointsSection({ bars, copy }) {
  const barsCountLabel =
    copy?.countLabels
      ? formatBarsCount(bars.length, copy.countLabels)
      : `${bars.length}`;

  return (
    <div className={styles.pointsShell}>
      <div className={styles.pointsMeta}>
        <span>{barsCountLabel}</span>
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

            <div className={styles.cardActions}>
              <Link
                href={`/bars/${bar.slug}`}
                className={`${styles.cardAction} ${styles.cardActionPrimary}`}
              >
                <span className={styles.cardActionLabel}>{copy.openLabel}</span>
              </Link>
              <a href={`tel:${bar.phoneE164}`} className={styles.cardAction}>
                <span className={styles.cardActionLabel}>{copy.phoneLabel}</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
