'use client';

import { useEffect } from 'react';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { trackEvent } from '@/lib/tracking';

/**
 * Page views on every route change, plus contact-intent clicks anywhere on the site:
 * WhatsApp (wa.me / api.whatsapp.com), phone (tel:) and email (mailto:) links.
 */
export default function VisitorTracker() {
  useVisitorTracking();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) trackEvent('whatsapp_click');
      else if (href.startsWith('tel:')) trackEvent('phone_click');
      else if (href.startsWith('mailto:')) trackEvent('email_click');
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
