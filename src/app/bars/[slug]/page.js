import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroMedia } from "@/components/hero-media";
import { JsonLd } from "@/components/json-ld";
import { BarHeroNav } from "@/components/bar-hero-nav";
import { BarGallery } from "@/components/bar-gallery";
import { SiteFooter } from "@/components/site-footer";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import { getBarBySlug, getBars, getSiteData } from "@/lib/content/get-site-data";
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
  const networkBars = siteData.bars;

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
                <a
                  className={cx(
                    buttonStyles.buttonBase,
                    buttonStyles.buttonGhostAction,
                    styles.heroTextAction,
                    styles.heroTextActionStrong
                  )}
                  href={`tel:${bar.phoneE164}`}
                >
                  Позвонить
                </a>
                <a
                  className={cx(
                    buttonStyles.buttonBase,
                    buttonStyles.buttonGhostAction,
                    buttonStyles.buttonArrow,
                    styles.heroTextAction
                  )}
                  href="#menu"
                >
                  Меню
                </a>
              </div>
            </div>
          </div>
        </div>
      </HeroMedia>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.bestForCard}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionKicker}>Что Здесь Есть</p>
              <h2>Еда, пиво и трансляции без лишних описаний</h2>
            </div>
            <ul className={styles.bestForList}>
              {bar.bestFor.map((item) => (
                <li key={item} className={styles.bestForItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="menu" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Меню</p>
            <h2>Структура уже готова под заменяемые разделы и PDF</h2>
          </div>
          <div className={styles.cardGrid}>
            {bar.menuLinks.map((item) => (
              <article key={item.title} className={styles.infoCard}>
                <p className={styles.infoCardStatus}>{item.status}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cx(
                      buttonStyles.buttonBase,
                      buttonStyles.buttonGhostAction,
                      buttonStyles.buttonArrow,
                      styles.menuTextAction
                    )}
                  >
                    Открыть
                  </a>
                ) : (
                  <span className={styles.placeholderLink}>Скоро подключим ссылку</span>
                )}
              </article>
            ))}
          </div>
          <div className={styles.previewChips}>
            {bar.menuPreview.map((preview) => (
              <span key={preview.name} className={styles.previewChip}>
                <strong>{preview.name}</strong>
                <em>{preview.note}</em>
              </span>
            ))}
          </div>
        </section>

        <section id="gallery" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Галерея</p>
            <h2>Визуальная атмосфера бара</h2>
          </div>
          <BarGallery images={bar.gallery} />
        </section>

        <section
          id="contacts"
          className={`${styles.section} ${styles.contactsSection}`}
        >
          <div className={styles.contactsCard}>
            <div className={styles.contactsIntro}>
              <p className={styles.sectionKicker}>Сеть</p>
              <h2>Быстро переключиться между барами сети</h2>

              <div className={styles.contactActions}>
                <a
                  className={cx(
                    buttonStyles.buttonBase,
                    buttonStyles.buttonGhostAction,
                    styles.contactTextAction
                  )}
                  href={`tel:${bar.phoneE164}`}
                >
                  Позвонить
                </a>
                <a
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
                </a>
              </div>
            </div>

            <div className={styles.switchSection}>
              <p className={styles.switchLabel}>Другие локации</p>
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
                      <span className={styles.switchOptionState}>Вы сейчас здесь</span>
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
                      <span className={styles.switchOptionState}>Открыть страницу</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter network={siteData.network} />
    </div>
  );
}
