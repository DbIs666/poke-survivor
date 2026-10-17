/**
 * Intrinsic pixel sizes of images in public/, keyed by public path.
 * Used by SEOHead to emit correct og:image:width/height/type.
 * Update this map when adding or replacing an image.
 */
export const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '/og-default.jpg': { width: 1200, height: 630 },
  '/og-default.webp': { width: 1200, height: 630 },
  '/apple-touch-icon.png': { width: 180, height: 180 },
  '/images/pokesurvivor-coop.webp': { width: 1200, height: 520 },
  '/images/pokesurvivor-menu.webp': { width: 1280, height: 720 },
  '/images/pokesurvivor-mobile-controls.webp': { width: 1200, height: 700 },
  '/images/pokesurvivor-rift-arenas.webp': { width: 1300, height: 790 },
  '/images/pokesurvivor-starters-29.webp': { width: 1240, height: 1080 },
  '/images/pokesurvivor-tier-list.webp': { width: 1280, height: 722 },
  '/images/pokesurvivor-zh-guide.webp': { width: 1200, height: 560 },
  // JPG copies for og:image (generated from the .webp with sharp, same pixel size).
  '/images/pokesurvivor-coop.jpg': { width: 1200, height: 520 },
  '/images/pokesurvivor-menu.jpg': { width: 1280, height: 720 },
  '/images/pokesurvivor-mobile-controls.jpg': { width: 1200, height: 700 },
  '/images/pokesurvivor-rift-arenas.jpg': { width: 1300, height: 790 },
  '/images/pokesurvivor-starters-29.jpg': { width: 1240, height: 1080 },
  '/images/pokesurvivor-tier-list.jpg': { width: 1280, height: 722 },
  '/images/pokesurvivor-zh-guide.jpg': { width: 1200, height: 560 },
};

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
  svg: 'image/svg+xml',
};

/** Normalize a path or same-site absolute URL to its public pathname. */
function toPath(pathOrUrl: string): string {
  try {
    return new URL(pathOrUrl, 'https://poke-survivors.org/').pathname;
  } catch {
    return pathOrUrl;
  }
}

export function getImageDimensions(pathOrUrl: string): { width: number; height: number } | undefined {
  return IMAGE_DIMENSIONS[toPath(pathOrUrl)];
}

export function getImageMimeType(pathOrUrl: string): string | undefined {
  const ext = toPath(pathOrUrl).split('.').pop()?.toLowerCase() ?? '';
  return MIME[ext];
}
