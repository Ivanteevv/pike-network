"use client";

import { useId, useState } from "react";
import Image from "next/image";
import styles from "./bar-broadcasts.module.css";

const DEFAULT_BROADCAST_CATEGORY = "Спорт";
const MAX_SECONDARY_BROADCASTS = 3;

function inferBroadcastCategory(broadcast) {
  const explicitCategory = broadcast.category ?? broadcast.type ?? broadcast.sport;

  if (explicitCategory) {
    return explicitCategory;
  }

  const searchableText = `${broadcast.title ?? ""} ${broadcast.description ?? ""}`.toLowerCase();

  if (searchableText.includes("футбол")) {
    return "Футбол";
  }

  if (searchableText.includes("хоккей")) {
    return "Хоккей";
  }

  if (
    searchableText.includes("ufc") ||
    searchableText.includes("mma") ||
    searchableText.includes("мма")
  ) {
    return "UFC";
  }

  return DEFAULT_BROADCAST_CATEGORY;
}

function getBroadcastMetaItems(broadcast, { includeTiming = true } = {}) {
  const timingItems = includeTiming ? [broadcast.status, broadcast.timeLabel] : [];

  return [...timingItems, inferBroadcastCategory(broadcast)].filter(Boolean);
}

function BroadcastMetaLine({ broadcast, className, includeTiming }) {
  return (
    <p className={className ?? styles.broadcastMeta}>
      {getBroadcastMetaItems(broadcast, { includeTiming }).map((item, index) => (
        <span key={`${item}-${index}`}>{item}</span>
      ))}
    </p>
  );
}

function BroadcastThumb({ broadcast }) {
  if (!broadcast?.image?.src) {
    return null;
  }

  return (
    <div className={styles.broadcastThumb} aria-hidden="true">
      <Image
        src={broadcast.image.src}
        alt=""
        fill
        sizes="96px"
        className={styles.broadcastImage}
      />
    </div>
  );
}

function EmptyBroadcastState() {
  return (
    <article className={`${styles.broadcastPanel} ${styles.broadcastPanelEmpty}`}>
      <div className={styles.broadcastEmptyMark} aria-hidden="true">
        Live
      </div>
      <div className={styles.broadcastEmptyCopy}>
        <p className={styles.broadcastLabel}>Расписание обновляется</p>
        <h3>Сегодня в эфире — ваш выбор</h3>
        <p>
          Ближайшие трансляции пока не указаны. Если хотите посмотреть
          конкретный матч, уточните у бармена — в «Щуке» спорт включают по
          настроению гостей.
        </p>
      </div>
    </article>
  );
}

function SecondaryBroadcast({ broadcast }) {
  return (
    <li className={styles.broadcastRow}>
      <BroadcastMetaLine broadcast={broadcast} className={styles.broadcastRowMeta} />
      <strong>{broadcast.title}</strong>
      {broadcast.description ? <p>{broadcast.description}</p> : null}
    </li>
  );
}

function BroadcastSchedule({ primaryBroadcast, secondaryBroadcasts }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scheduleId = useId();
  const hasSecondaryBroadcasts = secondaryBroadcasts.length > 0;
  const toggleLabel = isExpanded
    ? "Свернуть расписание"
    : `Показать дальше (${secondaryBroadcasts.length})`;

  return (
    <article className={styles.broadcastPanel}>
      <div className={styles.broadcastPrimary}>
        <div className={styles.broadcastTimeColumn}>
          <span>{primaryBroadcast.status ?? "Ближайший эфир"}</span>
          <strong>{primaryBroadcast.timeLabel ?? "Время уточняется"}</strong>
        </div>

        <div className={styles.broadcastPrimaryCopy}>
          <p className={styles.broadcastLabel}>Ближайшая трансляция</p>
          <BroadcastMetaLine broadcast={primaryBroadcast} includeTiming={false} />
          <h3>{primaryBroadcast.title}</h3>
          {primaryBroadcast.description ? <p>{primaryBroadcast.description}</p> : null}
        </div>

        <BroadcastThumb broadcast={primaryBroadcast} />
      </div>

      {hasSecondaryBroadcasts ? (
        <div className={styles.broadcastMore}>
          <button
            type="button"
            className={styles.broadcastToggle}
            aria-expanded={isExpanded}
            aria-controls={scheduleId}
            aria-label={`${toggleLabel} трансляций`}
            onClick={() => setIsExpanded((currentValue) => !currentValue)}
          >
            <span>Дальше в расписании</span>
            <strong>{toggleLabel}</strong>
          </button>

          <div
            id={scheduleId}
            className={styles.broadcastDisclosure}
            data-open={isExpanded ? "true" : "false"}
            aria-hidden={isExpanded ? undefined : "true"}
          >
            <ol>
              {secondaryBroadcasts.map((broadcast) => (
                <SecondaryBroadcast
                  key={`${broadcast.title}-${broadcast.timeLabel ?? broadcast.status ?? ""}`}
                  broadcast={broadcast}
                />
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function BarBroadcasts({ broadcasts = [] }) {
  const [primaryBroadcast, ...restBroadcasts] = broadcasts;
  const secondaryBroadcasts = restBroadcasts.slice(0, MAX_SECONDARY_BROADCASTS);

  if (!primaryBroadcast) {
    return <EmptyBroadcastState />;
  }

  return (
    <BroadcastSchedule
      primaryBroadcast={primaryBroadcast}
      secondaryBroadcasts={secondaryBroadcasts}
    />
  );
}
