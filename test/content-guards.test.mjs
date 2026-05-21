import assert from "node:assert/strict";
import test from "node:test";

import {
  getRenderableBars,
  getRenderableGalleryImages,
  getRenderableMenus,
  getSocialLinks,
  getVisibleBarNavItems,
  hasMultipleGalleryImages,
} from "../src/lib/content/content-guards.js";

test("filters empty CMS collections into renderable menu, gallery, social, and bar lists", () => {
  assert.deepEqual(getRenderableMenus(null), []);
  assert.deepEqual(
    getRenderableMenus([
      null,
      { title: "Без файла", href: null, previewImages: [{ src: "/menu.jpg" }] },
      { title: "Без превью", href: "/menu.pdf", previewImages: [] },
      {
        title: "Барная карта",
        href: "/bar.pdf",
        previewImages: [{ src: "/bar.jpg", alt: "Барная карта" }],
      },
    ]),
    [
      {
        title: "Барная карта",
        href: "/bar.pdf",
        previewImages: [{ src: "/bar.jpg", alt: "Барная карта" }],
      },
    ]
  );

  assert.deepEqual(getRenderableGalleryImages(undefined), []);
  assert.deepEqual(getRenderableGalleryImages([{ alt: "Пустое фото" }]), []);
  assert.deepEqual(getRenderableGalleryImages([{ src: "/photo.jpg" }]), [
    { src: "/photo.jpg", alt: "" },
  ]);

  assert.deepEqual(getSocialLinks([{ label: "Telegram" }, { href: "/vk" }]), []);
  assert.deepEqual(getRenderableBars([{ slug: "bar-a" }, { shortLabel: "Бар" }]), []);
  assert.deepEqual(getRenderableBars([{ slug: "bar-a", shortLabel: "Бар" }]), [
    { slug: "bar-a", shortLabel: "Бар", addressLine: "Адрес уточняется" },
  ]);
});

test("keeps single-image galleries visible without treating them as carousels", () => {
  const images = getRenderableGalleryImages([{ src: "/photo.jpg", alt: "Зал" }]);

  assert.equal(images.length, 1);
  assert.equal(hasMultipleGalleryImages(images), false);
});

test("builds bar navigation only for sections that are visible", () => {
  assert.deepEqual(
    getVisibleBarNavItems({
      hasBroadcastsSection: true,
      hasMenuSection: false,
      hasGallerySection: true,
      hasContactsSection: true,
    }),
    [
      { href: "#broadcast", label: "Трансляции" },
      { href: "#gallery", label: "Галерея" },
      { href: "#contacts", label: "Контакты" },
    ]
  );
});
