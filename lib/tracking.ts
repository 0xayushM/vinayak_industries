'use client';

/**
 * Client-side tracking helpers.
 * - page views and conversion events go to /api/track-visitor (first-party sheet)
 * - the same events are pushed to window.dataLayer so GTM / GA4 / LinkedIn can use them
 */

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

const SESSION_KEY = 'vt_sid';
const UTM_KEY = 'vt_utm';
const CONSENT_KEY = 'vt_consent';

export type ConsentState = 'granted' | 'denied' | null;

function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store ? store.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeSet(store: Storage | undefined, key: string, value: string) {
  try {
    store?.setItem(key, value);
  } catch {
    /* storage blocked: ignore */
  }
}

export function getConsent(): ConsentState {
  if (typeof window === 'undefined') return null;
  const v = safeGet(window.localStorage, CONSENT_KEY);
  return v === 'granted' || v === 'denied' ? v : null;
}

/** Forget the visitor's choice and show the consent banner again. */
export function resetConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent('vt-consent-reset'));
}

export function setConsent(value: 'granted' | 'denied') {
  safeSet(window.localStorage, CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent('vt-consent', { detail: value }));
}

export function getSessionId(): string {
  let sid = safeGet(window.sessionStorage, SESSION_KEY);
  if (!sid) {
    sid =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    safeSet(window.sessionStorage, SESSION_KEY, sid);
  }
  return sid;
}

type Utm = { source?: string; medium?: string; campaign?: string };

/** First-touch UTM for this session: kept after the visitor clicks away from the landing URL. */
function getUtm(): Utm {
  const params = new URLSearchParams(window.location.search);
  const fresh: Utm = {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
  };
  if (fresh.source || fresh.medium || fresh.campaign) {
    safeSet(window.sessionStorage, UTM_KEY, JSON.stringify(fresh));
    return fresh;
  }
  try {
    return JSON.parse(safeGet(window.sessionStorage, UTM_KEY) || '{}');
  } catch {
    return {};
  }
}

/** External referrer for the session's first hit; empty for internal navigation. */
function getReferrer(): string {
  const ref = document.referrer;
  if (!ref) return '';
  try {
    return new URL(ref).host === window.location.host ? '' : ref;
  } catch {
    return '';
  }
}

function isAutomated(): boolean {
  return typeof navigator !== 'undefined' && navigator.webdriver === true;
}

export function trackEvent(event: string, props: Record<string, string> = {}) {
  if (typeof window === 'undefined' || isAutomated()) return;

  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, page_path: window.location.pathname, ...props });

  const utm = getUtm();
  const payload = {
    event,
    sessionId: getSessionId(),
    pageUrl: window.location.href,
    path: window.location.pathname,
    referrer: getReferrer(),
    utmSource: utm.source || '',
    utmMedium: utm.medium || '',
    utmCampaign: utm.campaign || '',
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    consent: getConsent() || 'unset',
    ...props,
  };

  const body = JSON.stringify(payload);
  // sendBeacon survives page unloads (e.g. a WhatsApp click that leaves the site)
  if (navigator.sendBeacon) {
    const ok = navigator.sendBeacon('/api/track-visitor', new Blob([body], { type: 'application/json' }));
    if (ok) return;
  }
  fetch('/api/track-visitor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

/**
 * Submit a lead to the Google Sheet and BrewMyAgent in parallel.
 * Succeeds if EITHER destination accepted it, so one service being down
 * no longer loses the lead or shows the visitor an error.
 */
export async function submitLead(opts: {
  formName: string;
  sheetEndpoint: string;
  sheetBody: Record<string, unknown>;
  agentData: Record<string, unknown>;
}): Promise<boolean> {
  const post = (url: string, body: unknown) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => {
      if (!r.ok) throw new Error(`${url} → ${r.status}`);
      return r;
    });

  const [sheet, agent] = await Promise.allSettled([
    post(opts.sheetEndpoint, opts.sheetBody),
    post('/api/brewmy-agent', { form_name: opts.formName, data: opts.agentData }),
  ]);

  if (sheet.status === 'rejected') console.error('Lead not saved to sheet:', sheet.reason);
  if (agent.status === 'rejected') console.error('Lead not sent to BrewMyAgent:', agent.reason);

  const ok = sheet.status === 'fulfilled' || agent.status === 'fulfilled';
  if (ok) trackEvent('generate_lead', { form_name: opts.formName });
  return ok;
}
