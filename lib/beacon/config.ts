/**
 * Where Beacon is and which site this is, from the site's environment:
 *
 *   NEXT_PUBLIC_BEACON_URL       https://beacon.vinayaktechnoplast.com
 *   NEXT_PUBLIC_BEACON_SITE_KEY  bk_…  (public: in the tracker tag)
 *   BEACON_SITE_SECRET           bs_…  (private: server only — previews,
 *                                       the bot tap's HMAC, revalidation)
 *
 * BEACON_URL and BEACON_SITE_KEY (without NEXT_PUBLIC_) also work on the
 * server. Every helper also takes them as options, for a site that names
 * them differently.
 */

export const DEFAULT_BEACON_URL = 'https://beacon.vinayaktechnoplast.com';

const read = (name: string): string | undefined => {
  try {
    const v = typeof process !== 'undefined' ? process.env[name] : undefined;
    return v ? v : undefined;
  } catch {
    return undefined;
  }
};

export function beaconUrl(override?: string): string {
  return (override ?? read('NEXT_PUBLIC_BEACON_URL') ?? read('BEACON_URL') ?? DEFAULT_BEACON_URL).replace(/\/+$/, '');
}

export function siteKey(override?: string): string | undefined {
  return override ?? read('NEXT_PUBLIC_BEACON_SITE_KEY') ?? read('BEACON_SITE_KEY');
}

export function siteSecret(override?: string): string | undefined {
  return override ?? read('BEACON_SITE_SECRET');
}
