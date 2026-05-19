import test from "node:test";
import assert from "node:assert/strict";

import {
  getBroadcastLayout,
  getPublishedBroadcasts,
  orderBroadcastsForDisplay,
} from "./bar-broadcasts-layout.mjs";

const makeBroadcast = (id, overrides = {}) => ({
  id,
  title: `Broadcast ${id}`,
  date: "Сегодня",
  time: "20:00",
  description: "Тестовая трансляция",
  category: "Футбол",
  ...overrides,
});

test("chooses empty fallback or hidden layout when there are no published broadcasts", () => {
  assert.equal(getBroadcastLayout([]), "empty");
  assert.equal(getBroadcastLayout([makeBroadcast("draft", { isPublished: false })]), "empty");
  assert.equal(
    getBroadcastLayout([makeBroadcast("draft", { isPublished: false })], {
      emptyBehavior: "hide",
    }),
    "hidden"
  );
});

test("chooses featured, grid, and scroll layouts from published broadcast count", () => {
  assert.equal(getBroadcastLayout([makeBroadcast("one")]), "featured");
  assert.equal(
    getBroadcastLayout([makeBroadcast("one"), makeBroadcast("two")]),
    "grid"
  );
  assert.equal(
    getBroadcastLayout([
      makeBroadcast("one"),
      makeBroadcast("two"),
      makeBroadcast("three"),
    ]),
    "grid"
  );
  assert.equal(
    getBroadcastLayout([
      makeBroadcast("one"),
      makeBroadcast("two"),
      makeBroadcast("three"),
      makeBroadcast("four"),
    ]),
    "scroll"
  );
});

test("filters unpublished broadcasts and keeps featured broadcasts first", () => {
  const broadcasts = [
    makeBroadcast("regular"),
    makeBroadcast("draft", { isPublished: false }),
    makeBroadcast("featured", { isFeatured: true }),
  ];

  assert.deepEqual(
    getPublishedBroadcasts(broadcasts).map((broadcast) => broadcast.id),
    ["regular", "featured"]
  );
  assert.deepEqual(
    orderBroadcastsForDisplay(broadcasts).map((broadcast) => broadcast.id),
    ["featured", "regular"]
  );
});
