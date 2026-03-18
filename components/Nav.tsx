'use client';

import { useState, useEffect } from 'react';
import Button from './ui/Button';

const navLinks = [
  { label: 'How It Works', href: '#how' },
  { label: 'What We Fix', href: '#problems' },
  { label: 'Results', href: '#results' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F1A]/90 border-b border-[#1E293B] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex-shrink-0" aria-label="OperateAI home">
          <img src="/logo-full.png" alt="OperateAI" className="h-28 w-auto -my-9" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <Button href="#book" size="sm">
            Free Audit →
          </Button>
        </div>

        {/* Mobile: CTA + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <Button href="#book" size="sm">
            Free Audit →
          </Button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden border-t border-[#1E293B] bg-[#0B0F1A]/95 backdrop-blur-xl overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors py-2.5 border-b border-[#1E293B]/50 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
