"use client";

import { BrandLink } from "@/components/brand-link";
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

export function NetworkPointsSection({ bars, copy }) {
  const barsCountLabel =
    copy?.countLabels
      ? formatBarsCount(bars.length, copy.countLabels)
      : `${bars.length}`;

  return (
    <div className={styles.pointsShell}>
      <div className={styles.pointsMeta}>
        <span className={styles.pointsCount}>{barsCountLabel}</span>
      </div>

      <div id="bar-list" className={styles.pointsGrid} aria-label="Точки сети">
        {bars.map((bar) => (
          <article key={bar.slug} className={styles.pointCard}>
            {bar.statusLabel ? (
              <div className={styles.pointTopline}>
                <span className={styles.status}>{bar.statusLabel}</span>
              </div>
            ) : null}

            <h3>{bar.shortLabel}</h3>
            <p className={styles.address}>{bar.addressLine}</p>

            <div className={styles.cardActions}>
              <BrandLink
                variant="ghost"
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
              </BrandLink>
              <BrandLink
                variant="ghost"
                href={`tel:${bar.phoneE164}`}
                className={cx(
                  buttonStyles.buttonBase,
                  buttonStyles.buttonGhostAction,
                  buttonStyles.buttonMd,
                  styles.cardAction
                )}
              >
                {copy.phoneLabel}
              </BrandLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
