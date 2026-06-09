'use client';

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

/* ──────────────────────────────────────────────────────────────
   OperateAI site header.

   Structure + behavior (sticky logic, responsive collapse, mobile
   drawer with focus-trap / Esc / overlay-tap / scroll-lock) come
   from a 21st.dev navbar scaffold built on Radix Dialog. All of the
   scaffold's default visual styling has been stripped and replaced
   with the OperateAI brand: monochrome only, Outfit, hairline
   borders, 8px button radius, no glass / blur / accent color.

   Palette: Ink #0A0A0A · Graphite #1A1A1A · Steel #6B6B6B ·
            Fog #E4E4E4 · White #FFFFFF
   Desktop nav appears at ≥820px; below that it collapses to a sheet.
─────────────────────────────────────────────────────────────── */

const links = [
  { label: 'Product', href: '#see-it' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#book' },
];

const CTA_LABEL = 'Book a demo';
const CTA_HREF = '#book';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hairline bottom border appears only once the page leaves the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-[border-color,box-shadow] duration-200 border-b ${
        scrolled
          ? 'border-[#E4E4E4] shadow-[0_1px_2px_rgba(10,10,10,0.04)]'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        {/* Brand — existing OperateAI lockup, links home */}
        <a
          href="#home"
          aria-label="OperateAI, home"
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D3D3D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <img
            src="/OperateAI.svg"
            alt="OperateAI"
            width={145}
            height={28}
            className="block h-7 w-auto"
          />
        </a>

        {/* Desktop nav links */}
        <nav
          className="hidden items-center gap-9 min-[820px]:flex"
          aria-label="Primary"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative font-body text-[15px] font-medium text-[#6B6B6B] transition-colors hover:text-[#0A0A0A] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#0A0A0A] after:transition-[width] after:duration-200 hover:after:w-full motion-reduce:after:transition-none focus-visible:outline-none focus-visible:text-[#0A0A0A] focus-visible:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden min-[820px]:block">
          <a
            href={CTA_HREF}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0A0A0A] px-5 font-body text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#1A1A1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {CTA_LABEL}
          </a>
        </div>

        {/* Mobile drawer — Radix Dialog provides focus-trap, Esc,
            overlay-tap close, and scroll-lock. */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#0A0A0A] min-[820px]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D3D3D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M3 6.5h16M3 11h16M3 15.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="nav-overlay fixed inset-0 z-50 bg-[#0A0A0A]/30 min-[820px]:hidden" />
            <Dialog.Content
              aria-label="Site menu"
              className="nav-panel fixed inset-y-0 right-0 z-50 flex h-full w-[88%] max-w-[360px] flex-col bg-white shadow-[-8px_0_24px_rgba(10,10,10,0.06)] min-[820px]:hidden focus:outline-none"
            >
              <Dialog.Title className="sr-only">Site menu</Dialog.Title>

              {/* Drawer header: logo + close */}
              <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#E4E4E4] px-6">
                <img
                  src="/OperateAI.svg"
                  alt="OperateAI"
                  width={145}
                  height={28}
                  className="block h-7 w-auto"
                />
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D3D3D] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </Dialog.Close>
              </div>

              {/* Stacked links */}
              <nav className="flex flex-1 flex-col px-6 py-4" aria-label="Primary">
                {links.map((l) => (
                  <Dialog.Close asChild key={l.href}>
                    <a
                      href={l.href}
                      className="border-b border-[#E4E4E4]/70 py-4 font-body text-lg font-medium text-[#1A1A1A] transition-colors hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:text-[#0A0A0A]"
                    >
                      {l.label}
                    </a>
                  </Dialog.Close>
                ))}
              </nav>

              {/* Full-width CTA pinned to the bottom */}
              <div className="shrink-0 px-6 pb-8 pt-2">
                <Dialog.Close asChild>
                  <a
                    href={CTA_HREF}
                    className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#0A0A0A] font-body text-base font-medium text-white transition-colors duration-200 hover:bg-[#1A1A1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {CTA_LABEL}
                  </a>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
