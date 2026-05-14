"use client";

import { useEffect } from "react";
import buttonStyles from "@/components/button.module.css";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function canUsePointerEffect(event) {
  return (
    (event.pointerType === "mouse" || event.pointerType === "pen") &&
    window.matchMedia(FINE_POINTER_QUERY).matches &&
    !window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

function setGhostOrigin(node, event) {
  const rect = node.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  node.style.setProperty("--ghost-x", `${x.toFixed(2)}%`);
  node.style.setProperty("--ghost-y", `${y.toFixed(2)}%`);
}

export function GhostActionEffects() {
  useEffect(() => {
    const selector = `.${buttonStyles.buttonGhostAction}`;

    function handlePointerOver(event) {
      const target = event.target.closest(selector);

      if (!target || !canUsePointerEffect(event)) {
        return;
      }

      if (target.contains(event.relatedTarget)) {
        return;
      }

      setGhostOrigin(target, event);
    }

    document.addEventListener("pointerover", handlePointerOver);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
    };
  }, []);

  return null;
}
