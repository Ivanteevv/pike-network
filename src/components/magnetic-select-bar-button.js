"use client";

import { useCallback, useEffect, useRef } from "react";
import { cx } from "@/lib/class-names";
import styles from "./magnetic-select-bar-button.module.css";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function MagneticSelectBarButton({ className, href = "#bars" }) {
  const buttonRef = useRef(null);
  const frameRef = useRef(null);
  const stateRef = useRef({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  });

  const setMotionVars = useCallback((x, y) => {
    const node = buttonRef.current;

    if (!node) {
      return;
    }

    node.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
    node.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
  }, []);

  const stopMotion = useCallback(() => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const animate = useCallback(function runAnimation() {
    const state = stateRef.current;
    let shouldContinue = false;

    for (const key of ["x", "y"]) {
      const delta = state.target[key] - state.current[key];
      state.velocity[key] = (state.velocity[key] + delta * 0.18) * 0.72;
      state.current[key] += state.velocity[key];

      if (Math.abs(delta) > 0.04 || Math.abs(state.velocity[key]) > 0.04) {
        shouldContinue = true;
      }
    }

    setMotionVars(state.current.x, state.current.y);

    if (shouldContinue) {
      frameRef.current = window.requestAnimationFrame(runAnimation);
      return;
    }

    frameRef.current = null;
  }, [setMotionVars]);

  const startMotion = useCallback(() => {
    if (!frameRef.current) {
      frameRef.current = window.requestAnimationFrame(animate);
    }
  }, [animate]);

  const resetMotion = useCallback(() => {
    stateRef.current.target = { x: 0, y: 0 };
    startMotion();
  }, [startMotion]);

  const shouldTrackPointer = useCallback((event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
      return false;
    }

    return (
      window.matchMedia(FINE_POINTER_QUERY).matches &&
      !window.matchMedia(REDUCED_MOTION_QUERY).matches
    );
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (!buttonRef.current || !shouldTrackPointer(event)) {
        return;
      }

      const rect = buttonRef.current.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      const x = clamp(offsetX * 0.2, -18, 18);
      const y = clamp(offsetY * 0.22, -10, 10);

      stateRef.current.target = {
        x,
        y,
      };
      startMotion();
    },
    [shouldTrackPointer, startMotion]
  );

  useEffect(() => stopMotion, [stopMotion]);

  return (
    <a
      ref={buttonRef}
      className={cx(styles.button, className)}
      href={href}
      onBlur={resetMotion}
      onPointerCancel={resetMotion}
      onPointerLeave={resetMotion}
      onPointerMove={handlePointerMove}
    >
      <span className={styles.label}>Выбрать бар</span>
    </a>
  );
}
