import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TheCost from '@/components/TheCost';
import WhatWeBuild from '@/components/WhatWeBuild';
import HowWeWork from '@/components/HowWeWork';
import BookAudit from '@/components/BookAudit';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Atmospheric page-wide glows — behind all content */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        {/* Top-right accent glow */}
        <div style={{
          position: 'absolute', top: '-8%', right: '-4%',
          width: '680px', height: '680px',
          background: 'radial-gradient(circle, rgba(56,189,248,0.055) 0%, transparent 68%)',
          filter: 'blur(1px)',
        }} />
        {/* Bottom-left accent glow */}
        <div style={{
          position: 'absolute', bottom: '18%', left: '-8%',
          width: '560px', height: '560px',
          background: 'radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 68%)',
          filter: 'blur(1px)',
        }} />
        {/* Bottom amber warmth */}
        <div style={{
          position: 'absolute', bottom: '4%', right: '22%',
          width: '500px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.022) 0%, transparent 65%)',
          filter: 'blur(1px)',
        }} />
      </div>

      <Nav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <TheCost />
        <WhatWeBuild />
        <HowWeWork />
        <BookAudit />
      </main>
      <Footer />
    </>
  );
}
