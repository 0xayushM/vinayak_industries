'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConsent, setConsent, type ConsentState } from '@/lib/tracking';

type TagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  __vtMarketingLoaded?: boolean;
};

/** Third-party trackers that identify visitors or companies: only loaded after consent. */
function loadMarketingTags() {
  const w = window as TagWindow;
  if (w.__vtMarketingLoaded) return;
  w.__vtMarketingLoaded = true;

  // Apollo website visitor tracker (company identification)
  const apollo = document.createElement('script');
  apollo.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${Math.random().toString(36).slice(2, 9)}`;
  apollo.async = true;
  apollo.defer = true;
  apollo.onload = () => {
    (window as unknown as { trackingFunctions?: { onLoad: (o: { appId: string }) => void } }).trackingFunctions?.onLoad({
      appId: '69c2849cd2c4040015ed6ff6',
    });
  };
  document.head.appendChild(apollo);

  // RB2B (person-level identification, US traffic only)
  const rb2bKey = 'R6G5YH871V65';
  const rb2b = document.createElement('script');
  rb2b.async = true;
  rb2b.src = `https://ddwl4m2hdecbv.cloudfront.net/b/${rb2bKey}/${rb2bKey}.js.gz`;
  document.head.appendChild(rb2b);

  // Microsoft Clarity (session recordings)
  const c = window as unknown as { clarity?: { q?: unknown[] } & ((...a: unknown[]) => void) };
  if (!c.clarity) {
    const q: unknown[] = [];
    const fn = ((...args: unknown[]) => {
      q.push(args);
    }) as ((...a: unknown[]) => void) & { q?: unknown[] };
    fn.q = q;
    c.clarity = fn;
  }
  const clarity = document.createElement('script');
  clarity.async = true;
  clarity.src = 'https://www.clarity.ms/tag/xypkl0pwhk';
  document.head.appendChild(clarity);
}

function updateGoogleConsent(state: 'granted' | 'denied') {
  (window as TagWindow).gtag?.('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

export default function ConsentAndTags() {
  const [consent, setLocal] = useState<ConsentState | 'loading'>('loading');

  useEffect(() => {
    const current = getConsent();
    setLocal(current);
    if (current === 'granted') loadMarketingTags();

    // "Cookie settings" (footer / privacy page) clears the choice and reopens the banner
    const reopen = () => setLocal(null);
    window.addEventListener('vt-consent-reset', reopen);
    return () => window.removeEventListener('vt-consent-reset', reopen);
  }, []);

  const choose = (value: 'granted' | 'denied') => {
    const wasLoaded = (window as TagWindow).__vtMarketingLoaded;
    setConsent(value);
    updateGoogleConsent(value);
    if (value === 'granted') loadMarketingTags();
    setLocal(value);
    // Scripts that already ran can't be unloaded, so a reload honours a change to "Decline"
    if (value === 'denied' && wasLoaded) window.location.reload();
  };

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and tracking consent"
      className="fixed inset-x-3 bottom-24 md:bottom-5 md:left-5 md:right-auto md:max-w-md z-[60] rounded-xl bg-gray-900 text-white shadow-2xl p-5"
    >
      <p className="text-sm font-semibold text-white">Cookies on this site</p>
      <p className="mt-1 text-sm leading-relaxed text-gray-300">
        We use cookies to understand how our website is used and to improve it. You can accept or decline
        optional cookies. Essential cookies that keep the site working are always on.{' '}
        <Link href="/privacy" className="underline text-amber-400 hover:text-amber-300">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="px-4 py-2.5 rounded-lg border border-gray-500 hover:border-gray-300 hover:bg-white/5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-gray-900 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
