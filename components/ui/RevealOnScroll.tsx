'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -15% 0px' });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReduced ? 0 : 0.5,
        delay: prefersReduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
