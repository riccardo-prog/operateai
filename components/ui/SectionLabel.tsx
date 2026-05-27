interface SectionLabelProps {
  children: string;
  className?: string;
}

// Dovetail-flavor eyebrow: every major section opens with one of these.
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-xs font-medium tracking-[0.14em] uppercase text-ink-tertiary mb-4 ${className}`}
    >
      {children}
    </span>
  );
}
