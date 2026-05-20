let previousHtmlOverflow = "";
let previousBodyOverflow = "";
let previousBodyPaddingRight = "";
const activeLocks = new Set();

export function lockPageScroll(lockId) {
  if (typeof document === "undefined") {
    return () => {};
  }

  if (activeLocks.size === 0) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const bodyPaddingRight = Number.parseFloat(
      window.getComputedStyle(document.body).paddingRight
    );

    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    previousBodyPaddingRight = document.body.style.paddingRight;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
    }
  }

  activeLocks.add(lockId);

  return () => {
    unlockPageScroll(lockId);
  };
}

export function unlockPageScroll(lockId) {
  if (typeof document === "undefined") {
    return;
  }

  activeLocks.delete(lockId);

  if (activeLocks.size > 0) {
    return;
  }

  document.documentElement.style.overflow = previousHtmlOverflow;
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.paddingRight = previousBodyPaddingRight;
  previousHtmlOverflow = "";
  previousBodyOverflow = "";
  previousBodyPaddingRight = "";
}
