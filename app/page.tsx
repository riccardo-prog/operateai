import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import HowItWorks from '@/components/HowItWorks';
import Problems from '@/components/Problems';
import Industries from '@/components/Industries';
import Results from '@/components/Results';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Problems />
      <Industries />
      <Results />
      <CTA />
      <Footer />
    </main>
  );
}
