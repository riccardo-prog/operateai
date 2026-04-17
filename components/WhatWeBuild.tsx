'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const products = [
  {
    name: 'Lead Engine',
    description:
      'Responds to every new lead in under a minute. Qualifies them, answers questions, books the call.',
    meta: 'STATUS: LIVE',
    featured: true,
    colSpan: 'md:col-span-2',
  },
  {
    name: 'Booking Systems',
    description:
      'Intake forms, scheduling, reminders, and no-show recovery.',
    meta: 'TIMELINE: 2 WEEKS',
    featured: false,
    colSpan: '',
  },
  {
    name: 'Invoice & Collections',
    description:
      'Generate, send, and chase invoices without the admin.',
    meta: 'TIMELINE: 1 WEEK',
    featured: false,
    colSpan: '',
  },
  {
    name: 'Inbound Assistant',
    description:
      'Answers common questions across email, SMS, and DMs.',
    meta: 'TIMELINE: 2 WEEKS',
    featured: false,
    colSpan: '',
  },
  {
    name: 'Operational Dashboards',
    description:
      'Real-time visibility into lead flow, revenue, and bottlenecks.',
    meta: 'TIMELINE: 1 WEEK',
    featured: false,
    colSpan: '',
  },
  {
    name: 'Custom Workflows',
    description:
      'Automations that connect your existing tools to each other.',
    meta: 'SCOPE: DEFINED PER CLIENT',
    featured: false,
    colSpan: 'md:col-span-2',
  },
];

export default function WhatWeBuild() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="what"
      ref={ref}
      className="px-6 md:px-8 py-24 md:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-content mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-2">
          <p className="font-mono text-xs text-text-muted uppercase tracking-[0.22em]">
            What we build
          </p>
          <p className="font-mono text-xs text-text-muted">
            Most systems ship in one to four weeks.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
                delay: prefersReduced ? 0 : i * 0.07,
              }}
              className={`group relative rounded-2xl border transition-all duration-200 p-6 md:p-8 flex flex-col gap-3 cursor-default ${
                product.colSpan
              } ${
                product.featured
                  ? 'bg-[rgba(17,24,39,0.7)] border-accent/[0.18] shadow-[0_0_40px_rgba(56,189,248,0.08)] md:min-h-64 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_60px_rgba(56,189,248,0.12)]'
                  : 'bg-[rgba(17,24,39,0.45)] border-white/[0.07] hover:-translate-y-0.5 hover:bg-[rgba(17,24,39,0.65)] hover:border-white/[0.12]'
              } backdrop-blur-xl`}
            >
              {/* Subtle accent glow on featured */}
              {product.featured && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(ellipse at top left, rgba(56,189,248,0.06) 0%, transparent 60%)',
                  }}
                />
              )}

              <h3
                className={`relative font-display font-semibold text-text-primary tracking-tight ${
                  product.featured ? 'text-2xl' : 'text-base'
                }`}
              >
                {product.name}
              </h3>

              <p
                className={`relative font-body text-text-secondary leading-relaxed ${
                  product.featured ? 'text-base max-w-lg' : 'text-sm'
                }`}
              >
                {product.description}
              </p>

              <p
                className={`relative font-mono text-xs uppercase tracking-[0.18em] mt-auto pt-2 ${
                  product.featured ? 'text-accent' : 'text-text-muted'
                }`}
              >
                {product.meta}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
