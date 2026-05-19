"use client";

import { forwardRef, useCallback, useRef } from "react";
import NextLink from "next/link";
import { cx } from "@/lib/class-names";
import styles from "./brand-link.module.css";

function computeDirection(event, rect) {
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const distLeft = x;
  const distRight = rect.width - x;
  const distTop = y;
  const distBottom = rect.height - y;
  const min = Math.min(distLeft, distRight, distTop, distBottom);

  if (min === distTop) return "top";
  if (min === distBottom) return "bottom";
  if (min === distLeft) return "left";
  return "right";
}

export function useDirectionalHover() {
  const nodeRef = useRef(null);
  const frameRef = useRef(0);

  const setNode = useCallback((node) => {
    nodeRef.current = node;
  }, []);

  const handleEnter = useCallback((event) => {
    const node = nodeRef.current;
    if (!node) return;
    if (event.pointerType === "touch") return;

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }

    const rect = node.getBoundingClientRect();
    const direction = computeDirection(event, rect);

    node.dataset.hoverState = "preparing";
    node.dataset.hoverDirection = direction;
    // Force a synchronous style flush so the "preparing" snap (no transition,
    // clip-path at the entry-side start position) commits before we animate.
    // Without this, a stale prior direction could paint the first frame.
    void node.offsetWidth;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      if (nodeRef.current !== node) return;
      if (node.dataset.hoverState !== "preparing") return;
      node.dataset.hoverState = "entering";
    });
  }, []);

  const handleLeave = useCallback((event) => {
    const node = nodeRef.current;
    if (!node) return;
    if (event.pointerType === "touch") return;

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }

    const rect = node.getBoundingClientRect();
    const direction = computeDirection(event, rect);

    node.dataset.hoverDirection = direction;
    delete node.dataset.hoverState;
  }, []);

  return {
    ref: setNode,
    onPointerEnter: handleEnter,
    onPointerLeave: handleLeave,
  };
}

const VARIANT_CLASS = {
  nav: styles.variantNav,
  footer: styles.variantFooter,
  phone: styles.variantPhone,
  ghost: styles.variantGhost,
};

function isInternalRoute(href) {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

export const BrandLink = forwardRef(function BrandLink(
  {
    variant = "ghost",
    className,
    children,
    href,
    onPointerEnter,
    onPointerLeave,
    ...props
  },
  forwardedRef
) {
  const directional = useDirectionalHover();
  const Component = isInternalRoute(href) ? NextLink : "a";

  const setRefs = useCallback(
    (node) => {
      directional.ref(node);
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [directional, forwardedRef]
  );

  const handleEnter = useCallback(
    (event) => {
      directional.onPointerEnter(event);
      if (onPointerEnter) onPointerEnter(event);
    },
    [directional, onPointerEnter]
  );

  const handleLeave = useCallback(
    (event) => {
      directional.onPointerLeave(event);
      if (onPointerLeave) onPointerLeave(event);
    },
    [directional, onPointerLeave]
  );

  return (
    <Component
      ref={setRefs}
      href={href}
      className={cx(styles.brandLink, VARIANT_CLASS[variant], className)}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      {...props}
    >
      <span className={styles.label}>
        {children}
        <span className={styles.labelOverlay} aria-hidden="true">
          {children}
        </span>
      </span>
    </Component>
  );
});
