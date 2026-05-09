// src/pages/Home.jsx
import Hero from '../components/Hero';
import HowItWorksSection from '../components/HowItWorksSection';
import FleetSection from '../components/FleetSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQsSection from '../components/FAQsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section id="hero" className="scroll-mt-28">
        <Hero />
      </section>

      <section id="how-it-works" className="scroll-mt-28">
        <HowItWorksSection />
      </section>

      <section id="fleet" className="scroll-mt-28">
        <FleetSection />
      </section>

      <section id="pricing" className="scroll-mt-28">
        <PricingSection />
      </section>

      <section id="testimonials" className="scroll-mt-28">
        <TestimonialsSection />
      </section>

      <section id="faqs" className="scroll-mt-28">
        <FAQsSection />
      </section>

      <section id="contact" className="scroll-mt-28">
        <Footer />
      </section>
    </main>
  );
}