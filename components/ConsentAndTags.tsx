'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
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
  const calm = useReducedMotion();

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

  // Full-width bar across the bottom of the screen: it sits over everything else there until the visitor chooses.
  // Decline and Accept stay the same size so neither choice is harder to make.
  return (
    <motion.div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and tracking consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t-4 border-amber-500 bg-gray-900 text-white shadow-[0_-16px_48px_rgb(0_0_0/0.5)]"
      initial={calm ? false : { y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 }}
    >
      <div className="mx-auto flex max-w-8xl flex-col gap-4 px-(--spacing-gutter) pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 md:flex-row md:items-center md:gap-10 md:py-8">
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-white">Cookies on this site</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">
            We use cookies to understand how our website is used and to improve it. You can accept or decline
            optional cookies. Essential cookies that keep the site working are always on.{' '}
            <Link href="/privacy" className="underline text-amber-400 hover:text-amber-300">
              Privacy policy
            </Link>
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-3 md:w-80">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="px-4 py-3 rounded-lg border border-gray-500 hover:border-gray-300 hover:bg-white/5 text-base font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="px-4 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-gray-900 text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            Accept
          </button>
        </div>
      </div>
    </motion.div>
  );
}
