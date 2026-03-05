'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

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
  const isInView = useInView(ref, { once, margin: '-72px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
