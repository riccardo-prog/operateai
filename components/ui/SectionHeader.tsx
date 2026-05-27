import { ReactNode } from 'react';
import SectionLabel from './SectionLabel';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode; // optional lead paragraph
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  children,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <div className={`flex flex-col max-w-2xl ${alignment} ${className}`}>
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="font-body text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-ink-primary">
        {title}
      </h2>
      {children && (
        <p className="mt-5 text-lg text-ink-secondary leading-relaxed">{children}</p>
      )}
    </div>
  );
}
