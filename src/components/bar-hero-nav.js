"use client";

import { useEffect, useState } from "react";
import { BrandLink } from "@/components/brand-link";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import { lockPageScroll, unlockPageScroll } from "@/lib/client-scroll-lock";
import styles from "./bar-hero-nav.module.css";

const MOBILE_NAV_SCROLL_LOCK_ID = "bar-mobile-nav";

export function BarHeroNav({ phoneDisplay, phoneE164, mapUrl, navItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasNavItems = navItems.length > 0;
  const hasPhoneLink = phoneDisplay && phoneE164;
  const hasMapLink = Boolean(mapUrl);
  const hasMobilePanelContent = hasNavItems || hasPhoneLink || hasMapLink;

  useEffect(() => {
    if (!isOpen) {
      unlockPageScroll(MOBILE_NAV_SCROLL_LOCK_ID);
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const unlockScroll = lockPageScroll(MOBILE_NAV_SCROLL_LOCK_ID);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  return (
    <>
      <div className={styles.desktopRow}>
        <BrandLink variant="nav" href="/" className={styles.backLink}>
          Ко всей сети
        </BrandLink>

        {hasNavItems ? (
          <nav className={styles.desktopNav} aria-label="Разделы страницы бара">
            {navItems.map((item) => (
              <BrandLink key={item.href} variant="nav" href={item.href}>
                {item.label}
              </BrandLink>
            ))}
          </nav>
        ) : null}

        {hasPhoneLink ? (
          <BrandLink
            variant="nav"
            className={styles.phoneInline}
            href={`tel:${phoneE164}`}
          >
            {phoneDisplay}
          </BrandLink>
        ) : null}
      </div>

      <div className={styles.mobileRow}>
        <BrandLink variant="nav" href="/" className={styles.backLink}>
          Ко всей сети
        </BrandLink>

        {hasMobilePanelContent ? (
          <button
            type="button"
            className={cx(
              buttonStyles.buttonBase,
              buttonStyles.buttonUtility,
              buttonStyles.buttonIcon,
              styles.menuToggle,
              isOpen ? styles.menuToggleOpen : ""
            )}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="bar-mobile-nav"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span
              aria-hidden="true"
              className={`${styles.menuToggleLine} ${styles.menuToggleLineTop}`}
            />
            <span
              aria-hidden="true"
              className={`${styles.menuToggleLine} ${styles.menuToggleLineMiddle}`}
            />
            <span
              aria-hidden="true"
              className={`${styles.menuToggleLine} ${styles.menuToggleLineBottom}`}
            />
          </button>
        ) : null}
      </div>

      {hasMobilePanelContent ? (
        <div
          className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayOpen : ""}`}
          onClick={closeMenu}
          aria-hidden={!isOpen}
        />
      ) : null}

      {hasMobilePanelContent ? (
        <aside
          id="bar-mobile-nav"
          className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ""}`}
          aria-hidden={!isOpen}
        >
          <div className={styles.mobileHeader}>
            <p>Навигация</p>
          </div>

          <div className={styles.mobileBody}>
            {hasNavItems ? (
              <nav
                className={styles.mobileNav}
                aria-label="Мобильная навигация по бару"
              >
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={styles.mobileNavItem}
                  >
                    <span className={styles.mobileNavIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.mobileNavLabel}>{item.label}</span>
                  </a>
                ))}
              </nav>
            ) : null}

            {hasPhoneLink || hasMapLink ? (
              <div className={styles.mobileQuickLinks}>
                {hasPhoneLink ? (
                  <a
                    className={styles.mobilePhone}
                    href={`tel:${phoneE164}`}
                    onClick={closeMenu}
                  >
                    <span className={styles.mobilePhoneLabel}>Бронь и контакт</span>
                    <span className={styles.mobilePhoneValue}>{phoneDisplay}</span>
                  </a>
                ) : null}

                {hasMapLink ? (
                  <a
                    className={cx(
                      buttonStyles.buttonBase,
                      buttonStyles.buttonGhostAction,
                      buttonStyles.buttonMd,
                      buttonStyles.buttonArrow,
                      styles.mobileMap
                    )}
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                  >
                    <span className={buttonStyles.buttonHoverLabel}>
                      Показать на карте
                    </span>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </aside>
      ) : null}
    </>
  );
}
