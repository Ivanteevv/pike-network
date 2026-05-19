import Image from "next/image";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import {
  BROADCAST_LAYOUTS,
  getBroadcastLayout,
  orderBroadcastsForDisplay,
} from "./bar-broadcasts-layout.mjs";
import styles from "./bar-broadcasts.module.css";

const DEFAULT_EMPTY_STATE = {
  title: "Афиша обновляется",
  description: "Скоро здесь появятся ближайшие трансляции и события.",
  ctas: [],
};

/**
 * @typedef {Object} BroadcastEvent
 * @property {string} title
 * @property {string} date
 * @property {string} time
 * @property {string} description
 * @property {string} category
 * @property {{ src: string, alt?: string }=} image
 * @property {string=} status
 * @property {boolean=} isFeatured
 * @property {boolean=} isPublished
 */

function BroadcastMedia({ broadcast, variant }) {
  if (!broadcast.image?.src) {
    return (
      <div className={cx(styles.broadcastMedia, styles.broadcastMediaFallback)}>
        <span>{broadcast.category}</span>
      </div>
    );
  }

  return (
    <div className={styles.broadcastMedia}>
      <Image
        src={broadcast.image.src}
        alt={broadcast.image.alt ?? ""}
        fill
        sizes={
          variant === "featured"
            ? "(max-width: 759px) 100vw, (max-width: 1160px) 56vw, 620px"
            : "(max-width: 759px) 82vw, (max-width: 1160px) 34vw, 360px"
        }
        className={styles.broadcastImage}
      />
    </div>
  );
}

function BroadcastCard({ broadcast, variant = "standard" }) {
  return (
    <article
      className={cx(
        styles.broadcastCard,
        variant === "featured" && styles.broadcastCardFeatured
      )}
    >
      <BroadcastMedia broadcast={broadcast} variant={variant} />

      <div className={styles.broadcastCopy}>
        <div className={styles.broadcastTopline}>
          <p>{broadcast.status ?? broadcast.category}</p>
          <time>{[broadcast.date, broadcast.time].filter(Boolean).join(" · ")}</time>
        </div>

        <div className={styles.broadcastMain}>
          <p className={styles.broadcastCategory}>{broadcast.category}</p>
          <h3>{broadcast.title}</h3>
          <p>{broadcast.description}</p>
        </div>
      </div>
    </article>
  );
}

function BroadcastEmptyState({ emptyState = DEFAULT_EMPTY_STATE }) {
  const content = {
    ...DEFAULT_EMPTY_STATE,
    ...emptyState,
    ctas: emptyState.ctas ?? DEFAULT_EMPTY_STATE.ctas,
  };

  return (
    <div className={styles.broadcastEmptyState}>
      <div>
        <p className={styles.broadcastEmptyKicker}>Скоро в расписании</p>
        <h3>{content.title}</h3>
        <p>{content.description}</p>
      </div>

      {content.ctas.length > 0 ? (
        <div className={styles.broadcastEmptyActions}>
          {content.ctas.map((cta) => (
            <a
              key={`${cta.href}-${cta.label}`}
              className={cx(
                buttonStyles.buttonBase,
                buttonStyles.buttonGhostAction,
                styles.broadcastEmptyAction
              )}
              href={cta.href}
            >
              {cta.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BroadcastGrid({ broadcasts, layout }) {
  if (layout === BROADCAST_LAYOUTS.featured) {
    return (
      <div className={styles.broadcastFeaturedLayout}>
        <BroadcastCard broadcast={broadcasts[0]} variant="featured" />
      </div>
    );
  }

  if (layout === BROADCAST_LAYOUTS.grid) {
    return (
      <div
        className={styles.broadcastGrid}
        data-count={broadcasts.length}
      >
        {broadcasts.map((broadcast) => (
          <BroadcastCard key={broadcast.id ?? broadcast.title} broadcast={broadcast} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={styles.broadcastScroller}
      role="list"
      aria-label="Ближайшие трансляции"
    >
      {broadcasts.map((broadcast) => (
        <div
          key={broadcast.id ?? broadcast.title}
          className={styles.broadcastScrollItem}
          role="listitem"
        >
          <BroadcastCard broadcast={broadcast} />
        </div>
      ))}
    </div>
  );
}

export function BarBroadcasts({ broadcasts = [], settings = {} }) {
  const orderedBroadcasts = orderBroadcastsForDisplay(broadcasts);
  const layout = getBroadcastLayout(orderedBroadcasts, {
    emptyBehavior: settings.emptyBehavior,
  });

  if (layout === BROADCAST_LAYOUTS.hidden) {
    return null;
  }

  return (
    <div className={styles.broadcastShell} data-layout={layout}>
      {layout === BROADCAST_LAYOUTS.empty ? (
        <BroadcastEmptyState emptyState={settings.emptyState} />
      ) : (
        <BroadcastGrid broadcasts={orderedBroadcasts} layout={layout} />
      )}
    </div>
  );
}
