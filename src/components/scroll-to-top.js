"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./scroll-to-top.module.css";

const TOP_SCROLL_TOLERANCE = 1;
const VISIBILITY_THRESHOLD = 320;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConcealed, setIsConcealed] = useState(false);
  const isScrollingToTopRef = useRef(false);
  const scrollWatchFrameRef = useRef(null);
  const scrollWatchTimeoutRef = useRef(null);

  function stopWatchingScrollToTop() {
    window.cancelAnimationFrame(scrollWatchFrameRef.current);
    window.clearTimeout(scrollWatchTimeoutRef.current);
    scrollWatchFrameRef.current = null;
    scrollWatchTimeoutRef.current = null;
    isScrollingToTopRef.current = false;
    setIsConcealed(false);
    setIsVisible(window.scrollY > VISIBILITY_THRESHOLD);
  }

  function watchScrollToTop() {
    window.cancelAnimationFrame(scrollWatchFrameRef.current);
    window.clearTimeout(scrollWatchTimeoutRef.current);

    const tick = () => {
      if (!isScrollingToTopRef.current) {
        return;
      }

      if (window.scrollY <= TOP_SCROLL_TOLERANCE) {
        stopWatchingScrollToTop();
        return;
      }

      scrollWatchFrameRef.current = window.requestAnimationFrame(tick);
    };

    scrollWatchFrameRef.current = window.requestAnimationFrame(tick);
    scrollWatchTimeoutRef.current = window.setTimeout(stopWatchingScrollToTop, 3000);
  }

  useEffect(() => {
    const updateVisibility = () => {
      if (isScrollingToTopRef.current) {
        return;
      }

      setIsVisible(window.scrollY > VISIBILITY_THRESHOLD);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.cancelAnimationFrame(scrollWatchFrameRef.current);
      window.clearTimeout(scrollWatchTimeoutRef.current);
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  function handleClick() {
    const scrollOptions = { top: 0, left: 0, behavior: "smooth" };

    isScrollingToTopRef.current = true;
    setIsConcealed(true);
    watchScrollToTop();
    window.scrollTo(scrollOptions);
    document.scrollingElement?.scrollTo(scrollOptions);
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${isVisible ? styles.visible : ""} ${
        isVisible ? styles.ready : ""
      } ${isConcealed ? styles.concealed : ""}`}
      onClick={handleClick}
      disabled={!isVisible}
      aria-label="Наверх"
      aria-hidden={!isVisible || isConcealed}
      tabIndex={isVisible && !isConcealed ? 0 : -1}
    >
      <span className={styles.iconFrame} aria-hidden="true">
        <svg
          className={styles.icon}
          viewBox="0 0 72 72"
          role="presentation"
          focusable="false"
        >
          <path
            className={styles.bottleGlass}
            d="M28 7h16v8.5c0 2.4.9 4.7 2.5 6.5l3.7 4.1c1.7 1.9 2.6 4.3 2.6 6.8V56c0 5-4 9-9 9H27.2c-5 0-9-4-9-9V32.9c0-2.5.9-4.9 2.6-6.8l3.7-4.1a9.7 9.7 0 0 0 2.5-6.5V7Z"
          />
          <path
            className={styles.bottleEdge}
            d="M30.5 7h11v8.6c0 3.2 1.2 6.2 3.4 8.5l3.7 4.1a8.2 8.2 0 0 1 2.2 5.5V56a6.5 6.5 0 0 1-6.5 6.5H27.7a6.5 6.5 0 0 1-6.5-6.5V33.7c0-2 .8-4 2.2-5.5l3.7-4.1a12.2 12.2 0 0 0 3.4-8.5V7Z"
          />
          <path
            className={styles.bottleLabel}
            d="M24.5 35.5c0-2.5 2-4.5 4.5-4.5h14c2.5 0 4.5 2 4.5 4.5v9c0 2.5-2 4.5-4.5 4.5H29c-2.5 0-4.5-2-4.5-4.5v-9Z"
          />
        </svg>
      </span>
      <span className={styles.tooltip} aria-hidden="true">
        Вверх
      </span>
    </button>
  );
}
