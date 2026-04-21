'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11,15,26,0.88)' : 'rgba(11,15,26,0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div className="max-w-content mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="OperateAI home"
        >
          <span className="font-body text-base font-semibold tracking-tight">
            <span className="text-text-primary">Operate</span><span className="text-accent">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          <a
            href="#product"
            className="font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            Product
          </a>
          <a
            href="#how"
            className="font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            FAQ
          </a>
          <a
            href="#book"
            className="btn-primary font-body text-sm font-semibold bg-accent text-bg-primary px-5 py-2 rounded-lg min-h-[36px] inline-flex items-center cursor-pointer"
          >
            Book a Free Audit
          </a>
        </nav>

        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2 min-h-[44px] min-w-[44px] items-center cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-5 bg-text-muted origin-center transition-transform duration-200 ${
              menuOpen ? 'rotate-45 translate-y-[5px]' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-text-muted transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-text-muted origin-center transition-transform duration-200 ${
              menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden bg-[rgba(11,15,26,0.96)] backdrop-blur-xl border-b border-white/[0.06] px-6 py-6 flex flex-col gap-5"
          >
            <a
              href="#product"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              Product
            </a>
            <a
              href="#how"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              FAQ
            </a>
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="btn-primary font-body text-sm font-semibold bg-accent text-bg-primary px-5 py-3 rounded-lg text-center cursor-pointer"
            >
              Book a Free Audit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
