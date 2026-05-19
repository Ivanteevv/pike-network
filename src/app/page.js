import { HeroMedia } from "@/components/hero-media";
import { JsonLd } from "@/components/json-ld";
import { MagneticSelectBarButton } from "@/components/magnetic-select-bar-button";
import { NetworkPointsSection } from "@/components/network-points";
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
            <div className={styles.heroStage}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>{network.hero.eyebrow}</p>
                <h1>{network.hero.title}</h1>
                <p className={styles.heroDescription}>{network.hero.description}</p>

                <div className={styles.actions}>
                  <MagneticSelectBarButton href="#bars" />
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
                  <h2>{network.locationChoice.title}</h2>
                </div>
                <NetworkPointsSection
                  bars={bars}
                  copy={network.locationChoice}
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
