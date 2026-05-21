import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLink } from "@/components/brand-link";
import { HeroMedia } from "@/components/hero-media";
import { JsonLd } from "@/components/json-ld";
import { BarHeroNav } from "@/components/bar-hero-nav";
import { BarBroadcasts } from "@/components/bar-broadcasts";
import { BarGallery } from "@/components/bar-gallery";
import { MenuPdfViewer } from "@/components/menu-pdf-viewer";
import { SiteFooter } from "@/components/site-footer";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import { getBarBySlug, getBars, getSiteData } from "@/lib/content/get-site-data";
import {
  getRenderableBars,
  getRenderableGalleryImages,
  getRenderableMenus,
  getVisibleBarNavItems,
} from "@/lib/content/content-guards";
import { siteUrl } from "@/lib/site-url";
import styles from "./page.module.css";

function formatHeroLocation(bar) {
  return bar.addressLine.replace(/^ул\.?\s*/i, "");
}

function formatHeroEyebrow(bar) {
  return `Бар · ${bar.city}`;
}

function buildBarSchema(bar) {
  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: `${bar.name} ${bar.locationLabel}`,
    description: bar.seo.description,
    telephone: bar.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: bar.addressLine,
      addressLocality: bar.city,
      addressCountry: "RU",
    },
    url: `${siteUrl}/bars/${bar.slug}`,
  };
}

export async function generateStaticParams() {
  const bars = await getBars();
  return bars.map((bar) => ({ slug: bar.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const bar = await getBarBySlug(slug);

  if (!bar) {
    return {
      title: "Бар не найден",
    };
  }

  return {
    title: bar.seo.title,
    description: bar.seo.description,
  };
}

export default async function BarPage({ params }) {
  const { slug } = await params;
  const [siteData, bar] = await Promise.all([getSiteData(), getBarBySlug(slug)]);

  if (!bar) {
    notFound();
  }

  const heroEyebrow = formatHeroEyebrow(bar);
  const heroLocation = formatHeroLocation(bar);
  const networkBars = getRenderableBars(siteData.bars);
  const broadcasts = bar.broadcasts ?? [];
  const menuLinks = getRenderableMenus(bar.menuLinks);
  const galleryImages = getRenderableGalleryImages(bar.gallery);
  const hasMenuSection = menuLinks.length > 0;
  const hasGallerySection = galleryImages.length > 0;
  const navItems = getVisibleBarNavItems({
    hasBroadcastsSection: true,
    hasMenuSection,
    hasGallerySection,
    hasContactsSection: true,
  });
  const hasMultipleNetworkBars = networkBars.length > 1;

  return (
    <div id="page-top" className={styles.page}>
      <JsonLd data={buildBarSchema(bar)} />

      <HeroMedia media={bar.hero} priority variant="immersive">
        <div className={styles.heroInner}>
          <div className={styles.heroTopline}>
            <BarHeroNav
              phoneDisplay={bar.phoneDisplay}
              phoneE164={bar.phoneE164}
              mapUrl={bar.mapUrl}
              navItems={navItems}
            />
          </div>

          <div className={styles.heroStage}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>{heroEyebrow}</p>
              <h1 className={styles.heroBrand}>{bar.name}</h1>
              <p className={styles.heroLocation}>{heroLocation}</p>

              <div className={styles.heroMeta}>
                {bar.hours.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className={styles.actions}>
                <BrandLink
                  variant="ghost"
                  className={cx(
                    buttonStyles.buttonBase,
                    buttonStyles.buttonGhostAction,
                    styles.heroTextAction,
                    styles.heroTextActionStrong
                  )}
                  href={`tel:${bar.phoneE164}`}
                >
                  Позвонить
                </BrandLink>
                {hasMenuSection ? (
                  <BrandLink
                    variant="ghost"
                    className={cx(
                      buttonStyles.buttonBase,
                      buttonStyles.buttonGhostAction,
                      buttonStyles.buttonArrow,
                      styles.heroTextAction
                    )}
                    href="#menu"
                  >
                    Меню
                  </BrandLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </HeroMedia>

      <main className={styles.main}>
        <section id="broadcast" className={`${styles.section} ${styles.broadcastSection}`}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>СПОРТ НА ЭКРАНЕ</p>
            <h2>Трансляции в баре</h2>
          </div>
          <BarBroadcasts broadcasts={broadcasts} />
        </section>

        {hasMenuSection ? (
          <section id="menu" className={styles.section}>
            <div className={`${styles.sectionHeading} ${styles.menuHeading}`}>
              <p className={styles.sectionKicker}>Меню</p>
              <h2>Барная карта и меню кухни</h2>
            </div>
            <MenuPdfViewer menus={menuLinks} />
          </section>
        ) : null}

        {hasGallerySection ? (
          <section id="gallery" className={styles.section}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionKicker}>Галерея</p>
              <h2>Визуальная атмосфера бара</h2>
            </div>
            <BarGallery images={galleryImages} />
          </section>
        ) : null}

        <section
          id="contacts"
          className={`${styles.section} ${styles.contactsSection}`}
        >
          <div className={styles.contactsCard}>
            <div className={styles.contactsIntro}>
              <p className={styles.sectionKicker}>Сеть</p>
              <h2>Быстро переключиться между барами сети</h2>

              <div className={styles.contactActions}>
                <BrandLink
                  variant="ghost"
                  className={cx(
                    buttonStyles.buttonBase,
                    buttonStyles.buttonGhostAction,
                    styles.contactTextAction
                  )}
                  href={`tel:${bar.phoneE164}`}
                >
                  Позвонить
                </BrandLink>
                <BrandLink
                  variant="ghost"
                  className={cx(
                    buttonStyles.buttonBase,
                    buttonStyles.buttonGhostAction,
                    buttonStyles.buttonArrow,
                    styles.contactTextAction
                  )}
                  href={bar.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть карту
                </BrandLink>
              </div>
            </div>

            <div className={styles.switchSection}>
              <p className={styles.switchLabel}>
                {hasMultipleNetworkBars ? "Другие локации" : "Локация"}
              </p>
              {networkBars.length > 0 ? (
                <div className={styles.switchGrid}>
                  {networkBars.map((networkBar) => {
                    const isCurrentBar = networkBar.slug === bar.slug;

                    return isCurrentBar ? (
                      <div
                        key={networkBar.slug}
                        className={`${styles.switchOption} ${styles.switchOptionCurrent}`}
                      >
                        <span className={styles.switchOptionTitle}>
                          {networkBar.shortLabel}
                        </span>
                        <span className={styles.switchOptionMeta}>
                          {networkBar.addressLine}
                        </span>
                        <span className={styles.switchOptionState}>
                          Вы сейчас здесь
                        </span>
                      </div>
                    ) : (
                      <Link
                        key={networkBar.slug}
                        href={`/bars/${networkBar.slug}`}
                        className={styles.switchOption}
                      >
                        <span className={styles.switchOptionTitle}>
                          {networkBar.shortLabel}
                        </span>
                        <span className={styles.switchOptionMeta}>
                          {networkBar.addressLine}
                        </span>
                        <span className={styles.switchOptionState}>
                          Открыть страницу
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className={styles.switchEmpty}>
                  Список точек обновляется. Ближайшую Щуку подскажем по телефону.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter network={siteData.network} />
    </div>
  );
}
