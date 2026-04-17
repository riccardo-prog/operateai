interface SectionLabelProps {
  children: string;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-xs font-semibold tracking-[0.18em] uppercase text-[#38BDF8] mb-4 ${className}`}
    >
      {children}
    </span>
  );
}
