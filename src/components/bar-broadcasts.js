"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import buttonStyles from "@/components/button.module.css";
import { RollingNumber, formatRollingNumber } from "@/components/rolling-number";
import { cx } from "@/lib/class-names";
import styles from "./bar-broadcasts.module.css";

const DRAG_COMMIT_THRESHOLD = 0.24;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getRelativeIndex(index, direction, total) {
  if (direction === "previous") {
    return index === 0 ? total - 1 : index - 1;
  }

  return index === total - 1 ? 0 : index + 1;
}

function BroadcastSlide({ broadcast, className }) {
  return (
    <div className={className}>
      <div className={styles.broadcastMedia}>
        <Image
          key={broadcast.image.src}
          src={broadcast.image.src}
          alt={broadcast.image.alt}
          fill
          sizes="(max-width: 759px) 100vw, (max-width: 1160px) 56vw, 620px"
          className={styles.broadcastImage}
          draggable={false}
        />
      </div>

      <div className={styles.broadcastCopy}>
        <div className={styles.broadcastTopline}>
          <p className={styles.broadcastStatus}>{broadcast.status}</p>
          <p className={styles.broadcastTime}>{broadcast.timeLabel}</p>
        </div>

        <div className={styles.broadcastMain}>
          <h3>{broadcast.title}</h3>
          <p>{broadcast.description}</p>
        </div>
      </div>
    </div>
  );
}

export function BarBroadcasts({ broadcasts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragState, setDragState] = useState({
    phase: "idle",
    startX: 0,
    offset: 0,
    width: 1,
    direction: "next",
    commitIndex: null,
  });
  const dragStateRef = useRef(dragState);
  const deckRef = useRef(null);
  const navigationFrameRef = useRef(null);
  const isReleasingPointerRef = useRef(false);
  const activeBroadcast = broadcasts[activeIndex];
  const hasMultipleBroadcasts = broadcasts.length > 1;
  const isDragging = dragState.phase === "dragging";
  const isSettling = dragState.phase === "settling";
  const dragOffset = hasMultipleBroadcasts ? dragState.offset : 0;
  const dragProgress = hasMultipleBroadcasts
    ? clamp(Math.abs(dragOffset) / dragState.width, 0, 1)
    : 0;
  const dragDirection =
    dragOffset > 0 ? "previous" : dragState.direction || "next";
  const targetIndex = getRelativeIndex(
    activeIndex,
    dragDirection,
    broadcasts.length
  );
  const targetBroadcast = broadcasts[targetIndex];

  function setSyncedDragState(nextState) {
    dragStateRef.current = nextState;
    setDragState(nextState);
  }

  function getDeckWidth() {
    return Math.max(deckRef.current?.getBoundingClientRect().width ?? 1, 1);
  }

  function resetDrag(direction = dragState.direction) {
    if (navigationFrameRef.current !== null) {
      window.cancelAnimationFrame(navigationFrameRef.current);
      navigationFrameRef.current = null;
    }

    setSyncedDragState({
      phase: "idle",
      startX: 0,
      offset: 0,
      width: 1,
      direction,
      commitIndex: null,
    });
  }

  function startNavigation(direction) {
    if (!hasMultipleBroadcasts || dragStateRef.current.phase !== "idle") {
      return;
    }

    const width = getDeckWidth();
    const commitIndex = getRelativeIndex(
      activeIndex,
      direction,
      broadcasts.length
    );

    setSyncedDragState({
      phase: "settling",
      startX: 0,
      offset: 0,
      width,
      direction,
      commitIndex,
    });

    navigationFrameRef.current = window.requestAnimationFrame(() => {
      navigationFrameRef.current = null;

      if (
        dragStateRef.current.phase !== "settling" ||
        dragStateRef.current.commitIndex !== commitIndex
      ) {
        return;
      }

      setSyncedDragState({
        phase: "settling",
        startX: 0,
        offset: direction === "previous" ? width : -width,
        width,
        direction,
        commitIndex,
      });
    });
  }

  function showPrevious() {
    startNavigation("previous");
  }

  function showNext() {
    startNavigation("next");
  }

  function handlePointerDown(event) {
    if (!hasMultipleBroadcasts || event.button !== 0 || isSettling) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.setPointerCapture(event.pointerId);
    setSyncedDragState({
      phase: "dragging",
      startX: event.clientX,
      offset: 0,
      width: Math.max(rect.width, 1),
      direction: "next",
      commitIndex: null,
    });
  }

  function handlePointerMove(event) {
    const currentDragState = dragStateRef.current;

    if (currentDragState.phase !== "dragging") {
      return;
    }

    const nextOffset = clamp(
      event.clientX - currentDragState.startX,
      -currentDragState.width,
      currentDragState.width
    );

    setSyncedDragState({
      ...currentDragState,
      offset: nextOffset,
      direction: nextOffset > 0 ? "previous" : "next",
    });
  }

  function finishDrag(event) {
    const currentDragState = dragStateRef.current;

    if (currentDragState.phase !== "dragging") {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      isReleasingPointerRef.current = true;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const nextDirection = currentDragState.offset > 0 ? "previous" : "next";
    const dragDistance = Math.abs(currentDragState.offset);

    if (dragDistance < 1) {
      resetDrag(nextDirection);
      window.setTimeout(() => {
        isReleasingPointerRef.current = false;
      }, 0);
      return;
    }

    const shouldCommit =
      dragDistance / currentDragState.width >= DRAG_COMMIT_THRESHOLD;
    const commitIndex = shouldCommit
      ? getRelativeIndex(activeIndex, nextDirection, broadcasts.length)
      : null;

    setSyncedDragState({
      phase: "settling",
      startX: 0,
      offset: shouldCommit
        ? nextDirection === "previous"
          ? currentDragState.width
          : -currentDragState.width
        : 0,
      width: currentDragState.width,
      direction: nextDirection,
      commitIndex,
    });

    window.setTimeout(() => {
      isReleasingPointerRef.current = false;
    }, 0);
  }

  function handleLostPointerCapture() {
    if (
      isReleasingPointerRef.current ||
      dragStateRef.current.phase !== "dragging"
    ) {
      return;
    }

    resetDrag();
  }

  function handleTransitionEnd(event) {
    if (
      event.propertyName !== "transform" ||
      !event.target.classList.contains(styles.broadcastSlideActive) ||
      dragState.phase !== "settling"
    ) {
      return;
    }

    if (dragState.commitIndex !== null) {
      setActiveIndex(dragState.commitIndex);
    }

    resetDrag(dragState.direction);
  }

  function handleKeyDown(event) {
    if (!hasMultipleBroadcasts) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  if (!activeBroadcast) {
    return null;
  }

  return (
    <div
      className={styles.broadcastShell}
      data-dragging={isDragging ? "true" : "false"}
      data-settling={isSettling ? "true" : "false"}
      data-direction={dragDirection}
      style={{
        "--broadcast-drag-offset": `${dragOffset}px`,
        "--broadcast-drag-progress": dragProgress,
      }}
    >
      <div className={styles.broadcastFrame}>
        <article
          ref={deckRef}
          className={styles.broadcastDeck}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={handleLostPointerCapture}
          onTransitionEnd={handleTransitionEnd}
          onKeyDown={handleKeyDown}
          tabIndex={hasMultipleBroadcasts ? 0 : undefined}
          aria-roledescription="carousel"
          aria-label="Трансляции бара"
        >
          <div className={styles.broadcastDragHint} aria-hidden="true">
            <span>←</span>
            <span>drag</span>
            <span>→</span>
          </div>
          <BroadcastSlide
            broadcast={activeBroadcast}
            className={`${styles.broadcastSlide} ${styles.broadcastSlideActive}`}
          />
          {hasMultipleBroadcasts ? (
            <BroadcastSlide
              broadcast={targetBroadcast}
              className={`${styles.broadcastSlide} ${styles.broadcastSlidePreview}`}
            />
          ) : null}
        </article>
      </div>

      <div className={styles.broadcastIndexPanel}>
        <div className={styles.broadcastIndexNumber}>
          <RollingNumber
            value={activeIndex + 1}
            total={broadcasts.length}
            previewValue={targetIndex + 1}
            progress={dragProgress}
            direction={dragDirection}
            animateProgress={isSettling}
          />
        </div>
        <div className={styles.broadcastIndexMeta}>
          <span>/ {formatRollingNumber(broadcasts.length)}</span>
          <span>тяни афишу вбок</span>
        </div>
        {hasMultipleBroadcasts ? (
          <div className={styles.broadcastTextControls}>
            <button
              type="button"
              className={cx(buttonStyles.buttonBase, styles.broadcastTextButton)}
              onClick={showPrevious}
              disabled={isSettling}
            >
              ← Назад
            </button>
            <button
              type="button"
              className={cx(buttonStyles.buttonBase, styles.broadcastTextButton)}
              onClick={showNext}
              disabled={isSettling}
            >
              Дальше →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
