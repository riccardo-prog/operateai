'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

type FormState = { name: string; email: string; business: string; message: string };
type Status = 'idle' | 'loading' | 'success' | 'error';

const BULLETS = [
  'You walk out with a written roadmap',
  "We tell you what we'd build and what it would cost",
  "If it's not a fit, we'll tell you that too",
];

export default function BookAudit() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', business: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', business: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section
      id="book"
      className="px-6 md:px-8 py-16 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <p className="font-mono text-xs text-text-muted uppercase tracking-[0.22em] mb-10">
          Book an audit
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* Left — form */}
          <div className="glass rounded-2xl p-8 md:p-10 flex flex-col gap-6">
            <div>
              <h2
                className="font-display text-text-primary leading-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', letterSpacing: '-0.02em', fontWeight: 600 }}
              >
                Free 30-minute operational audit.
              </h2>
              <p className="font-body text-sm text-text-secondary leading-relaxed max-w-md">
                We map your operations, find the biggest revenue leaks, and hand
                you a written roadmap. No pitch deck. No commitment.
              </p>
            </div>

            {status === 'success' ? (
              <div className="rounded-xl p-8" style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.18)' }}>
                <p className="font-mono text-xs text-accent uppercase tracking-[0.18em] mb-3">Message received</p>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  We&apos;ll be in touch within one business day. Or skip the
                  wait and book directly using the calendar on the right.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-text-muted uppercase tracking-[0.18em] mb-2">
                    Name <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input id="name" name="name" type="text" required value={form.name}
                    onChange={handleChange} className="glass-input font-body" placeholder="Your name" autoComplete="name" />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-text-muted uppercase tracking-[0.18em] mb-2">
                    Email <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input id="email" name="email" type="email" required value={form.email}
                    onChange={handleChange} className="glass-input font-body" placeholder="you@company.com" autoComplete="email" />
                </div>

                <div>
                  <label htmlFor="business" className="block font-mono text-xs text-text-muted uppercase tracking-[0.18em] mb-2">
                    Business <span className="normal-case tracking-normal text-text-muted font-mono">(optional)</span>
                  </label>
                  <input id="business" name="business" type="text" value={form.business}
                    onChange={handleChange} className="glass-input font-body" placeholder="Your business name" autoComplete="organization" />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-text-muted uppercase tracking-[0.18em] mb-2">
                    What&apos;s slowing your business down? <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={4} value={form.message}
                    onChange={handleChange}
                    className="glass-input font-body resize-none"
                    style={{ minHeight: '120px' }}
                    placeholder="Describe the manual work, missed leads, or operational gaps you want to fix..." />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs text-red-400 uppercase tracking-[0.12em]" role="alert">
                    Something went wrong. Try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary inline-flex items-center justify-center bg-accent text-bg-primary font-body text-sm font-semibold px-6 py-3 rounded-full min-h-[44px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>

          {/* Right — Calendly */}
          <div className="glass rounded-2xl p-8 md:p-10 flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-[0.18em] mb-4">Or book directly</p>
              <h3
                className="font-display text-text-primary leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', fontWeight: 600 }}
              >
                30-minute audit call.
              </h3>
            </div>

            <ul className="flex flex-col gap-5" aria-label="What you get">
              {BULLETS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="font-mono text-accent text-xs mt-0.5 shrink-0 select-none" aria-hidden="true">→</span>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <a
                href="https://calendly.com/operateai/free-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full font-body text-sm font-medium text-accent px-6 py-3 rounded-full min-h-[44px] cursor-pointer transition-all duration-200 hover:bg-accent hover:text-bg-primary"
                style={{ border: '1px solid rgba(56,189,248,0.35)' }}
              >
                Schedule on Calendly
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
