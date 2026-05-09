// src/components/Navbar.jsx
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    const label = item.toLowerCase();
    // Pages that have their own route
    const pageRoutes = { 'about': '/about' };
    if (pageRoutes[label]) {
      navigate(pageRoutes[label]);
      setMobileMenuOpen(false);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      return;
    }
    // Section scroll mapping
    const sectionMap = { 'home': 'hero', 'reviews': 'testimonials' };
    const targetId = sectionMap[label] || label;
    // If we're not on the home page, navigate home first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'top-2 md:top-4 px-3 md:px-6' : 'top-4 md:top-6 px-4 md:px-8'}`}>
        <div className={`mx-auto max-w-7xl transition-all duration-500 border rounded-full ${scrolled ? 'bg-white/70 backdrop-blur-xl border-white/60 py-2.5 px-4 md:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : 'bg-transparent border-transparent py-2 px-2'}`}>
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => handleNavClick('Home')} className="text-left group flex-shrink-0">
              <div className="text-xl md:text-2xl font-black tracking-widest text-gray-900 group-hover:text-blue-700 transition-colors duration-300 uppercase font-display">IMRAN</div>
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-gray-500 font-semibold">Rent a Car</div>
            </button>

            <div className="hidden lg:flex items-center gap-1 rounded-full bg-gray-900/5 p-1 border border-gray-200/50 backdrop-blur-md">
              {['Home', 'Fleet', 'Pricing', 'Reviews', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-white hover:text-gray-950 hover:shadow-sm"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/book')} className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden rounded-full p-2.5 transition-colors ${mobileMenuOpen ? 'bg-gray-100 text-gray-900' : 'bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 shadow-sm'}`}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden absolute left-3 right-3 origin-top transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-[calc(100%+0.5rem)] opacity-100 scale-100' : 'top-[calc(100%+0.5rem)] opacity-0 scale-95 pointer-events-none'}`}>
          <div className="glass-panel rounded-3xl p-3 shadow-2xl border border-white/50">
            <div className="flex flex-col gap-1 text-base font-semibold text-gray-800">
              {['Home', 'Fleet', 'Pricing', 'Reviews', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="rounded-2xl px-5 py-3.5 text-left transition-colors hover:bg-white hover:text-blue-600 active:bg-gray-50"
                >
                  {item}
                </button>
              ))}
              <div className="mt-2 p-2 border-t border-gray-100">
                <button onClick={() => { navigate('/book'); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 rounded-2xl bg-gray-950 px-6 py-4 text-center font-semibold text-white shadow-lg active:scale-95 transition-transform w-full">
                  Book Now <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-20 md:h-28" />
    </>
  );
}