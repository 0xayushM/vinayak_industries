/**
 * @beacon/next — Beacon on a Next.js site (spec section 7).
 *
 *   // app/layout.tsx
 *   import { BeaconScript } from '@beacon/next';
 *   <BeaconScript siteKey={process.env.NEXT_PUBLIC_BEACON_SITE_KEY!} />
 *
 * Other entry points: @beacon/next/middleware (AI-bot tap),
 * @beacon/next/content (blog posts), @beacon/next/revalidate (publish
 * webhook), @beacon/next/form (enquiry forms). Contracts: docs/contracts.md.
 */

import Script from 'next/script';
import { beaconUrl } from './config';

export type BeaconScriptProps = {
  siteKey: string;
  /** Beacon's address; default NEXT_PUBLIC_BEACON_URL */
  apiUrl?: string;
  /** count visitors who send Do Not Track (default: respect it) */
  ignoreDnt?: boolean;
  /** also send from localhost and preview hosts (default: no) */
  local?: boolean;
  /** consent mode (A8): keep a visitor id only after beacon.consent(true) */
  consent?: 'required';
  /** a plain <script defer> instead of next/script (e.g. outside the App Router) */
  plain?: boolean;
};

/** Lets beacon('track', …) calls made before b.js loads wait in a queue. */
export const BEACON_STUB = 'window.beacon=window.beacon||function(){(beacon.q=beacon.q||[]).push(arguments)}';

export function BeaconScript({ siteKey, apiUrl, ignoreDnt, local, consent, plain }: BeaconScriptProps) {
  const base = beaconUrl(apiUrl);
  const attrs: Record<string, string> = { 'data-site': siteKey };
  if (apiUrl) attrs['data-api'] = base;
  if (ignoreDnt) attrs['data-dnt'] = 'off';
  if (local) attrs['data-local'] = 'on';
  if (consent) attrs['data-consent'] = consent;
  return (
    <>
      <script id="beacon-stub" dangerouslySetInnerHTML={{ __html: BEACON_STUB }} />
      {plain ? <script defer src={`${base}/b.js`} {...attrs} /> : <Script id="beacon" src={`${base}/b.js`} strategy="afterInteractive" {...attrs} />}
    </>
  );
}

/** Track a custom event from client code: beaconTrack('download_datasheet', { product: 'MCB C16' }). */
export function beaconTrack(name: string, props?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { beacon?: (cmd: string, ...a: unknown[]) => void };
  w.beacon?.('track', name, props);
}

/** Consent mode: call after the visitor accepts (true) or declines/withdraws (false). */
export function beaconConsent(yes: boolean): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { beacon?: (cmd: string, ...a: unknown[]) => void };
  w.beacon?.('consent', yes);
}

/**
 * Send a submitted form to Beacon (Forms → this site → a table per form name).
 * Use it where the site posts the form itself (fetch/JSON), after it was
 * accepted; mark that <form> with data-beacon-ignore so it is not captured twice.
 *   beaconForm('Quote request', { Name: 'Ravi', Email: 'ravi@…', Message: '…' })
 */
export function beaconForm(name: string, fields: Record<string, string | number | boolean | null | undefined>): void {
  if (typeof window === 'undefined') return;
  const d: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) if (v !== null && v !== undefined && String(v).trim() !== '') d[k] = String(v);
  if (!Object.keys(d).length) return;
  const w = window as unknown as { beacon?: (cmd: string, ...a: unknown[]) => void };
  w.beacon?.('form', name, d);
}
