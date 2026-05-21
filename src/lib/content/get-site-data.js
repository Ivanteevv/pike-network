import { mockSiteData } from "./mock-site-data";
import {
  asArray,
  getRenderableBars,
  getRenderableGalleryImages,
  getRenderableMenus,
  getSocialLinks,
} from "./content-guards";

function normalizeBar(bar) {
  return {
    ...bar,
    hours: asArray(bar.hours).filter(Boolean),
    bestFor: asArray(bar.bestFor).filter(Boolean),
    features: asArray(bar.features).filter(Boolean),
    events: asArray(bar.events).filter(Boolean),
    broadcasts: asArray(bar.broadcasts).filter((broadcast) => broadcast?.title),
    gallery: getRenderableGalleryImages(bar.gallery),
    menuLinks: getRenderableMenus(bar.menuLinks),
    menuPreview: asArray(bar.menuPreview).filter(Boolean),
    socialLinks: getSocialLinks(bar.socialLinks),
  };
}

function normalizeSiteData(siteData) {
  const bars = getRenderableBars(siteData.bars).map((bar) => normalizeBar(bar));

  return {
    ...siteData,
    network: {
      ...siteData.network,
      socials: getSocialLinks(siteData.network?.socials),
    },
    bars,
  };
}

export async function getSiteData() {
  return normalizeSiteData(mockSiteData);
}

export async function getBars() {
  return normalizeSiteData(mockSiteData).bars;
}

export async function getBarBySlug(slug) {
  return normalizeSiteData(mockSiteData).bars.find((bar) => bar.slug === slug) ?? null;
}
