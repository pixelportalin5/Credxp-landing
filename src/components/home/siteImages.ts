export const SITE_IMAGES = {
  hero: "http://credxp.com/wp-content/uploads/2026/06/credxp-landing-page-hero-1.png",
  one: "http://credxp.com/wp-content/uploads/2026/06/landing-page-credxp-image-3.png",
  two: "http://credxp.com/wp-content/uploads/2026/06/landing-page-image-credxp-4.png",
  three: "http://credxp.com/wp-content/uploads/2026/06/landing-page-credxp-image-5.png",
} as const;

export const SITE_IMAGE_GALLERY = [
  SITE_IMAGES.hero,
  SITE_IMAGES.one,
  SITE_IMAGES.two,
  SITE_IMAGES.three,
] as const;

/** Hero background — landing page hero */
export const HERO_BACKGROUND = SITE_IMAGES.hero;

/** Why Choose CredXp — one image per card (topical match) */
export const WHY_CHOOSE_CARD_IMAGES = [
  "https://credxp.com/wp-content/uploads/2026/06/Gallery-7-scaled.jpg",
  "https://credxp.com/wp-content/uploads/2026/06/Gallery-2-scaled.jpg",
  "https://credxp.com/wp-content/uploads/2026/06/Gallery-1-scaled.jpg",
  "https://credxp.com/wp-content/uploads/2026/06/landing-page-credxp-image-3.png",
  "https://credxp.com/wp-content/uploads/2026/06/Gallery-4-scaled.jpg",
  "https://credxp.com/wp-content/uploads/2026/06/landing-page-image-credxp-4.png",
  "https://credxp.com/wp-content/uploads/2026/06/Gallery-5-scaled.jpg",
  "https://credxp.com/wp-content/uploads/2026/06/Gallery-9-scaled.jpg",
  "https://credxp.com/wp-content/uploads/2026/06/Gallery-3-scaled.jpg",
] as const;

export const PORTFOLIO_GALLERY_IMAGES = [
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-3-scaled.jpg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-2-scaled.jpg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-1-scaled.jpg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-9-scaled.jpg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-4-scaled.jpg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-7-scaled.jpg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-5-scaled.jpg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-10-scaled.jpeg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-8-scaled.jpeg",
  "http://credxp.com/wp-content/uploads/2026/06/Gallery-6-scaled.jpeg",
] as const;
