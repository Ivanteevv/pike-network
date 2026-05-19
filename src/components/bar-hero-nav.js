"use client";

import { useEffect, useState } from "react";
import { BrandLink } from "@/components/brand-link";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import styles from "./bar-hero-nav.module.css";

export function BarHeroNav({ phoneDisplay, phoneE164, mapUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { href: "#broadcast", label: "Broadcast" },
    { href: "#menu", label: "Меню" },
    { href: "#gallery", label: "Галерея" },
    { href: "#contacts", label: "Контакты" },
  ];

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
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

        <nav className={styles.desktopNav} aria-label="Разделы страницы бара">
          {navItems.map((item) => (
            <BrandLink key={item.href} variant="nav" href={item.href}>
              {item.label}
            </BrandLink>
          ))}
        </nav>

        <BrandLink
          variant="nav"
          className={styles.phoneInline}
          href={`tel:${phoneE164}`}
        >
          {phoneDisplay}
        </BrandLink>
      </div>

      <div className={styles.mobileRow}>
        <BrandLink variant="nav" href="/" className={styles.backLink}>
          Ко всей сети
        </BrandLink>

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
      </div>

      <div
        className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayOpen : ""}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />

      <aside
        id="bar-mobile-nav"
        className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileHeader}>
          <p>Навигация</p>
        </div>

        <div className={styles.mobileBody}>
          <nav className={styles.mobileNav} aria-label="Мобильная навигация по бару">
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

          <div className={styles.mobileQuickLinks}>
            <a className={styles.mobilePhone} href={`tel:${phoneE164}`} onClick={closeMenu}>
              <span className={styles.mobilePhoneLabel}>Бронь и контакт</span>
              <span className={styles.mobilePhoneValue}>{phoneDisplay}</span>
            </a>

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
              Показать на карте
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
