"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./scroll-to-top.module.css";

const SCROLL_TO_TOP_MIN_MS = 320;
const SCROLL_TO_TOP_MAX_MS = 680;

function easeOutCubic(progress) {
  return 1 - (1 - progress) ** 3;
}

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const isScrollingToTopRef = useRef(false);
  const scrollAnimationFrameRef = useRef(null);

  useEffect(() => {
    const updateVisibility = () => {
      const heroSection = document.querySelector("[data-hero-section='true']");
      const threshold = heroSection
        ? Math.max(heroSection.getBoundingClientRect().height - 120, 160)
        : window.innerHeight * 0.9;
      const nextVisible = window.scrollY > threshold;

      if (isScrollingToTopRef.current && window.scrollY > 4) {
        return;
      }

      if (isScrollingToTopRef.current && window.scrollY <= 4) {
        isScrollingToTopRef.current = false;
      }

      if (nextVisible === isVisibleRef.current) {
        return;
      }

      isVisibleRef.current = nextVisible;
      setIsVisible(nextVisible);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  function finishScrollToTop() {
    window.cancelAnimationFrame(scrollAnimationFrameRef.current);
    scrollAnimationFrameRef.current = null;
    isScrollingToTopRef.current = false;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  function animateScrollToTop() {
    const startY = window.scrollY;

    if (
      startY <= 4 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finishScrollToTop();
      return;
    }

    const duration = Math.min(
      SCROLL_TO_TOP_MAX_MS,
      Math.max(SCROLL_TO_TOP_MIN_MS, startY * 0.28)
    );
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextY = Math.round(startY * (1 - easeOutCubic(progress)));

      window.scrollTo({ top: nextY, left: 0, behavior: "auto" });

      if (progress < 1 && window.scrollY > 0) {
        scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      finishScrollToTop();
    };

    scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
  }

  function activateScrollToTop() {
    if (!isVisibleRef.current) {
      return;
    }

    isScrollingToTopRef.current = true;
    window.cancelAnimationFrame(scrollAnimationFrameRef.current);
    isVisibleRef.current = false;
    setIsVisible(false);
    animateScrollToTop();
  }

  function handlePointerDown(event) {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    activateScrollToTop();
  }

  function handleClick() {
    activateScrollToTop();
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${isVisible ? styles.visible : ""} ${
        isVisible ? styles.ready : ""
      }`}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      disabled={!isVisible}
      aria-label="Наверх"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
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
