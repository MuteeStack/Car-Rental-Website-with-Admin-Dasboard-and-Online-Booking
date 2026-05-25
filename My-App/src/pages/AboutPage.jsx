// src/pages/AboutPage.jsx
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div
      className="min-h-screen text-gray-900"
      style={{
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(248,250,252,0.98) 38%, rgba(226,232,240,0.9) 100%)',
      }}
    >
      <Navbar />
      <AboutSection />
      <Footer />
    </div>
  );
}
