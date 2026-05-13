import Image from "next/image";
import { HeroMedia } from "@/components/hero-media";
import { JsonLd } from "@/components/json-ld";
import { NetworkPointsSection } from "@/components/network-points";
import { SiteFooter } from "@/components/site-footer";
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

      <HeroMedia media={network.hero.media} priority variant="immersive">
        <div className={styles.heroInner}>
          <div className={styles.heroTopline}>
            <Image
              className={styles.heroLogo}
              src={network.logoUrl}
              alt={network.name}
              width={76}
              height={76}
              priority
            />
            <a className={styles.heroPhone} href={`tel:${network.phoneE164}`}>
              {network.phoneDisplay}
            </a>
          </div>

          <div className={styles.heroStage}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>{network.hero.eyebrow}</p>
              <h1>{network.hero.title}</h1>
              <p className={styles.heroDescription}>{network.hero.description}</p>

              <div className={styles.actions}>
                <a className={styles.primaryAction} href="#bars">
                  Выбрать бар
                </a>
                <a
                  className={`${styles.secondaryAction} ${styles.phoneAction}`}
                  href={`tel:${network.phoneE164}`}
                >
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </HeroMedia>

      <main className={styles.main}>
        <section id="bars" className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>{network.locationChoice.eyebrow}</p>
            <h2>{network.locationChoice.title}</h2>
            <p>{network.locationChoice.description}</p>
          </div>
          <NetworkPointsSection
            bars={bars}
            copy={network.locationChoice}
            phoneE164={network.phoneE164}
          />
        </section>
      </main>

      <SiteFooter network={network} />
    </div>
  );
}
