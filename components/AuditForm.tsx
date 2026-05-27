'use client';

import { useState } from 'react';

const VOLUMES = ['Under 20', '20-50', '50-150', '150+'];
const SOURCES = ['Meta ads', 'IG/FB DMs', 'Website forms', 'Email', 'CRM/pipeline', 'Other'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const labelCls = 'block text-sm font-medium text-ink-primary mb-1.5';
const fieldCls =
  'w-full rounded-xl border border-border-soft bg-bg-canvas px-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-tertiary outline-none focus:border-ink-primary/30 transition-colors';

export default function AuditForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [volume, setVolume] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [breaking, setBreaking] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const toggleSource = (s: string) =>
    setSources((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    if (!name.trim() || !email.trim()) return;
    setStatus('submitting');

    const lines = ['Lead Flow Audit request via website form.'];
    if (volume) lines.push(`Monthly lead volume: ${volume}.`);
    if (sources.length) lines.push(`Lead sources: ${sources.join(', ')}.`);
    if (breaking.trim()) lines.push(`What is breaking: ${breaking.trim()}`);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          business: brokerage.trim(),
          message: lines.join('\n'),
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-bg-elevated border border-border-soft p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-primary text-white">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-ink-primary">Request received.</h3>
        <p className="mt-2 text-ink-secondary leading-relaxed">
          Thanks {name.trim().split(' ')[0] || 'there'}. The team will review your
          lead flow and reach out at {email.trim()} shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-2xl bg-bg-elevated border border-border-soft p-6 md:p-8 flex flex-col gap-5"
    >
      <div>
        <label htmlFor="af-name" className={labelCls}>
          Name
        </label>
        <input
          id="af-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldCls}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="af-email" className={labelCls}>
          Email
        </label>
        <input
          id="af-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldCls}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="af-brokerage" className={labelCls}>
          Brokerage / team name <span className="text-ink-tertiary font-normal">(optional)</span>
        </label>
        <input
          id="af-brokerage"
          type="text"
          value={brokerage}
          onChange={(e) => setBrokerage(e.target.value)}
          className={fieldCls}
          placeholder="Brokerage or team"
        />
      </div>

      <div>
        <label htmlFor="af-volume" className={labelCls}>
          Current monthly lead volume
        </label>
        <select
          id="af-volume"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className={`${fieldCls} appearance-none bg-no-repeat`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23A1A1AA' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundPosition: 'right 1rem center',
          }}
        >
          <option value="">Select a range</option>
          {VOLUMES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className={labelCls}>Where leads currently come from</span>
        <div className="flex flex-wrap gap-2">
          {SOURCES.map((s) => {
            const active = sources.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSource(s)}
                aria-pressed={active}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium border transition-colors cursor-pointer ${
                  active
                    ? 'bg-ink-primary text-white border-ink-primary'
                    : 'bg-bg-canvas text-ink-secondary border-border-soft hover:bg-bg-muted'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="af-breaking" className={labelCls}>
          What is breaking right now <span className="text-ink-tertiary font-normal">(optional)</span>
        </label>
        <textarea
          id="af-breaking"
          rows={3}
          value={breaking}
          onChange={(e) => setBreaking(e.target.value)}
          className={`${fieldCls} resize-none`}
          placeholder="Where leads tend to slip after they come in"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-ink-secondary">
          Something went wrong sending that. Please try again, or email
          riccardo@operateai.ca.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-full bg-ink-primary text-white px-6 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
      >
        {status === 'submitting' ? 'Sending...' : 'Request a Lead Flow Audit'}
      </button>
    </form>
  );
}
