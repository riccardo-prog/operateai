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
  type?: 'button' | 'submit';
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
  type = 'button',
}: ButtonProps) {
  // Dovetail-flavor pills: rounded-full, font-medium, calm (no glow shadows).
  const base =
    'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-7 py-3.5 text-[15px]',
  };

  const variants = {
    primary: 'bg-ink-primary text-white hover:opacity-90',
    secondary:
      'bg-transparent border border-border-soft text-ink-primary hover:bg-bg-muted',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
