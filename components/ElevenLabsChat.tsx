'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const AGENT_ID = 'agent_2701m4wcmkc7e478026a314fkr8v';
const AVATAR = '/chatbot-avatar.svg';

/*
 * The widget's own launcher bar is hidden; our robot button beside the WhatsApp bubble opens the chat window instead.
 * The window sits 12px above the two buttons (bubble: fixed bottom-5 right-5, 56px / 64px on md+), right edge
 * aligned with the bubble. Fullscreen mode (phones, after "Expand") keeps the widget's own layout.
 */
const WIDGET_CSS = `
.rounded-compact-sheet { display: none !important; }
:host(:not([data-open])) .overlay > p { display: none; }
.overlay:not(:has([data-variant=fullscreen])) {
  bottom: 88px;
  right: calc(20px + var(--removed-body-scroll-bar-size, 0px));
}
.overlay:not(:has([data-variant=fullscreen])) .sheet { bottom: 0; }
@media (min-width: 768px) {
  .overlay:not(:has([data-variant=fullscreen])) { bottom: 96px; }
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

/** ElevenLabs voice/text agent, launched from a robot button to the left of the WhatsApp bubble. */
export default function ElevenLabsChat() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

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

  const toggle = () =>
    document.dispatchEvent(new CustomEvent('elevenlabs-agent:expand', { detail: { action: 'toggle' } }));

  return (
    <>
      <elevenlabs-convai ref={ref} agent-id={AGENT_ID} avatar-image-url={AVATAR} placement="bottom-right" />
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
      {/* Hidden on phones while the quote form's bottom bar is up: it only leaves room for WhatsApp */}
      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? 'Close chat assistant' : 'Chat with our AI assistant'}
          aria-expanded={open}
          // Dark with an amber ring and robot: reads on white sections, the dark hero/footer and the amber footer band
          className="fixed bottom-5 right-[5.5rem] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-amber-500 shadow-lg shadow-black/40 ring-2 ring-amber-500 transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 md:right-24 md:h-16 md:w-16 [body[data-quote-form]_&]:max-md:hidden"
        >
          {open ? (
            <X className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <svg viewBox="0 0 64 64" className="h-11 w-11 md:h-12 md:w-12" aria-hidden="true">
              <line x1="32" y1="12" x2="32" y2="20" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="32" cy="10" r="4" fill="#fff" />
              <rect x="9" y="31" width="5" height="12" rx="2.5" fill="#f59e0b" />
              <rect x="50" y="31" width="5" height="12" rx="2.5" fill="#f59e0b" />
              <rect x="13" y="20" width="38" height="32" rx="11" fill="#f59e0b" />
              <circle cx="24.5" cy="33" r="4.5" fill="#111827" />
              <circle cx="39.5" cy="33" r="4.5" fill="#111827" />
              <path d="M25 42q7 5 14 0" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
