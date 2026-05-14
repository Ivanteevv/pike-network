"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import styles from "./bar-gallery.module.css";

function blockScroll(shouldBlock) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const htmlOverflow = document.documentElement.style.overflow;
  const bodyOverflow = document.body.style.overflow;

  if (shouldBlock) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.documentElement.style.overflow = htmlOverflow;
    document.body.style.overflow = bodyOverflow;
  };
}

export function BarGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const stageMediaRef = useRef(null);
  const previewDialogRef = useRef(null);

  useEffect(() => {
    if (!isPreviewOpen || typeof window === "undefined") {
      return undefined;
    }

    const indicesToPreload = [
      previewIndex,
      previewIndex === 0 ? images.length - 1 : previewIndex - 1,
      previewIndex === images.length - 1 ? 0 : previewIndex + 1,
    ];

    indicesToPreload.forEach((index) => {
      const preloadImage = new window.Image();
      preloadImage.src = images[index].src;
    });

    return undefined;
  }, [images, isPreviewOpen, previewIndex]);

  useEffect(() => {
    const dialog = previewDialogRef.current;

    if (!dialog) {
      return undefined;
    }

    if (!isPreviewOpen) {
      if (dialog.open) {
        dialog.close();
      }

      return undefined;
    }

    if (!dialog.open) {
      dialog.showModal();
      dialog.focus();
    }

    return undefined;
  }, [isPreviewOpen]);

  useEffect(() => blockScroll(isPreviewOpen), [isPreviewOpen]);

  function scrollToIndex(index, behavior = "smooth") {
    const stageMedia = stageMediaRef.current;

    if (!stageMedia) {
      return;
    }

    stageMedia.scrollTo({
      left: stageMedia.clientWidth * index,
      behavior,
    });
  }

  function goToIndex(index, behavior = "smooth") {
    setActiveIndex(index);
    scrollToIndex(index, behavior);
  }

  function showPrev(behavior = "smooth") {
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    goToIndex(nextIndex, behavior);
  }

  function showNext(behavior = "smooth") {
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    goToIndex(nextIndex, behavior);
  }

  function showPreviewPrev() {
    setPreviewIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  }

  function showPreviewNext() {
    setPreviewIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  }

  function openPreview(index = activeIndex) {
    setPreviewIndex(index);
    setIsPreviewOpen(true);
  }

  function closePreview() {
    setActiveIndex(previewIndex);
    scrollToIndex(previewIndex, "auto");
    setIsPreviewOpen(false);
  }

  function handlePreviewKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviewPrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showPreviewNext();
    }
  }

  function handleScroll(event) {
    const stageMedia = event.currentTarget;
    const slideWidth = stageMedia.clientWidth;

    if (!slideWidth) {
      return;
    }

    const nextIndex = Math.round(stageMedia.scrollLeft / slideWidth);

    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  }

  return (
    <div className={styles.shell}>
      <div className={styles.stage}>
        <div
          ref={stageMediaRef}
          className={styles.stageMedia}
          onScroll={handleScroll}
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              className={styles.stageSlide}
              aria-current={index === activeIndex ? "true" : "false"}
            >
              <button
                type="button"
                className={styles.stageSlideButton}
                onClick={() => openPreview(index)}
                aria-label={`Открыть фото ${index + 1} во весь экран`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 759px) 100vw, (max-width: 1160px) 90vw, 1160px"
                  className={styles.stageImage}
                  priority={index < 2}
                />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.stageTopline}>
          <div className={styles.counter}>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className={styles.counterDivider}>/</span>
            <span>{String(images.length).padStart(2, "0")}</span>
          </div>
          <button
            type="button"
            className={cx(
              buttonStyles.buttonBase,
              buttonStyles.buttonUtility,
              buttonStyles.buttonSm,
              styles.previewHint
            )}
            onClick={() => openPreview(activeIndex)}
          >
            Открыть целиком
          </button>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={cx(
              buttonStyles.buttonBase,
              buttonStyles.buttonUtility,
              styles.navButton
            )}
            onClick={() => showPrev()}
            aria-label="Предыдущее фото"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={cx(
              buttonStyles.buttonBase,
              buttonStyles.buttonUtility,
              styles.navButton
            )}
            onClick={() => showNext()}
            aria-label="Следующее фото"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className={styles.thumbRail} aria-label="Навигация по галерее">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`${styles.thumbButton} ${index === activeIndex ? styles.thumbButtonActive : ""}`}
            onClick={() => goToIndex(index)}
            aria-label={`Открыть фото ${index + 1}`}
            aria-pressed={index === activeIndex}
          >
            <span className={styles.thumbIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.thumbPreview}>
              <Image
                src={image.src}
                alt=""
                fill
                sizes="120px"
                className={styles.thumbImage}
              />
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={previewDialogRef}
        className={styles.previewDialog}
        tabIndex={-1}
        aria-labelledby="gallery-preview-title"
        aria-describedby="gallery-preview-description"
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
        onKeyDown={handlePreviewKeyDown}
      >
        <button
          type="button"
          className={styles.previewBackdrop}
          onClick={closePreview}
          aria-label="Закрыть просмотр"
        />
        <section
          className={styles.previewPanel}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.previewHeader}>
            <div>
              <p id="gallery-preview-title" className={styles.previewKicker}>
                Полный просмотр
              </p>
              <p id="gallery-preview-description" className={styles.previewCaption}>
                {images[previewIndex].alt}
              </p>
            </div>

            <div className={styles.previewActions}>
              <div className={styles.counter}>
                <span>{String(previewIndex + 1).padStart(2, "0")}</span>
                <span className={styles.counterDivider}>/</span>
                <span>{String(images.length).padStart(2, "0")}</span>
              </div>
              <button
                type="button"
                className={cx(
                  buttonStyles.buttonBase,
                  buttonStyles.buttonUtility,
                  buttonStyles.buttonIcon,
                  styles.previewClose
                )}
                onClick={closePreview}
                aria-label="Закрыть просмотр"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>

          <div className={styles.previewViewport}>
            <button
              type="button"
              className={cx(
                buttonStyles.buttonBase,
                buttonStyles.buttonUtility,
                styles.navButton,
                styles.previewNavButton
              )}
              onClick={showPreviewPrev}
              aria-label="Предыдущее фото"
            >
              <span aria-hidden="true">←</span>
            </button>

            <div className={styles.previewMedia}>
              <Image
                src={images[previewIndex].src}
                alt={images[previewIndex].alt}
                fill
                sizes="100vw"
                className={styles.previewImage}
                priority
              />
            </div>

            <button
              type="button"
              className={cx(
                buttonStyles.buttonBase,
                buttonStyles.buttonUtility,
                styles.navButton,
                styles.previewNavButton
              )}
              onClick={showPreviewNext}
              aria-label="Следующее фото"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </dialog>
    </div>
  );
}
