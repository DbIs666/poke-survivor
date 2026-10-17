/** Shared schema.org entity ids and helpers. */
export const SITE_ORIGIN = 'https://poke-survivors.org';
export const SITE_NAME = 'PokeSurvivor Fan Guide';
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

/** Strip HTML tags and decode common entities to plain text (for JSON-LD text fields). */
export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface ItemListEntry {
  /** Display name of the item. */
  name: string;
  /** Optional page or anchor URL (absolute, or a path resolved against the site origin). */
  url?: string;
  /** Optional short description. */
  description?: string;
}

/**
 * Build an ItemList schema object for SEOHead's jsonLd prop.
 * Example: itemListSchema('PokeSurvivor tier list', items.map((p) => ({ name: p.name, url: `/tier-list/#${p.id}` })))
 */
export function itemListSchema(
  name: string,
  items: ItemListEntry[],
  opts: { ordered?: boolean; description?: string } = {},
): Record<string, unknown> {
  return {
    '@type': 'ItemList',
    name,
    ...(opts.description ? { description: opts.description } : {}),
    itemListOrder: opts.ordered === false ? 'https://schema.org/ItemListUnordered' : 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { url: new URL(item.url, SITE_ORIGIN + '/').href } : {}),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}
