// src/components/AboutSection.jsx
import { Shield, Clock, Users, MapPin, Award, Heart, Target, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: MapPin, value: "2", label: "City Coverage", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Clock, value: "24/7", label: "Support Available", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Award, value: "4.9★", label: "Customer Rating", color: "text-indigo-600", bg: "bg-indigo-50" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every vehicle is fully insured, regularly serviced, and thoroughly inspected before each rental.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Our dedicated team is always just a call away, ensuring your experience is seamless and stress-free.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Reliability",
    description: "On-time pickups, well-maintained cars, and transparent pricing — every single time.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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
    <section className="py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.04)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.05)_0%,_transparent_70%)] translate-x-1/4 translate-y-1/4" />
      </div>

      <div
        ref={sectionRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
      >
        {/* Header */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-indigo-50/80 border border-indigo-100/50 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Who We Are
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-gray-950">
            About <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">Imran Rent a Car</span>
          </h2>

          <div className="h-1.5 w-16 bg-blue-600 rounded-full mx-auto mb-6" />

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Rawalpindi & Islamabad's most trusted car rental service — proudly serving families, businesses, and travelers since day one.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 delay-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Left — Story */}
          <div className="space-y-6">
            <div className="glass-panel rounded-[2rem] p-8 md:p-10 shadow-lg border-white/60">
              <h3 className="font-display text-2xl md:text-3xl font-black text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                What started as a passion for premium cars and excellent service has grown into one of the most reliable car rental businesses in the twin cities. At <strong className="text-gray-900">Imran Rent a Car</strong>, we believe every journey deserves comfort, safety, and style.
              </p>
              <p className="text-gray-600 leading-relaxed font-medium">
                From daily commutes to wedding convoys, airport transfers to mountain adventures — we provide the perfect vehicle for every occasion, backed by professional drivers and round-the-clock customer support.
              </p>
            </div>

            {/* Mission Card */}
            <div className="relative rounded-[2rem] p-8 md:p-10 overflow-hidden bg-gray-950 text-white shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                  <Target className="w-3 h-3" /> Our Mission
                </div>
                <p className="text-lg md:text-xl font-bold text-white/90 leading-relaxed">
                  "To make premium car rental accessible, affordable, and hassle-free for everyone in Rawalpindi & Islamabad."
                </p>
              </div>
            </div>
          </div>

          {/* Right — Stats + Values */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-[1.5rem] p-6 text-center shadow-sm border-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-gray-950 font-display mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="space-y-4">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-[1.5rem] p-5 md:p-6 flex items-start gap-4 shadow-sm border-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md group"
                >
                  <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${val.gradient} flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    <val.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-gray-900 mb-1">{val.title}</h4>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
