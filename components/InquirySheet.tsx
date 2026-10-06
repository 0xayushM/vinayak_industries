'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { inquiryOf, specParts, type QuoteDraft } from '@/lib/quote';

/**
 * Live summary of the quote form, styled like a shop-floor job card.
 * Each row fills in as the visitor answers, so they can see the inquiry taking shape.
 */
export default function InquirySheet({ draft, sent }: { draft: QuoteDraft; sent: boolean }) {
  const rows = [
    { label: 'Requirement', value: inquiryOf(draft)?.label || '' },
    ...specParts(draft),
    { label: 'Notes', value: draft.message.trim() },
    { label: 'Contact', value: [draft.name.trim(), draft.company.trim()].filter(Boolean).join(' · ') },
    { label: 'Phone', value: draft.phone.trim() },
  ];
  const filled = rows.filter((r) => r.value).length;
  const status = sent ? 'Sent' : filled ? 'Draft' : 'Blank';

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-bold tracking-wide text-white font-[family-name:var(--font-carbon)]">INQUIRY SHEET</p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            sent ? 'bg-emerald-400/15 text-emerald-300' : filled ? 'bg-amber-500/15 text-amber-400' : 'bg-white/10 text-gray-300'
          }`}
        >
          {status}
        </span>
      </div>

      <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {rows.map((r) => (
          <div key={r.label} className="flex gap-4 py-2.5 text-sm">
            <dt className="w-24 shrink-0 text-gray-400">{r.label}</dt>
            <dd className="min-w-0 flex-1 text-white">
              <AnimatePresence mode="wait" initial={false}>
                {r.value ? (
                  <motion.span
                    key={r.label === 'Notes' ? 'notes' : r.value}
                    className="block line-clamp-2 break-words"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {r.value}
                  </motion.span>
                ) : (
                  <motion.span key="empty" className="block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                    <span aria-hidden="true" className="mt-2.5 block h-px w-8 bg-white/25" />
                    <span className="sr-only">Not filled yet</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
        <span aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.span
            className={`block h-full origin-left rounded-full ${sent ? 'bg-emerald-400' : 'bg-amber-500'}`}
            initial={false}
            animate={{ scaleX: sent ? 1 : filled / rows.length }}
            transition={{ duration: 0.3 }}
          />
        </span>
        <span>{sent ? 'With our sales team' : 'Reply within one working day'}</span>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.span
            aria-hidden="true"
            className="absolute right-8 top-[6.75rem] rounded-md border-2 border-emerald-400 px-3 py-1 text-xl font-bold tracking-[0.2em] text-emerald-400 font-[family-name:var(--font-carbon)]"
            initial={{ opacity: 0, scale: 1.8, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            SENT
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
