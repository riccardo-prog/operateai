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
    description: 'Intake forms, scheduling, reminders, and no-show recovery.',
    meta: 'TIMELINE: 2 WEEKS',
    featured: false,
    colSpan: '',
  },
  {
    name: 'Invoice & Collections',
    description: 'Generate, send, and chase invoices without the admin.',
    meta: 'TIMELINE: 1 WEEK',
    featured: false,
    colSpan: '',
  },
  {
    name: 'Inbound Assistant',
    description: 'Answers common questions across email, SMS, and DMs.',
    meta: 'TIMELINE: 2 WEEKS',
    featured: false,
    colSpan: '',
  },
  {
    name: 'Operational Dashboards',
    description: 'Real-time visibility into lead flow, revenue, and bottlenecks.',
    meta: 'TIMELINE: 1 WEEK',
    featured: false,
    colSpan: '',
  },
  {
    name: 'Custom Workflows',
    description: 'Automations that connect your existing tools to each other.',
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
      className="px-6 md:px-8 py-16 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-2">
          <p className="font-mono text-xs text-text-muted uppercase tracking-[0.22em]">
            What we build
          </p>
          <p className="font-mono text-xs text-text-muted">
            Most systems ship in one to four weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
                delay: prefersReduced ? 0 : i * 0.065,
              }}
              className={`relative p-6 md:p-8 flex flex-col gap-3 rounded-2xl ${product.colSpan} ${
                product.featured
                  ? 'glass-flagship md:min-h-60'
                  : 'glass'
              }`}
            >
              {/* Flagship gradient wash */}
              {product.featured && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background: 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, transparent 60%)',
                  }}
                />
              )}

              <h3
                className="relative font-display text-text-primary"
                style={{
                  fontSize: product.featured ? 'clamp(1.25rem, 2.5vw, 1.6rem)' : '1rem',
                  letterSpacing: '-0.02em',
                  fontWeight: product.featured ? 600 : 500,
                }}
              >
                {product.name}
              </h3>

              <p className={`relative font-body text-text-secondary leading-relaxed ${product.featured ? 'text-base max-w-lg' : 'text-sm'}`}>
                {product.description}
              </p>

              <p className={`relative font-mono text-xs uppercase tracking-[0.18em] mt-auto pt-2 ${
                product.featured ? 'text-accent' : 'text-text-muted'
              }`}>
                {product.meta}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
