'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

const AGENT_ID = 'agent_2701m4wcmkc7e478026a314fkr8v';
const AVATAR = '/chatbot-avatar.svg';

// "Hey there!" bubble: once per browser session, after this long on the site, for this long
const TEASER_AFTER_MS = 4500;
const TEASER_FOR_MS = 15000;
const TEASER_SEEN_KEY = 'vt_chat_teaser_seen';
// Overlays the bubble waits behind: the download / inquiry popups, the quote form's call-back dialog, the cookie banner
const TEASER_BLOCKERS = '.fixed.inset-0, dialog[open], [aria-label="Cookie and tracking consent"]';

/*
 * The widget's own launcher bar is hidden; our button beside the WhatsApp bubble opens the chat window instead.
 * The window sits 12px above the two buttons, right edge aligned with the bubble
 * (bubble: 48px at bottom-4 right-4 on phones, 64px at bottom-5 right-5 on md+).
 * Fullscreen mode (phones, after "Expand") keeps the widget's own layout.
 */
const WIDGET_CSS = `
.rounded-compact-sheet { display: none !important; }
:host(:not([data-open])) .overlay > p { display: none; }
.overlay:not(:has([data-variant=fullscreen])) {
  bottom: 76px;
  right: calc(16px + var(--removed-body-scroll-bar-size, 0px));
}
.overlay:not(:has([data-variant=fullscreen])) .sheet { bottom: 0; }
@media (min-width: 768px) {
  .overlay:not(:has([data-variant=fullscreen])) {
    bottom: 96px;
    right: calc(20px + var(--removed-body-scroll-bar-size, 0px));
  }
}
`;

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
        'avatar-image-url'?: string;
        placement?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
      };
    }
  }
}

// The home page opens its download popup 5s in, once per session (app/page.tsx); the bubble goes after it, not before
function downloadPopupPending() {
  try {
    return window.location.pathname === '/' && window.sessionStorage.getItem('hasSeenDownloadPopup') !== 'true';
  } catch {
    return false;
  }
}

function teaserSeen() {
  try {
    return window.sessionStorage.getItem(TEASER_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markTeaserSeen() {
  try {
    window.sessionStorage.setItem(TEASER_SEEN_KEY, '1');
  } catch {
    /* storage blocked: the bubble may show again on the next page load */
  }
}

const expandWidget = (action: 'expand' | 'toggle') =>
  document.dispatchEvent(new CustomEvent('elevenlabs-agent:expand', { detail: { action } }));

/** ElevenLabs voice/text agent, launched from a logo button to the left of the WhatsApp bubble. */
export default function ElevenLabsChat() {
  const ref = useRef<HTMLElement>(null);
  const calm = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [teaserDone, setTeaserDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | undefined;
    // The widget renders into an open shadow root once the script defines the element
    customElements.whenDefined('elevenlabs-convai').then(() => {
      const host = ref.current;
      const root = host?.shadowRoot;
      if (cancelled || !host || !root) return;
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(WIDGET_CSS);
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];

      // The chat window (.sheet) only exists while it is open, however it was opened or closed
      const sync = () => {
        const isOpen = !!root.querySelector('.sheet');
        host.toggleAttribute('data-open', isOpen);
        setOpen(isOpen);
        if (isOpen) setTeaserDone(true);
      };
      observer = new MutationObserver(sync);
      observer.observe(root, { childList: true, subtree: true });
      sync();
      setReady(true);
    });
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  // Shows the bubble once the visitor has been here a few seconds and nothing else is covering the page;
  // it steps aside while a popup or the cookie banner is up and needs 1s of clear screen to (re)appear
  useEffect(() => {
    if (!ready || teaserDone) return;
    if (teaserSeen()) {
      setTeaserDone(true);
      return;
    }
    let clearFor = 0;
    let shownFor = 0;
    const tick = 500;
    const id = window.setInterval(() => {
      if (performance.now() < TEASER_AFTER_MS) return;
      if (document.querySelector(TEASER_BLOCKERS) || downloadPopupPending()) {
        clearFor = 0;
        setTeaser(false);
        return;
      }
      clearFor += tick;
      if (clearFor < 1000) return;
      if (shownFor === 0) markTeaserSeen();
      setTeaser(true);
      shownFor += tick;
      if (shownFor >= TEASER_FOR_MS) setTeaserDone(true);
    }, tick);
    return () => window.clearInterval(id);
  }, [ready, teaserDone]);

  const showTeaser = teaser && !teaserDone && !open;

  return (
    <>
      <elevenlabs-convai ref={ref} agent-id={AGENT_ID} avatar-image-url={AVATAR} placement="bottom-right" />
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />

      {/* Sits above the chat button, its tail pointing at the button's centre (24px / 32px in from its right edge) */}
      <AnimatePresence>
        {showTeaser && (
          <motion.div
            role="status"
            className="fixed bottom-[4.75rem] right-[4.5rem] z-50 w-64 md:bottom-24 md:right-24 [body[data-quote-form]_&]:max-md:hidden"
            initial={calm ? false : { opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={calm ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <button
              type="button"
              onClick={() => {
                setTeaserDone(true);
                expandWidget('expand');
              }}
              className="block w-full rounded-2xl bg-gray-900 p-4 pr-10 text-left shadow-xl shadow-black/40 ring-1 ring-amber-500/60 transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span className="block text-base font-semibold text-amber-400">Hey there! 👋</span>
              <span className="mt-1 block text-sm leading-snug text-gray-200">
                Got a moulding question? Chat or talk to us.
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTeaserDone(true)}
              aria-label="Dismiss"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 right-[18px] h-3 w-3 rotate-45 bg-gray-900 shadow-[1px_1px_0_0_rgb(245_158_11/0.6)] md:right-[26px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden on phones while the quote form's bottom bar is up: it only leaves room for WhatsApp */}
      {ready && (
        <button
          type="button"
          onClick={() => expandWidget('toggle')}
          aria-label={open ? 'Close chat assistant' : 'Chat with our AI assistant'}
          aria-expanded={open}
          // Dark with an amber ring and logo: reads on white sections, the dark hero/footer and the amber footer band.
          // Phones: 48px, 8px left of the WhatsApp bubble; md+: 64px, 12px left of it
          className="fixed bottom-4 right-[4.5rem] z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-amber-500 shadow-lg shadow-black/40 ring-2 ring-amber-500 transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 md:bottom-5 md:right-24 md:h-16 md:w-16 [body[data-quote-form]_&]:max-md:hidden"
        >
          {open ? (
            <X className="h-6 w-6 md:h-8 md:w-8" strokeWidth={2.5} aria-hidden="true" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={AVATAR} alt="" className="h-full w-full" />
          )}
        </button>
      )}
    </>
  );
}
