export const BROADCAST_LAYOUTS = {
  empty: "empty",
  hidden: "hidden",
  featured: "featured",
  grid: "grid",
  scroll: "scroll",
};

export function getPublishedBroadcasts(broadcasts = []) {
  return broadcasts.filter((broadcast) => broadcast?.isPublished !== false);
}

export function orderBroadcastsForDisplay(broadcasts = []) {
  return [...getPublishedBroadcasts(broadcasts)].sort((first, second) => {
    if (first.isFeatured === second.isFeatured) {
      return 0;
    }

    return first.isFeatured ? -1 : 1;
  });
}

export function getBroadcastLayout(broadcasts = [], options = {}) {
  const publishedCount = getPublishedBroadcasts(broadcasts).length;

  if (publishedCount === 0) {
    return options.emptyBehavior === "hide"
      ? BROADCAST_LAYOUTS.hidden
      : BROADCAST_LAYOUTS.empty;
  }

  if (publishedCount === 1) {
    return BROADCAST_LAYOUTS.featured;
  }

  if (publishedCount <= 3) {
    return BROADCAST_LAYOUTS.grid;
  }

  return BROADCAST_LAYOUTS.scroll;
}
