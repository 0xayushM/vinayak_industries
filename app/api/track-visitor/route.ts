import { NextRequest, NextResponse, after } from 'next/server';
import { appendVisitorTracking } from '@/lib/googleSheets';

/**
 * First-party visitor log → "Visitor Tracking" sheet.
 *
 * Column order (A–V). A–P keep the original positions so old rows stay aligned:
 *  A Timestamp | B IP | C User Agent | D Referrer | E Page URL | F Country | G City
 *  H Region | I Latitude (blank) | J Longitude (blank) | K Timezone | L Browser | M OS
 *  N Device | O Resolution | P Language | Q Session ID | R Event | S UTM Source
 *  T UTM Medium | U UTM Campaign | V Path
 */

const BOT_UA =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gtmetrix|preview|vercel|python|curl|wget|axios|node-fetch|go-http|java\/|okhttp|facebookexternalhit|whatsapp|embedly|scrap|monitor|uptime|pingdom|semrush|ahrefs|bingpreview/i;

// Hosts that are our own dev/preview traffic, never real visitors.
const INTERNAL_HOST = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$|\.vercel\.app$/i;

const ALLOWED_EVENTS = new Set(['page_view', 'whatsapp_click', 'deck_download', 'generate_lead', 'phone_click', 'email_click', 'form_start', 'form_abandon']);

function parseUA(ua: string) {
  const os = /Android/i.test(ua)
    ? 'Android'
    : /iPhone|iPad|iPod/i.test(ua)
      ? 'iOS'
      : /Windows/i.test(ua)
        ? 'Windows'
        : /Mac OS X|Macintosh/i.test(ua)
          ? 'macOS'
          : /CrOS/i.test(ua)
            ? 'ChromeOS'
            : /Linux|X11/i.test(ua)
              ? 'Linux'
              : 'Unknown';

  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /OPR\/|Opera/.test(ua)
      ? 'Opera'
      : /SamsungBrowser/.test(ua)
        ? 'Samsung Internet'
        : /Firefox|FxiOS/.test(ua)
          ? 'Firefox'
          : /Chrome|CriOS/.test(ua)
            ? 'Chrome'
            : /Safari/.test(ua)
              ? 'Safari'
              : 'Unknown';

  const device = /iPad|Tablet|Android(?!.*Mobile)/i.test(ua)
    ? 'Tablet'
    : /Mobi|iPhone|iPod|Android/i.test(ua)
      ? 'Mobile'
      : 'Desktop';

  return { os, browser, device };
}

/** Without consent, keep only the network part of the IP (DPDP data minimisation). */
function maskIp(ip: string) {
  if (ip.includes(':')) return ip.split(':').slice(0, 3).join(':') + '::';
  const p = ip.split('.');
  return p.length === 4 ? `${p[0]}.${p[1]}.${p[2]}.0` : ip;
}

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.slice(0, max) : '');

function decode(v: string | null) {
  if (!v) return '';
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    if (!userAgent || BOT_UA.test(userAgent)) {
      return new NextResponse(null, { status: 204 });
    }

    const body = await request.json().catch(() => ({}));
    const pageUrl = str(body.pageUrl, 1000);

    let host = '';
    try {
      host = new URL(pageUrl).host;
    } catch {
      /* invalid URL */
    }
    if (!host || INTERNAL_HOST.test(host)) {
      return new NextResponse(null, { status: 204 });
    }

    const event = ALLOWED_EVENTS.has(body.event) ? body.event : 'page_view';

    // x-forwarded-for may be a chain "client, proxy1, proxy2" — the client is first.
    const rawIp =
      (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const ip = body.consent === 'granted' ? rawIp : maskIp(rawIp);

    // Geo from Vercel's edge headers: server-side, free, not blocked by ad blockers.
    const country = request.headers.get('x-vercel-ip-country') || '';
    const city = decode(request.headers.get('x-vercel-ip-city'));
    const region = request.headers.get('x-vercel-ip-country-region') || '';
    const timezone = request.headers.get('x-vercel-ip-timezone') || str(body.timezone, 64);

    const { os, browser, device } = parseUA(userAgent);

    const values = [[
      new Date().toISOString(),
      ip,
      userAgent.slice(0, 400),
      str(body.referrer, 1000),
      pageUrl,
      country,
      city,
      region,
      '', // latitude: intentionally not stored
      '', // longitude: intentionally not stored
      timezone,
      browser,
      os,
      device,
      str(body.screenResolution, 20),
      str(body.language, 20),
      str(body.sessionId, 64),
      event,
      str(body.utmSource, 100),
      str(body.utmMedium, 100),
      str(body.utmCampaign, 150),
      // form_abandon: record which fields were filled (names only) next to the path
      str(body.path, 300) + (body.fields_filled ? ` [filled: ${str(body.fields_filled, 120) || 'none'}]` : ''),
    ]];

    await appendVisitorTracking(values);

    // Keep BrewMyAgent receiving page views (previously sent from the browser).
    const endpoint = process.env.BREW_MY_AGENT_ENDPOINT;
    const apiKey = process.env.BREW_MY_AGENT_API_KEY;
    if (endpoint && apiKey) {
      // after(): runs once the response is sent, without being cut off by the serverless runtime
      after(() => fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          form_name: 'visitor_tracking',
          data: { event, pageUrl, path: body.path, country, city, region, browser, os, deviceType: device, referrer: body.referrer, utmSource: body.utmSource },
        }),
      }).then(() => undefined).catch((e) => console.error('BrewMyAgent visitor forward failed:', e)));
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in track-visitor API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
