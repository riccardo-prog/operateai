'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

/* Counts up from 0 to `target` over `duration` ms (ease-out) the first time it
   scrolls into view. tabular-nums keeps the width stable so the layout never
   jumps. Under prefers-reduced-motion it renders the final value immediately. */
export default function ScoreCounter({
  target,
  duration = 800,
  className,
  style,
}: {
  target: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(easeOut(p) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums lining-nums', ...style }}
    >
      {value}
    </span>
  );
}
