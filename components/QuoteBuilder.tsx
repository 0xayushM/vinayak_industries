'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, FileText, Mail, MessageSquare, Package, Phone, PhoneCall, Plus, Wrench, X, type LucideIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Honeypot from '@/components/Honeypot';
import InquirySheet from '@/components/InquirySheet';
import { primeFormGuard, submitLead, trackEvent } from '@/lib/tracking';
import {
  EMPTY_DRAFT,
  INQUIRY_TYPES,
  PHONE_RE,
  buildDrawingWhatsAppHref,
  buildSheetMessage,
  buildWhatsAppHref,
  clearDraft,
  filledFields,
  inquiryOf,
  loadDraft,
  saveDraft,
  type InquiryId,
  type QuoteDraft,
} from '@/lib/quote';

const TYPE_ICONS: Record<InquiryId, LucideIcon> = { quote: FileText, mould: Wrench, sample: Package, other: MessageSquare };
const STEP_LABELS = ['Need', 'Contact'];
const RESCUE_SEEN_KEY = 'vt_quote_rescue';
const stepHint = 'mt-1 text-sm text-gray-600 md:mt-2 md:text-base';

// Steps slide in the direction of travel: forward from the right, back from the left
const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: 28 * dir }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -28 * dir }),
};

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400';
const primaryButton =
  'inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 px-6 py-3 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2';
const backButton =
  'inline-flex shrink-0 items-center justify-center gap-2 px-4 py-3 rounded-full font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500';
// Phones get these actions from the fixed bottom bar instead, so the row is hidden there
const actionRow = 'mt-7 flex items-center gap-3 max-md:hidden';
const barSideButton =
  'flex h-14 w-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-medium text-gray-700 transition-colors active:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500';
const barPrimaryButton =
  'flex h-14 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-amber-500 px-5 text-base font-bold text-gray-900 shadow-lg shadow-amber-500/40 transition-colors active:bg-amber-600 disabled:bg-gray-300 disabled:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2';
const FORM_ID = 'quote-form';

export default function QuoteBuilder() {
  const [draft, setDraft] = useState<QuoteDraft>(EMPTY_DRAFT);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [restored, setRestored] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState<QuoteDraft | null>(null);
  const [rescueOpen, setRescueOpen] = useState(false);
  const [formInView, setFormInView] = useState(true);
  const [noteOpen, setNoteOpen] = useState(false); // phones: the optional note starts collapsed
  const [honeypot, setHoneypot] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hydrated = useRef(false);
  const formStarted = useRef(false);
  const formSubmitted = useRef(false);
  const rescueSeen = useRef(false);
  const focusHeading = useRef(false);
  // Latest values for listeners that are attached once (page leave, exit intent)
  const live = useRef({ draft, step, sent: false, sending });

  const type = inquiryOf(draft);
  const inProgress = !!type && !sent;
  const whatsAppHref = buildWhatsAppHref(draft);

  // Restore a saved draft, or prefill the country for visitors in India (one less field to type)
  useEffect(() => {
    const saved = loadDraft();
    if (saved) {
      setDraft(saved.draft);
      setStep(saved.step);
      setRestored(true);
      setNoteOpen(!!saved.draft.message);
    } else {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') {
        setDraft((d) => (d.country ? d : { ...d, country: 'India' }));
      }
    }
    try {
      rescueSeen.current = window.sessionStorage.getItem(RESCUE_SEEN_KEY) === '1';
    } catch {
      /* storage blocked */
    }
    hydrated.current = true;
    primeFormGuard();
  }, []);

  useEffect(() => {
    live.current = { draft, step, sent: !!sent, sending };
    if (hydrated.current && inProgress) saveDraft(draft, step);
  });

  // Record visitors who start the form but leave without sending (step and field names only, never values)
  useEffect(() => {
    const onLeave = () => {
      if (!formStarted.current || formSubmitted.current) return;
      const { draft: d, step: s } = live.current;
      trackEvent('form_abandon', { form_name: 'contact_form', fields_filled: [`step${s + 1}`, ...filledFields(d)].join(',') });
    };
    window.addEventListener('pagehide', onLeave);
    return () => {
      window.removeEventListener('pagehide', onLeave);
      onLeave(); // also fires when navigating to another page inside the site
    };
  }, []);

  // Exit intent (desktop): the pointer leaves through the top of the window with an unsent inquiry.
  // Offered once per session, and it only ever shortens the ask; it never blocks leaving.
  useEffect(() => {
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0 || rescueSeen.current) return;
      const s = live.current;
      if (!s.draft.inquiryType || s.sent || s.sending) return;
      rescueSeen.current = true;
      try {
        window.sessionStorage.setItem(RESCUE_SEEN_KEY, '1');
      } catch {
        /* storage blocked */
      }
      setRescueOpen(true);
    };
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (rescueOpen && !dialog.open) dialog.showModal();
    if (!rescueOpen && dialog.open) dialog.close();
  }, [rescueOpen]);

  // Drives the "finish your inquiry" bar once the form has scrolled out of view
  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting));
    io.observe(card);
    return () => io.disconnect();
  }, []);

  // Phones: while the bottom bar is shown, the site's floating WhatsApp button docks into the bar's right end
  // (see WhatsAppButton) so it stays reachable without covering the form
  useEffect(() => {
    document.body.toggleAttribute('data-quote-form', !sent);
    return () => document.body.removeAttribute('data-quote-form');
  }, [sent]);

  const markStarted = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent('form_start', { form_name: 'contact_form' });
  };

  const setField = (key: keyof QuoteDraft, value: string) => setDraft((d) => ({ ...d, [key]: value }));

  const goTo = (next: number) => {
    setDirection(next >= step ? 1 : -1);
    focusHeading.current = true;
    setFailed(false);
    setStep(next);
    // Phones: pin the card just under the nav so the whole step, button included, fits on one screen
    requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const top = card.getBoundingClientRect().top;
      const phone = window.matchMedia('(max-width: 767px)').matches;
      if (top < 0 || (phone && next > 0 && top > 80)) {
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        card.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
      }
    });
  };

  const chooseType = (id: InquiryId) => {
    markStarted();
    setField('inquiryType', id);
    goTo(1);
  };

  const startOver = () => {
    clearDraft();
    setRestored(false);
    setNoteOpen(false);
    setDraft({ ...EMPTY_DRAFT, country: draft.country });
    goTo(0);
  };

  const backToForm = () => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    cardRef.current?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  };

  const send = async (callback: boolean) => {
    if (sending || !type) return;
    setSending(true);
    setFailed(false);
    try {
      const contact = {
        name: draft.name.trim(),
        company: draft.company.trim(),
        phone: draft.phone.trim(),
        email: draft.email.trim(),
        country: draft.country.trim() || 'Not provided',
      };
      const ok = await submitLead({
        formName: 'contact_form',
        sheetEndpoint: '/api/contact',
        sheetBody: { ...contact, message: buildSheetMessage(draft, callback), source: 'contact_form' },
        agentData: {
          ...contact,
          message: draft.message.trim(),
          inquiryType: type.label,
          callbackRequested: callback ? 'yes' : 'no',
        },
        honeypot,
      });
      if (!ok) throw new Error('Lead could not be saved');

      formSubmitted.current = true;
      clearDraft();
      focusHeading.current = true;
      setSent(draft);
      setRescueOpen(false);
      setRestored(false);
      setNoteOpen(false);
      setDraft({ ...EMPTY_DRAFT, country: draft.country });
      setStep(0);
      requestAnimationFrame(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    } catch (error) {
      console.error('Error submitting form:', error);
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const sendAnother = () => {
    formStarted.current = false;
    formSubmitted.current = false;
    focusHeading.current = true;
    setDirection(1);
    setSent(null);
  };

  const showNote = type?.id === 'other' || noteOpen;
  // What the phone bottom bar's main button does right now
  const awayFromForm = !formInView;
  const barBack = !!type && !awayFromForm && step > 0;
  const barSubmits = !!type && !awayFromForm && step === 1;
  const bar = !type
    ? { label: 'Request a quote', action: () => chooseType('quote') }
    : awayFromForm
      ? { label: 'Finish my inquiry', action: backToForm }
      : { label: 'Continue', action: () => goTo(1) };
  const sentFirstName = sent?.name.trim().split(/\s+/)[0] || '';

  const errorAlert = (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      We could not send that just now. Please try again, or{' '}
      <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="font-medium underline">
        send the same details on WhatsApp
      </a>
      .
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      <section id="quote" className="relative overflow-clip bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg-image.png" alt="" fill sizes="100vw" className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/90 to-gray-900/70" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-8xl gap-5 px-(--spacing-gutter) pb-(--spacing-section-sm) pt-20 md:gap-8 md:pt-28 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 xl:pt-32">
          <header className="lg:col-span-5">
            <p className="hidden text-sm font-medium uppercase tracking-[0.2em] text-amber-500 md:block">Contact us</p>
            <h1 className="text-title font-bold text-white md:mt-3 md:text-display font-[family-name:var(--font-carbon)]">
              REQUEST A <span className="text-amber-500">QUOTE</span>
            </h1>
            <p className="mt-2 max-w-md text-copy text-gray-200 md:mt-4 md:text-lead">
              <span className="max-md:hidden">Two quick steps, about a minute. </span>Our sales team replies within one working day.
            </p>
          </header>

          {/* Form card */}
          <div
            ref={cardRef}
            className="scroll-mt-[4.5rem] rounded-[28px] bg-white p-5 md:scroll-mt-24 md:rounded-[40px] md:p-10 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:min-h-[640px] lg:self-start"
          >
            <form
              id={FORM_ID}
              className="relative"
              onFocus={markStarted}
              onSubmit={(e) => {
                e.preventDefault();
                send(false);
              }}
            >
              <Honeypot value={honeypot} onChange={setHoneypot} />
              {!sent && (
                <>
                  <ol className="flex items-center gap-2 text-sm">
                    {STEP_LABELS.map((label, i) => (
                      <li key={label} className={`flex items-center gap-2 ${i < STEP_LABELS.length - 1 ? 'flex-1' : ''}`}>
                        <button
                          type="button"
                          disabled={i > 0 && !type}
                          onClick={() => goTo(i)}
                          aria-current={i === step ? 'step' : undefined}
                          className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                              i < step ? 'bg-gray-900 text-white' : i === step ? 'bg-amber-500 text-gray-900' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {i < step ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
                          </span>
                          <span className={i === step ? 'font-semibold text-gray-900' : 'text-gray-500'}>{label}</span>
                        </button>
                        {i < STEP_LABELS.length - 1 && (
                          <span aria-hidden="true" className="h-0.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                            <motion.span
                              className="block h-full origin-left bg-amber-500"
                              initial={false}
                              animate={{ scaleX: i < step ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>

                  {inProgress && (
                    <p className="mt-3 text-xs text-gray-500 md:mt-4">
                      <span className="md:hidden">{restored ? 'Welcome back. Answers restored.' : 'Saved on this device.'}</span>
                      <span className="hidden md:inline">
                        {restored ? 'Welcome back. We kept your answers on this device.' : 'Your answers are saved on this device until you send.'}
                      </span>{' '}
                      <button type="button" onClick={startOver} className="font-medium text-gray-700 underline hover:text-gray-900">
                        Start over
                      </button>
                    </p>
                  )}
                </>
              )}

              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={sent ? 'sent' : step}
                  className={sent ? '' : 'mt-5 md:mt-7'}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {sent ? (
                    <div role="status" className="py-4 text-center lg:py-16">
                      <motion.span
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                        initial={{ scale: 0.4 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                      >
                        <Check className="h-8 w-8" aria-hidden="true" />
                      </motion.span>
                      <StepHeading focusOnMount={focusHeading} className="mt-6">
                        Inquiry sent
                      </StepHeading>
                      <p className="mx-auto mt-3 max-w-md text-gray-600">
                        Thank you{sentFirstName ? `, ${sentFirstName}` : ''}. Your inquiry has reached our sales team. We will get back to you within one
                        working day.
                      </p>

                      <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
                        <a
                          href={buildDrawingWhatsAppHref(sentFirstName)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                        >
                          <FaWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
                          Share a drawing or photo on WhatsApp
                        </a>
                        <Link
                          href="/product-line"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-800 transition-colors hover:border-gray-900"
                        >
                          Browse our product line
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <button type="button" onClick={sendAnother} className="py-2 text-sm font-medium text-gray-600 underline hover:text-gray-900">
                          Send another inquiry
                        </button>
                      </div>
                    </div>
                  ) : step === 0 || !type ? (
                    <>
                      <StepHeading focusOnMount={focusHeading}>What do you need?</StepHeading>
                      <p className={stepHint}>Tap to start. Takes about a minute.</p>

                      {/* One filled button for the main job of the page; the other requests stay available but quieter */}
                      <motion.button
                        type="button"
                        aria-pressed={draft.inquiryType === 'quote'}
                        onClick={() => chooseType('quote')}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group mt-4 flex w-full items-center gap-3.5 rounded-2xl bg-amber-500 p-4 text-left text-gray-900 shadow-lg shadow-amber-500/30 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 md:mt-6 md:gap-4 md:p-5 ${
                          draft.inquiryType === 'quote' ? 'ring-2 ring-gray-900 ring-offset-2' : ''
                        }`}
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-amber-500">
                          <FileText className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-lg font-bold leading-tight md:text-xl">Request a quote</span>
                          <span className="mt-0.5 block text-sm text-gray-900/80">Pricing for your part or drawing</span>
                        </span>
                        <motion.span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </motion.span>
                      </motion.button>

                      <p className="mt-3 text-sm font-medium text-gray-500 md:mt-6">Or something else</p>
                      <div className="mt-2 grid grid-cols-3 gap-2 md:gap-3">
                        {INQUIRY_TYPES.filter((t) => t.id !== 'quote').map((t) => {
                          const Icon = TYPE_ICONS[t.id];
                          const selected = draft.inquiryType === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => chooseType(t.id)}
                              className={`group flex flex-col items-start gap-1.5 rounded-2xl border p-2.5 text-left md:gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 md:p-4 ${
                                selected ? 'border-gray-900 bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-900'
                              }`}
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 md:h-9 md:w-9 text-gray-700 transition-colors group-hover:bg-gray-900 group-hover:text-white">
                                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                              </span>
                              <span className="block text-[13px] font-semibold leading-snug text-gray-900 md:text-sm">
                                <span className="md:hidden">{t.short}</span>
                                <span className="hidden md:inline">{t.label}</span>
                              </span>
                              <span className="hidden text-xs leading-snug text-gray-600 md:block">{t.hint}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <StepHeading focusOnMount={focusHeading}>Who do we reply to?</StepHeading>
                      <p className={stepHint}>Last step. We reply within one working day.</p>

                      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 md:mt-6 md:gap-4">
                        <Field
                          id="name"
                          label="Your name *"
                          wrapperClassName="col-span-2 md:col-span-1"
                          autoComplete="name"
                          required
                          value={draft.name}
                          valid={draft.name.trim().length > 1}
                          onChange={(v) => setField('name', v)}
                        />
                        <Field
                          id="phone"
                          label="Phone / WhatsApp *"
                          wrapperClassName="col-span-2 md:col-span-1"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+91"
                          pattern="[0-9+\(\)\-\s]{7,}"
                          title="Enter a valid phone number"
                          required
                          value={draft.phone}
                          valid={PHONE_RE.test(draft.phone.trim())}
                          onChange={(v) => setField('phone', v)}
                        />
                        <Field id="company" label="Company" autoComplete="organization" value={draft.company} onChange={(v) => setField('company', v)} />
                        <Field
                          id="country"
                          label="Country *"
                          autoComplete="country-name"
                          required
                          value={draft.country}
                          onChange={(v) => setField('country', v)}
                        />
                        <Field
                          id="email"
                          label="Work email"
                          wrapperClassName="col-span-2"
                          type="email"
                          autoComplete="email"
                          value={draft.email}
                          onChange={(v) => setField('email', v)}
                        />
                      </div>

                      {!showNote && (
                        <button
                          type="button"
                          onClick={() => {
                            setNoteOpen(true);
                            requestAnimationFrame(() => document.getElementById('message')?.focus());
                          }}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 underline md:hidden"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                          Add a message (optional)
                        </button>
                      )}
                      <div className={`mt-4 ${showNote ? '' : 'max-md:hidden'}`}>
                        <label htmlFor="message" className="mb-1 block text-[13px] font-medium text-gray-700 md:mb-2 md:text-sm">
                          {type.id === 'other' ? 'Your message' : 'Tell us about it (optional)'}
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          value={draft.message}
                          onChange={(e) => setField('message', e.target.value)}
                          placeholder={type.placeholder}
                          className={`${inputClass} resize-none`}
                        />
                        {type.id !== 'other' && (
                          <p className="mt-1.5 text-xs text-gray-500 max-md:hidden">
                            Helpful to include: material, size or weight, quantity and timeline. Have a drawing? Mention it and we will ask for it.
                          </p>
                        )}
                      </div>

                      {failed && !rescueOpen && <div className="mt-5">{errorAlert}</div>}

                      <div className={actionRow}>
                        <button type="button" onClick={() => goTo(0)} className={backButton}>
                          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                          <span className="max-md:sr-only">Back</span>
                        </button>
                        <button type="submit" disabled={sending} className={`${primaryButton} flex-1 text-lead`}>
                          {sending ? 'Sending...' : type.cta}
                        </button>
                      </div>

                      <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-gray-500 md:mt-5">
                        <li>✓ ISO 9001:2015 certified</li>
                        <li>✓ In-house tool room</li>
                        <li>✓ Your details stay confidential</li>
                      </ul>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {!sent && (
                <div className="mt-4 border-t border-gray-200 pt-4 md:mt-7 md:pt-5">
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
                    <a
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-gray-800 transition-colors hover:text-[#128C7E]"
                    >
                      <FaWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
                      {type ? 'Send this on WhatsApp instead' : 'Prefer WhatsApp? Chat with our sales team'}
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>

          <aside className="space-y-6 lg:col-span-5 lg:row-start-2">
            <div className="hidden lg:block">
              <InquirySheet draft={sent ?? draft} sent={!!sent} />
            </div>
            <div>
              <p className="text-sm text-gray-300">Rather talk to a person?</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white">
                <li>
                  <a href="tel:+919311378904" className="inline-flex items-center gap-2 transition-colors hover:text-amber-500">
                    <Phone className="h-4 w-4 text-amber-500" aria-hidden="true" />
                    +91 9311378904
                  </a>
                </li>
                <li>
                  <a href="tel:+919999394814" className="inline-flex items-center gap-2 transition-colors hover:text-amber-500">
                    <Phone className="h-4 w-4 text-amber-500" aria-hidden="true" />
                    +91 9999394814
                  </a>
                </li>
                <li>
                  <a href="mailto:sales@vinayaktechnoplast.com" className="inline-flex items-center gap-2 transition-colors hover:text-amber-500">
                    <Mail className="h-4 w-4 text-amber-500" aria-hidden="true" />
                    sales@vinayaktechnoplast.com
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Desktop: follows the visitor down the page while an inquiry is unfinished */}
      <AnimatePresence>
        {inProgress && !formInView && !rescueOpen && (
          <motion.div
            className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 max-md:hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-4 rounded-full bg-gray-900 py-2 pl-5 pr-2 text-sm text-white shadow-2xl ring-1 ring-white/10">
              <span className="whitespace-nowrap">
                Your inquiry is saved <span className="text-gray-400">· step {step + 1} of 2</span>
              </span>
              <button
                type="button"
                onClick={backToForm}
                className="shrink-0 rounded-full bg-amber-500 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Finish it
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phones: a fixed bottom bar whose largest button is always the next thing to do, wherever the visitor has scrolled */}
      {!sent && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_-14px_rgb(0_0_0/0.35)] md:hidden">
          {/* Right padding is the slot the WhatsApp button docks into */}
          <div className="flex items-center gap-1.5 pr-16">
            {barBack ? (
              <button type="button" onClick={() => goTo(step - 1)} className={barSideButton}>
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                Back
              </button>
            ) : (
              <a href="tel:+919311378904" className={barSideButton}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call
              </a>
            )}

            {barSubmits ? (
              <button type="submit" form={FORM_ID} disabled={sending} className={barPrimaryButton}>
                {sending ? 'Sending...' : type?.cta}
              </button>
            ) : (
              <button type="button" onClick={bar.action} className={barPrimaryButton}>
                <span className="truncate">{bar.label}</span>
                <motion.span
                  className="shrink-0"
                  animate={type ? { x: 0 } : { x: [0, 5, 0] }}
                  transition={type ? { duration: 0.2 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              </button>
            )}

          </div>
        </div>
      )}

      {/* Call-back shortcut, shown on exit intent */}
      <dialog
        ref={dialogRef}
        aria-labelledby="rescue-title"
        onClose={() => setRescueOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setRescueOpen(false);
        }}
        className="m-auto w-[min(92vw,28rem)] rounded-3xl bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-900/70"
      >
        <form
          className="relative p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            send(true);
          }}
        >
          <button
            type="button"
            onClick={() => setRescueOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <h2 id="rescue-title" className="pr-10 text-title font-bold text-gray-900 font-[family-name:var(--font-carbon)]">
            SHORT ON TIME?
          </h2>
          <p className="mt-2 text-gray-600">
            Leave your number and our sales team will call you back within one working day. No need to finish the form
            {type ? `; we will keep what you have told us about your ${type.id === 'other' ? 'inquiry' : type.label.toLowerCase()}` : ''}.
          </p>

          <div className="mt-5 space-y-4">
            <Field
              id="rescue-name"
              label="Your name *"
              autoComplete="name"
              required
              value={draft.name}
              onChange={(v) => setField('name', v)}
            />
            <Field
              id="rescue-phone"
              label="Phone / WhatsApp *"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91"
              pattern="[0-9+\(\)\-\s]{7,}"
              title="Enter a valid phone number"
              required
              value={draft.phone}
              valid={PHONE_RE.test(draft.phone.trim())}
              onChange={(v) => setField('phone', v)}
            />
          </div>

          {failed && rescueOpen && <div className="mt-4">{errorAlert}</div>}

          <button type="submit" disabled={sending} className={`${primaryButton} mt-6 w-full`}>
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            {sending ? 'Sending...' : 'Call me back'}
          </button>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-800 transition-colors hover:border-[#25D366] hover:text-[#128C7E]"
          >
            <FaWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
            Send it on WhatsApp instead
          </a>
          <button
            type="button"
            onClick={() => setRescueOpen(false)}
            className="mt-3 w-full py-2 text-sm font-medium text-gray-600 underline hover:text-gray-900"
          >
            Keep filling the form
          </button>
        </form>
      </dialog>
    </MotionConfig>
  );
}

/** Step title. Takes focus when a step changes so keyboard and screen-reader users land on the new question. */
function StepHeading({
  children,
  focusOnMount,
  className = '',
}: {
  children: React.ReactNode;
  focusOnMount: React.RefObject<boolean>;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!focusOnMount.current) return;
    focusOnMount.current = false;
    ref.current?.focus({ preventScroll: true });
  }, [focusOnMount]);

  return (
    <h2 ref={ref} tabIndex={-1} className={`text-xl font-bold uppercase text-gray-900 outline-none md:text-title font-[family-name:var(--font-carbon)] ${className}`}>
      {children}
    </h2>
  );
}

function Field({
  id,
  label,
  value,
  valid = false,
  wrapperClassName = '',
  onChange,
  ...input
}: {
  id: string;
  label: string;
  value: string;
  valid?: boolean;
  wrapperClassName?: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange'>) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="mb-1 block text-[13px] font-medium text-gray-700 md:mb-2 md:text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          {...input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} max-md:py-2.5 ${valid ? 'pr-11' : ''}`}
        />
        {valid && <Check className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-600" aria-hidden="true" />}
      </div>
    </div>
  );
}
