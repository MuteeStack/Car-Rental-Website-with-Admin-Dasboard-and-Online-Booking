// src/components/HowItWorksSection.jsx
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CalendarCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: Car,
    title: "Choose Your Car",
    description: "Browse our premium fleet of 2025 models. From economy to luxury SUVs — find the perfect ride for your trip.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    glowColor: "bg-blue-400",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Pick Date & Location",
    description: "Select your pickup location, travel dates, and rental type — with driver or self-drive. It's quick and easy.",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    glowColor: "bg-indigo-400",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Confirm & Drive",
    description: "Submit your booking and our team will confirm within 30 minutes. Get on the road hassle-free!",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    glowColor: "bg-emerald-400",
  },
];

export default function HowItWorksSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.04)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.04)_0%,_transparent_70%)] translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-indigo-50/80 border border-indigo-100/50 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Simple Process
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-gray-950 mb-4">
            Book in Just <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">3 Steps</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-medium">
            Getting your perfect rental car has never been easier
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 relative">

          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[5.5rem] left-[16.666%] right-[16.666%] h-[2px] z-0">
            <div className={`h-full bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200 transition-all duration-1000 ease-out ${visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transformOrigin: 'left' }} />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative z-10 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="group relative bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 text-center flex flex-col items-center">

                  {/* Glow on hover */}
                  <div className={`absolute -inset-1 rounded-[2.5rem] ${step.glowColor} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 -z-10`} />

                  {/* Step Number Badge */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Step Number Pill */}
                  <div className={`inline-flex items-center gap-1.5 ${step.bgColor} ${step.iconColor} text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 border ${step.borderColor}`}>
                    Step {step.number}
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-black text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`text-center mt-14 md:mt-16 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
          <button
            onClick={() => navigate('/book')}
            className="group inline-flex items-center gap-3 bg-gray-950 text-white px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-bold shadow-xl shadow-gray-900/20 transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
          >
            Start Booking Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-xs text-gray-400 font-semibold mt-4 tracking-wide uppercase">
            Takes less than 2 minutes
          </p>
        </div>

      </div>
    </section>
  );
}
