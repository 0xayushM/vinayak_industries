'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

/**
 * Phones: a fixed "Request a quote" button filling the space left of the chat + WhatsApp bubbles on every page
 * (bubbles: 56px each, 12px gaps, 20px from the edge = 9.75rem).
 * /contact is left out because the quote form there has its own bottom bar.
 */
export default function MobileQuoteButton() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;

  return (
    <>
      {/* Keeps the last lines of the footer clear of the fixed button */}
      <div aria-hidden="true" className="h-24 bg-gray-900 md:hidden" />
      {/* z-40: below the nav menu and dialogs (z-50), which should cover it when open */}
      <Link
        href="/contact"
        className="fixed bottom-5 left-4 right-[9.75rem] z-40 flex h-14 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-amber-500 px-3 text-base font-bold text-gray-900 shadow-lg shadow-black/30 transition-colors active:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 md:hidden"
      >
        Request a quote
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </>
  );
}
