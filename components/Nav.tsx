'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

const links = [
  { label: 'Problem', href: '#problem' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why different', href: '#why-different' },
  { label: 'FAQ', href: '#faq' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu if the viewport grows to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-bg-canvas/80 backdrop-blur-md border-b border-border-soft">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-2.5"
          aria-label="OperateAI Lead Engine, home"
        >
          <span className="font-body text-base font-semibold tracking-tight text-ink-primary">
            OperateAI
          </span>
          <span className="hidden lg:block h-3.5 w-px bg-border-soft" aria-hidden="true" />
          <span className="hidden lg:inline font-body text-sm text-ink-secondary">
            Lead Engine
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button href="#audit" variant="primary" size="sm">
            Request a Lead Flow Audit
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 -mr-2 min-h-[44px] min-w-[44px] cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-5 bg-ink-primary origin-center transition-transform duration-200 ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-ink-primary transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-ink-primary origin-center transition-transform duration-200 ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border-soft bg-bg-canvas px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button
            href="#audit"
            variant="primary"
            onClick={() => setMenuOpen(false)}
            className="w-full"
          >
            Request a Lead Flow Audit
          </Button>
        </div>
      )}
    </header>
  );
}
