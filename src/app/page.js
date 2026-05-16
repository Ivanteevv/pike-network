import { HeroMedia } from "@/components/hero-media";
import { JsonLd } from "@/components/json-ld";
import { MagneticSelectBarButton } from "@/components/magnetic-select-bar-button";
import { NetworkPointsSection } from "@/components/network-points";
import buttonStyles from "@/components/button.module.css";
import { cx } from "@/lib/class-names";
import { getSiteData } from "@/lib/content/get-site-data";
import { siteUrl } from "@/lib/site-url";
import styles from "./page.module.css";

function buildNetworkSchema(siteData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteData.network.displayName,
    description: siteData.network.seo.description,
    url: siteUrl,
  };
}

export default async function HomePage() {
  const siteData = await getSiteData();
  const { network, bars } = siteData;

  return (
    <div id="page-top" className={styles.page}>
      <JsonLd data={buildNetworkSchema(siteData)} />

      <div className={styles.heroOverlayScene}>
        <HeroMedia
          media={network.hero.media}
          priority
          variant="immersive"
          className={styles.overlayHero}
        >
          <div className={styles.heroInner}>
            <div className={styles.heroTopline}>
              <a
                className={cx(
                  buttonStyles.buttonBase,
                  buttonStyles.buttonGhostAction,
                  buttonStyles.buttonSm,
                  styles.heroPhone
                )}
                href={`tel:${network.phoneE164}`}
              >
                {network.phoneDisplay}
              </a>
            </div>

            <div className={styles.heroStage}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>{network.hero.eyebrow}</p>
                <h1>{network.hero.title}</h1>
                <p className={styles.heroDescription}>{network.hero.description}</p>

                <div className={styles.actions}>
                  <MagneticSelectBarButton href="#bars" />
                  <a
                    className={cx(
                      buttonStyles.buttonBase,
                      buttonStyles.buttonGhostAction,
                      buttonStyles.buttonLg,
                      styles.heroAction
                    )}
                    href={`tel:${network.phoneE164}`}
                  >
                    Позвонить
                  </a>
                </div>
              </div>
            </div>
          </div>
        </HeroMedia>

        <div id="bars" className={styles.overlayContent}>
          <main className={styles.main}>
            <section className={styles.section}>
              <div className={styles.sectionFrame}>
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionKicker}>
                    {network.locationChoice.eyebrow}
                  </p>
                  <h2>{network.locationChoice.title}</h2>
                  <p>{network.locationChoice.description}</p>
                </div>
                <NetworkPointsSection
                  bars={bars}
                  copy={network.locationChoice}
                  phoneE164={network.phoneE164}
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
