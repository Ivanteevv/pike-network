import styles from "./bar-broadcasts.module.css";

const DEFAULT_BROADCAST_CATEGORY = "Спорт";

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

function getTimeLabel(timeLabel) {
  if (!timeLabel) {
    return "Время уточняется";
  }

  const parts = String(timeLabel)
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
  const timePart = parts.find((part) => /\d{1,2}[:.]\d{2}/.test(part));

  return timePart ?? parts[0] ?? timeLabel;
}

function normalizeBroadcast(broadcast) {
  return {
    dayLabel: broadcast.dayLabel ?? broadcast.status ?? "Дата уточняется",
    dateLabel: broadcast.dateLabel ?? null,
    timeLabel: getTimeLabel(broadcast.timeLabel),
    category: inferBroadcastCategory(broadcast),
    title: broadcast.title,
  };
}

function getBroadcastKey(broadcast, index) {
  return [
    broadcast.dayLabel,
    broadcast.dateLabel,
    broadcast.timeLabel,
    broadcast.category,
    broadcast.title,
    index,
  ]
    .filter(Boolean)
    .join("-");
}

function getBroadcastAriaLabel(broadcast) {
  return [
    broadcast.dayLabel,
    broadcast.dateLabel,
    broadcast.timeLabel,
    broadcast.category,
    broadcast.title,
  ]
    .filter(Boolean)
    .join(", ");
}

function DateBlock({ broadcast }) {
  return (
    <div className={styles.dateBlock}>
      <span>{broadcast.dayLabel}</span>
      {broadcast.dateLabel ? <strong>{broadcast.dateLabel}</strong> : null}
    </div>
  );
}

function BroadcastRow({ broadcast, isPrimary = false }) {
  const className = isPrimary ? styles.primaryBroadcast : styles.broadcastRow;

  return (
    <article
      className={className}
      tabIndex={0}
      aria-label={getBroadcastAriaLabel(broadcast)}
    >
      <DateBlock broadcast={broadcast} />
      <time className={styles.timeLabel}>{broadcast.timeLabel}</time>
      <p className={styles.categoryLabel}>{broadcast.category}</p>
      <h3>{broadcast.title}</h3>
    </article>
  );
}

function EmptyBroadcastState() {
  return (
    <article className={`${styles.broadcastPanel} ${styles.broadcastPanelEmpty}`}>
      <p>Расписание обновляется</p>
      <strong>Ближайшие трансляции появятся после подтверждения сетки.</strong>
    </article>
  );
}

export function BarBroadcasts({ broadcasts = [] }) {
  const normalizedBroadcasts = Array.isArray(broadcasts)
    ? broadcasts
        .filter((broadcast) => broadcast?.title)
        .map((broadcast) => normalizeBroadcast(broadcast))
    : [];
  const [nextBroadcast, ...upcomingBroadcasts] = normalizedBroadcasts;

  if (!nextBroadcast) {
    return <EmptyBroadcastState />;
  }

  return (
    <div className={styles.broadcastPanel}>
      <BroadcastRow broadcast={nextBroadcast} isPrimary />

      {upcomingBroadcasts.length > 0 ? (
        <div className={styles.broadcastList} aria-label="Ближайшие трансляции">
          {upcomingBroadcasts.map((broadcast, index) => (
            <BroadcastRow
              key={getBroadcastKey(broadcast, index)}
              broadcast={broadcast}
            />
          ))}
        </div>
      ) : (
        <p className={styles.singleBroadcastNote}>
          Следующие трансляции появятся после обновления расписания.
        </p>
      )}
    </div>
  );
}
