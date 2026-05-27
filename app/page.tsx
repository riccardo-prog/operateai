import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TheProblem from '@/components/TheProblem';
import HowItWorks from '@/components/HowItWorks';
import WhyDifferent from '@/components/WhyDifferent';
import WhatItDoes from '@/components/WhatItDoes';
import WhatGetsSetUp from '@/components/WhatGetsSetUp';
import OraIntro from '@/components/OraIntro';
import HumanReassurance from '@/components/HumanReassurance';
import LeadSources from '@/components/LeadSources';
import Reporting from '@/components/Reporting';
import FoundingClient from '@/components/FoundingClient';
import FAQ from '@/components/FAQ';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TheProblem />
        <HowItWorks />
        <WhyDifferent />
        <WhatItDoes />
        <WhatGetsSetUp />
        <OraIntro />
        <HumanReassurance />
        <LeadSources />
        <Reporting />
        <FoundingClient />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
