"use client";

import { BrandLink } from "@/components/brand-link";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import { getRenderableBars } from "@/lib/content/content-guards";
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
  const visibleBars = getRenderableBars(bars);
  const barsCountLabel =
    copy?.countLabels
      ? formatBarsCount(visibleBars.length, copy.countLabels)
      : `${visibleBars.length}`;
  const isSingleBar = visibleBars.length === 1;

  return (
    <div className={styles.pointsShell}>
      <div className={styles.pointsMeta}>
        <span className={styles.pointsCount}>{barsCountLabel}</span>
      </div>

      <div
        id="bar-list"
        className={`${styles.pointsGrid} ${isSingleBar ? styles.pointsGridSingle : ""}`}
        aria-label="Точки сети"
      >
        {visibleBars.length > 0 ? (
          visibleBars.map((bar) => (
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
                {bar.phoneE164 ? (
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
                ) : null}
              </div>
            </article>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>Список точек обновляется.</p>
            <strong>Скоро здесь появятся актуальные адреса Щуки.</strong>
          </div>
        )}
      </div>
    </div>
  );
}
