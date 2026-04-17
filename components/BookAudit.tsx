'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

type FormState = {
  name: string;
  email: string;
  business: string;
  message: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const BULLETS = [
  'You walk out with a written roadmap',
  "We tell you what we'd build and what it would cost",
  "If it's not a fit, we'll tell you that too",
];

export default function BookAudit() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    business: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', business: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.1] text-text-primary text-sm font-body px-4 py-3 rounded-xl focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/[0.15] transition-all duration-200 placeholder:text-text-muted min-h-[44px]';

  return (
    <section
      id="book"
      className="px-6 md:px-8 py-24 md:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-content mx-auto">
        {/* Section label */}
        <p className="font-mono text-xs text-text-muted uppercase tracking-[0.22em] mb-12">
          Book an audit
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* Left — Contact form */}
          <div className="rounded-2xl bg-[rgba(17,24,39,0.5)] backdrop-blur-xl border border-white/[0.07] p-8 md:p-10 flex flex-col gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-3 tracking-tight font-semibold">
                Free 30-minute operational audit.
              </h2>
              <p className="font-body text-sm text-text-secondary leading-relaxed max-w-md">
                We map your operations, find the biggest revenue leaks, and hand
                you a written roadmap. No pitch deck. No commitment.
              </p>
            </div>

            {status === 'success' ? (
              <div className="rounded-xl border border-accent/20 bg-accent/[0.06] p-8">
                <p className="font-mono text-xs text-accent uppercase tracking-[0.18em] mb-3">
                  Message received
                </p>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  We&apos;ll be in touch within one business day. Or skip the
                  wait and book directly using the calendar on the right.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs text-text-muted uppercase tracking-[0.18em] mb-2"
                  >
                    Name <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs text-text-muted uppercase tracking-[0.18em] mb-2"
                  >
                    Email <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="business"
                    className="block font-mono text-xs text-text-muted uppercase tracking-[0.18em] mb-2"
                  >
                    Business{' '}
                    <span className="normal-case tracking-normal text-text-muted font-mono">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    value={form.business}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your business name"
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs text-text-muted uppercase tracking-[0.18em] mb-2"
                  >
                    What&apos;s slowing your business down?{' '}
                    <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} min-h-[120px] resize-none`}
                    placeholder="Describe the manual work, missed leads, or operational gaps you want to fix..."
                  />
                </div>

                {status === 'error' && (
                  <p
                    className="font-mono text-xs text-red-400 uppercase tracking-[0.12em]"
                    role="alert"
                  >
                    Something went wrong. Try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center bg-accent text-bg-primary font-body text-sm font-medium px-6 py-3 rounded-full hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] cursor-pointer shadow-[0_0_24px_rgba(56,189,248,0.2)]"
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>

          {/* Right — Calendly card */}
          <div className="rounded-2xl bg-[rgba(17,24,39,0.5)] backdrop-blur-xl border border-white/[0.07] p-8 md:p-10 flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-[0.18em] mb-4">
                Or book directly
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-text-primary leading-tight tracking-tight font-semibold">
                30-minute audit call.
              </h3>
            </div>

            <ul className="flex flex-col gap-5" aria-label="What you get">
              {BULLETS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="font-mono text-accent text-xs mt-0.5 shrink-0 select-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {point}
                  </p>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-white/[0.06] mt-auto">
              <a
                href="https://calendly.com/operateai/free-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full border border-accent/40 text-accent font-body text-sm font-medium px-6 py-3 rounded-full hover:bg-accent hover:text-bg-primary hover:border-accent transition-all duration-200 min-h-[44px] cursor-pointer"
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
