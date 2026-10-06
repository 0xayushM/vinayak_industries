'use client';

import { resetConsent } from '@/lib/tracking';

/** Reopens the cookie banner so the visitor can accept or decline again. */
export default function CookieSettingsButton({ className = '' }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  );
}
