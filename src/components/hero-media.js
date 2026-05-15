"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./hero-media.module.css";

const HERO_IDLE_DELAY_MS = 10000;
const HERO_ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "pointermove",
  "pointerdown",
  "touchstart",
  "keydown",
  "wheel",
  "scroll",
];

export function HeroMedia({
  media,
  children,
  priority = false,
  className = "",
  variant = "default",
}) {
  const heroRef = useRef(null);
  const [shouldUseVideo, setShouldUseVideo] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setShouldUseVideo(!reducedMotionQuery.matches);
    };

    updatePreference();
    reducedMotionQuery.addEventListener("change", updatePreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;

    if (!heroElement || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting && entry.intersectionRatio >= 0.6);
      },
      { threshold: [0, 0.6, 1] }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isHeroInView) {
      return undefined;
    }

    let resetTimer = window.setTimeout(() => {
      setIsIdle(false);
    }, 0);
    let idleTimer = window.setTimeout(() => {
      setIsIdle(true);
    }, HERO_IDLE_DELAY_MS);

    const showHeroInterface = () => {
      setIsIdle(false);
      window.clearTimeout(resetTimer);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        setIsIdle(true);
      }, HERO_IDLE_DELAY_MS);
    };

    HERO_ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, showHeroInterface, { passive: true });
    });

    return () => {
      window.clearTimeout(resetTimer);
      window.clearTimeout(idleTimer);
      HERO_ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, showHeroInterface);
      });
    };
  }, [isHeroInView]);

  const variantClassName =
    variant === "showcase"
      ? styles.showcase
      : variant === "immersive"
        ? styles.immersive
        : styles.defaultVariant;
  const isInterfaceHidden = isHeroInView && isIdle;
  const idleClassName = isInterfaceHidden ? styles.idle : "";
  const heroClassName = [styles.hero, variantClassName, idleClassName, className]
    .filter(Boolean)
    .join(" ");
  const isShowcaseVideo =
    (variant === "showcase" || variant === "immersive") &&
    media.kind === "video" &&
    media.videoUrl;
  const showVideo =
    isShowcaseVideo || (media.kind === "video" && media.videoUrl && shouldUseVideo);
  const fallbackImageUrl = media.posterUrl || media.imageUrl;

  return (
    <section
      ref={heroRef}
      className={heroClassName}
      data-hero-idle={isInterfaceHidden ? "true" : "false"}
      data-hero-section="true"
    >
      <div className={styles.mediaLayer}>
        {showVideo ? (
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload={isShowcaseVideo ? "auto" : "metadata"}
            poster={isShowcaseVideo ? undefined : media.posterUrl}
            src={media.videoUrl}
            disablePictureInPicture
            aria-hidden="true"
          />
        ) : fallbackImageUrl ? (
          <Image
            src={fallbackImageUrl}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className={styles.image}
          />
        ) : null}
      </div>
      <div className={styles.scrim} />
      <div className={styles.focusLayer} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
