import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TheProblem from '@/components/TheProblem';
import HowItWorks from '@/components/HowItWorks';
import SeeIt from '@/components/SeeIt';
import OraIntro from '@/components/OraIntro';
import CommonQuestions from '@/components/CommonQuestions';
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
        <SeeIt />
        <OraIntro />
        <CommonQuestions />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
