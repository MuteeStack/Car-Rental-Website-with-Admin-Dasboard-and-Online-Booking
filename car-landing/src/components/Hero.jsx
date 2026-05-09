// src/components/Hero.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock3, ShieldCheck, Star, UserCheck, MapPin, Navigation, Plane, Car, Clock } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import carImage from '../assets/car.png';
import SocialFloat from './SocialFloat';
import { defaultHeroSettings, mergeHeroSettings } from '../constants/heroDefaults';

export default function Hero() {
  const navigate = useNavigate();
  const [heroSettings, setHeroSettings] = useState(defaultHeroSettings);

  useEffect(() => {
    const loadHeroSettings = async () => {
      try {
        const snapshot = await getDoc(doc(db, 'siteContent', 'hero'));
        if (snapshot.exists()) {
          setHeroSettings(mergeHeroSettings(snapshot.data()));
        }
      } catch (error) {
        setHeroSettings(defaultHeroSettings);
      }
    };

    loadHeroSettings();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-7rem)] overflow-hidden flex items-center pt-8 pb-12">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-slate-50" />
      <div className="absolute inset-0 -z-10 opacity-60 mix-blend-multiply bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent" />
      <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] opacity-30 mix-blend-multiply bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200 via-transparent to-transparent blur-3xl animate-pulse-soft" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left Content Area */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left animate-fade-up">

            {/* Chips */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6 text-xs font-semibold tracking-wide text-gray-700">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full uppercase shadow-sm bg-white border-2 border-gray-900 text-gray-900"><Plane className="w-3.5 h-3.5" /> {heroSettings.chip1}</span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full uppercase shadow-sm bg-white border-2 border-gray-900 text-gray-900"><Car className="w-3.5 h-3.5" /> {heroSettings.chip2}</span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full uppercase shadow-sm bg-white border-2 border-gray-900 text-gray-900"><Clock className="w-3.5 h-3.5" /> {heroSettings.chip3}</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight text-gray-950 drop-shadow-sm">
              {heroSettings.headingLine1}
              <br />
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {heroSettings.headingLine2}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 font-medium">
              {heroSettings.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row gap-4 sm:gap-3">
              <button
                onClick={() => navigate('/book')}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gray-950 px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/20 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">{heroSettings.bookNowText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-gray-800 to-gray-950 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              <a
                href="https://wa.me/923215466600"
                className="inline-flex items-center justify-center gap-2 rounded-full glass-panel px-8 py-3.5 text-sm font-bold text-gray-900 shadow-md transition-all duration-300 hover:bg-white hover:shadow-lg active:scale-95"
              >
                {heroSettings.whatsappText}
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-3 sm:gap-4 lg:max-w-none">
              {[
                { icon: Star, color: "text-amber-500", label: "Customers", value: "500+", sub: "4.9/5" },
                { icon: Clock3, color: "text-blue-500", label: "Response", value: "30 min", sub: "Fast" },
                { icon: ShieldCheck, color: "text-emerald-500", label: "Support", value: "24/7", sub: "Safe" }
              ].map((item, idx) => (
                <div key={idx} className="glass-panel rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-sm border-white/60 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <item.icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${item.color}`} /> {item.sub}
                  </div>
                  <div className="mt-1 text-base sm:text-xl font-black text-gray-950 font-display">{item.value}</div>
                  <div className="text-[10px] sm:text-xs font-medium text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center lg:justify-start w-full">
              <SocialFloat />
            </div>
          </div>

          {/* Right Image/Card Area */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end animate-scale-in mt-10 lg:mt-0" style={{ animationDelay: '0.2s' }}>

            {/* Main Showcase Card */}
            <div className="relative w-full max-w-[560px]">

              {/* Outer Decorative Glow */}
              <div className="absolute -inset-1 sm:-inset-2 rounded-[3rem] bg-linear-to-br from-blue-200/40 to-indigo-200/40 blur-2xl -z-10" />

              <div className="relative bg-gradient-to-b from-[#F0F6FF]/90 to-white/95 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-5 sm:p-8 flex flex-col">

                {/* Top Badge */}
                <div className="absolute top-5 left-5 sm:top-8 sm:left-8 rounded-full bg-[#0B132B] px-5 py-2.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white shadow-lg z-30">
                  {heroSettings.availableBadge}
                </div>

                {/* Car Image + Floating Price container */}
                <div className="relative flex flex-col justify-center items-center mt-8 mb-6 w-full gap-6">

                  {/* Car Image */}
                  <img
                    src={heroSettings.heroImageUrl || carImage}
                    alt={heroSettings.heroImageAlt || 'Imran Rent a Car'}
                    className="w-full h-auto object-contain translate-y-4 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] z-10 transition-transform duration-500 hover:scale-105"
                  />

                  {/* Floating Price Tag */}
                  <div className="self-end bg-white/70 backdrop-blur-xl rounded-[1.5rem] px-6 py-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-white/60 z-20 transition-transform duration-300 hover:-translate-y-1 inline-block">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 text-right">
                      {heroSettings.priceLabel}
                    </div>
                    <div className="text-[32px] font-black text-[#0B132B] font-display leading-none tracking-tight text-right mb-1">
                      {heroSettings.priceValue}
                    </div>
                    <div className="text-[10px] font-bold text-gray-500 text-right">
                      {heroSettings.priceUnit}
                    </div>
                  </div>
                </div>

                {/* Bottom 3 Detail Pills */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full z-20 mt-auto">
                  {[
                    { icon: UserCheck, title: heroSettings.driverTagTitle, val: heroSettings.driverTagValue, dark: true },
                    { icon: MapPin, title: heroSettings.pickupTagTitle, val: heroSettings.pickupTagValue, dark: false },
                    { icon: Navigation, title: heroSettings.areaTagTitle, val: heroSettings.areaTagValue, dark: false }
                  ].map((tag, idx) => (
                    <div key={idx} className={`flex flex-col items-center justify-center rounded-[1.25rem] sm:rounded-[1.5rem] py-4 sm:py-5 shadow-[0_8px_20px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 border-2 ${tag.dark ? 'bg-[#0B132B] text-white border-gray-900' : 'bg-white text-[#0B132B] border-gray-900'}`}>
                      <tag.icon className="w-5 h-5 mb-2 opacity-80" />
                      <span className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-widest mb-1 sm:mb-1.5 ${tag.dark ? 'text-gray-400' : 'text-gray-400'}`}>{tag.title}</span>
                      <span className="text-[13px] sm:text-[15px] font-black whitespace-nowrap">{tag.val}</span>
                    </div>
                  ))}
                </div>

                {/* Book Now CTA */}
                <button
                  onClick={() => navigate('/book')}
                  className="group w-full mt-4 sm:mt-5 relative overflow-hidden bg-[#0B132B] text-white font-bold py-4 sm:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/30 active:scale-[0.98] z-20"
                >
                  <span className="relative z-10 flex items-center gap-2.5 text-sm sm:text-base tracking-wide">
                    Book This Car
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}