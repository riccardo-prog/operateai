'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  target: number;
  suffix: string;
  prefix?: string;
  duration?: number;
}

function Counter({ target, suffix, prefix = '', duration = 1500 }: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-72px' });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current || target === 0) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{value}{suffix}
    </span>
  );
}

const stats = [
  {
    display: <Counter target={10} suffix="+" />,
    label: 'Hours saved per week, per client',
  },
  {
    display: <span>$0</span>,
    label: 'Cost of the initial operations audit',
  },
  {
    display: <Counter target={48} suffix="hr" />,
    label: 'From audit to first automation live',
  },
];

export default function StatsBar() {
  return (
    <section className="border-y border-[#1E293B]">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`py-10 text-center ${
                i < stats.length - 1
                  ? 'border-b md:border-b-0 md:border-r border-[#1E293B]'
                  : ''
              }`}
            >
              <div className="font-display text-5xl md:text-6xl text-[#38BDF8] mb-2 tracking-tight">
                {stat.display}
              </div>
              <div className="text-sm text-[#94A3B8] max-w-[180px] mx-auto leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
