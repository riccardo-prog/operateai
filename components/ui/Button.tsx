import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  target,
  rel,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-7 py-3.5 text-[15px]',
  };

  const variants = {
    primary:
      'bg-[#38BDF8] text-[#0B0F1A] hover:bg-[#7DD3FC] hover:shadow-[0_0_28px_rgba(56,189,248,0.4)] active:scale-[0.98]',
    secondary:
      'border border-[#1E293B] text-[#F1F5F9] hover:border-[#38BDF8]/40 hover:bg-[#1A2335] active:scale-[0.98]',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
