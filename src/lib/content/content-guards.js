export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function getRenderableMenus(menus) {
  return asArray(menus)
    .filter((menu) => hasText(menu?.href))
    .map((menu) => ({
      ...menu,
      previewImages: asArray(menu.previewImages)
        .filter((image) => hasText(image?.src))
        .map((image) => ({
          ...image,
          alt: image.alt ?? "",
        })),
    }))
    .filter((menu) => menu.previewImages.length > 0);
}

export function getRenderableGalleryImages(images) {
  return asArray(images)
    .filter((image) => hasText(image?.src))
    .map((image) => ({
      ...image,
      alt: image.alt ?? "",
    }));
}

export function hasMultipleGalleryImages(images) {
  return getRenderableGalleryImages(images).length > 1;
}

export function getSocialLinks(socials) {
  return asArray(socials).filter(
    (social) => hasText(social?.label) && hasText(social?.href)
  );
}

export function getRenderableBars(bars) {
  return asArray(bars)
    .filter((bar) => hasText(bar?.slug) && hasText(bar?.shortLabel))
    .map((bar) => ({
      ...bar,
      addressLine: hasText(bar.addressLine)
        ? bar.addressLine
        : bar.locationLabel || "Адрес уточняется",
    }));
}

export function getVisibleBarNavItems({
  hasBroadcastsSection = true,
  hasMenuSection = false,
  hasGallerySection = false,
  hasContactsSection = true,
} = {}) {
  return [
    hasBroadcastsSection ? { href: "#broadcast", label: "Трансляции" } : null,
    hasMenuSection ? { href: "#menu", label: "Меню" } : null,
    hasGallerySection ? { href: "#gallery", label: "Галерея" } : null,
    hasContactsSection ? { href: "#contacts", label: "Контакты" } : null,
  ].filter(Boolean);
}
