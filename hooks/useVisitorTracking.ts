'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/tracking';

/**
 * Logs a page_view on the first load AND on every client-side route change.
 * (Previously it only fired once per full page load, so menu navigation
 * to /contact, /moulding etc. was never recorded.)
 */
export const useVisitorTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent('page_view');
  }, [pathname]);
};
