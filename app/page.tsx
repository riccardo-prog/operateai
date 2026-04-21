import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TheProblem from '@/components/TheProblem';
import TheSolution from '@/components/TheSolution';
import HowItWorks from '@/components/HowItWorks';
import TrustSignals from '@/components/TrustSignals';
import FAQ from '@/components/FAQ';
import BookAudit from '@/components/BookAudit';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TheProblem />
        <TheSolution />
        <HowItWorks />
        <TrustSignals />
        <FAQ />
        <BookAudit />
      </main>
      <Footer />
    </>
  );
}
