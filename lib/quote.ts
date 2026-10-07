/**
 * Shared data and helpers for the guided quote form on /contact.
 */

export const INQUIRY_TYPES = [
  {
    id: 'quote',
    label: 'Quote for a part',
    short: 'Quote',
    hint: 'You have a part or a drawing and need pricing.',
    cta: 'Get my quote',
    placeholder: 'e.g. Polyamide connector housing, approx. 25 g, black. Need samples in 3 weeks.',
  },
  {
    id: 'mould',
    label: 'New mould development',
    short: 'New mould',
    hint: 'Design, tooling, trials and production.',
    cta: 'Get my quote',
    placeholder: 'e.g. 4-cavity mould for a PP cap. We need design support, trials and production.',
  },
  {
    id: 'sample',
    label: 'Samples / prototype',
    short: 'Samples',
    hint: 'A small batch to check fit before tooling.',
    cta: 'Get my quote',
    placeholder: 'e.g. Need 200 prototype pieces of an ABS enclosure to validate fit before tooling.',
  },
  {
    id: 'other',
    label: 'Something else',
    short: 'Something else',
    hint: 'Tell us and we will route it to the right person.',
    cta: 'Send my inquiry',
    placeholder: 'Tell us what you need and we will route it to the right person.',
  },
] as const;

export type InquiryId = (typeof INQUIRY_TYPES)[number]['id'];

export const PHONE_RE = /^[0-9+()\-\s]{7,}$/;

export type QuoteDraft = {
  inquiryType: InquiryId | '';
  message: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
};

export const EMPTY_DRAFT: QuoteDraft = {
  inquiryType: '',
  message: '',
  name: '',
  company: '',
  phone: '',
  email: '',
  country: '',
};

export function inquiryOf(d: QuoteDraft) {
  return INQUIRY_TYPES.find((t) => t.id === d.inquiryType);
}

/** Message stored in the sheet: what they asked for in brackets, then the visitor's own words. */
export function buildSheetMessage(d: QuoteDraft, callback = false) {
  const tags = [callback ? 'Callback request' : '', inquiryOf(d)?.label || ''].filter(Boolean);
  return `[${tags.join(' · ')}] ${d.message.trim()}`.trim();
}

const WHATSAPP_NUMBER = '919999394814';

/** WhatsApp link that carries over whatever the visitor has already answered. */
export function buildWhatsAppHref(d: QuoteDraft) {
  const type = inquiryOf(d);
  const lines = type
    ? [
        'Hello Vinayak Technoplast, I would like to send an inquiry.',
        `Need: ${type.label}`,
        d.message.trim() ? `Details: ${d.message.trim()}` : '',
        d.name.trim() ? `Name: ${d.name.trim()}${d.company.trim() ? `, ${d.company.trim()}` : ''}` : '',
      ].filter(Boolean)
    : ['Hello Vinayak Technoplast, I would like a quote for a moulded part.'];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildDrawingWhatsAppHref(name: string) {
  const text = `Hello Vinayak Technoplast, I just sent an inquiry on your website${name ? ` as ${name}` : ''}. Sharing my drawing here.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Names of the fields that hold a value (never the values), for the form_abandon event. */
export function filledFields(d: QuoteDraft): string[] {
  return (Object.keys(d) as (keyof QuoteDraft)[]).filter((k) => d[k].trim());
}

/* ------------------------------------------------------------------ *
 * Draft: kept in this browser only, so a visitor who wanders off to
 * check a drawing or another page can pick up where they stopped.
 * ------------------------------------------------------------------ */

const DRAFT_KEY = 'vt_quote_draft';
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function saveDraft(draft: QuoteDraft, step: number) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ savedAt: Date.now(), step, draft }));
  } catch {
    /* storage blocked: the form still works, it just won't be remembered */
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

export function loadDraft(): { draft: QuoteDraft; step: number } | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    const fresh = typeof saved.savedAt === 'number' && Date.now() - saved.savedAt < DRAFT_TTL_MS;
    if (!fresh || !INQUIRY_TYPES.some((t) => t.id === saved.draft?.inquiryType)) {
      clearDraft();
      return null;
    }
    const draft = { ...EMPTY_DRAFT };
    for (const k of Object.keys(EMPTY_DRAFT) as (keyof QuoteDraft)[]) {
      if (typeof saved.draft[k] === 'string') (draft as Record<string, string>)[k] = saved.draft[k];
    }
    // A draft only exists once a request type is chosen, so it always resumes on the contact step
    return { draft, step: 1 };
  } catch {
    return null;
  }
}
