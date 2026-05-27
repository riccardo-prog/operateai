import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  tone?: 'canvas' | 'muted';
  className?: string;
  children: ReactNode;
}

// Consistent vertical rhythm + container + alternating band tone for every
// major section. Tone alternates in 2-section bands across the page.
export default function Section({ id, tone = 'canvas', className = '', children }: SectionProps) {
  const bg = tone === 'muted' ? 'bg-bg-muted' : 'bg-bg-canvas';
  return (
    <section id={id} className={`${bg} py-24 md:py-32 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}
