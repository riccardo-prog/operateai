'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div className="max-w-content mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="OperateAI home"
        >
          <Image
            src="/logo-symbol.png"
            alt=""
            width={28}
            height={28}
            className="rounded-sm"
            aria-hidden="true"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="text-text-primary group-hover:text-text-primary transition-colors duration-200">Operate</span><span className="text-accent">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          <a
            href="#what"
            className="font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            Work
          </a>
          <a
            href="#how"
            className="font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            Process
          </a>
          <a
            href="#book"
            className="font-body text-sm font-medium bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full hover:bg-accent hover:text-bg-primary hover:border-accent transition-all duration-200 cursor-pointer"
          >
            Book a free audit
          </a>
        </nav>

        {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden bg-[rgba(11,15,26,0.95)] backdrop-blur-xl border-b border-white/[0.06] px-6 py-6 flex flex-col gap-5"
          >
            <a
              href="#what"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              Work
            </a>
            <a
              href="#how"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              Process
            </a>
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm font-medium bg-accent/10 border border-accent/30 text-accent px-4 py-3 rounded-full text-center hover:bg-accent hover:text-bg-primary hover:border-accent transition-all duration-200 cursor-pointer"
            >
              Book a free audit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
