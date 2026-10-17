'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

/**
 * Phones: a fixed "Request a quote" button filling the space left of the chat + WhatsApp bubbles on every page
 * (bubbles: 48px each, 8px gaps, 16px from the edge = 8rem).
 * /contact is left out because the quote form there has its own bottom bar.
 */
export default function MobileQuoteButton() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;

  return (
    <>
      {/* Keeps the last lines of the footer clear of the fixed button */}
      <div aria-hidden="true" className="h-20 bg-gray-900 md:hidden" />
      {/* z-40: below the nav menu and dialogs (z-50), which should cover it when open */}
      <Link
        href="/contact"
        className="fixed bottom-4 left-4 right-32 z-40 flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-amber-500 px-4 text-sm font-bold text-gray-900 shadow-lg shadow-black/30 transition-colors active:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 md:hidden"
      >
        Request a quote
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </>
  );
}
