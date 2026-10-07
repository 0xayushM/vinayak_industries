'use client';

/**
 * A field real visitors never see or reach: it is off-screen, skipped by the keyboard and
 * hidden from screen readers. Bots that fill every input give themselves away. See lib/spamGuard.ts.
 */
export default function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
