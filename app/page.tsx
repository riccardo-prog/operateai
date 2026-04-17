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
      <Nav />
      <main>
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
