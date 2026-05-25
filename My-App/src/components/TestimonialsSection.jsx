// src/components/TestimonialsSection.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck, Users, MessageSquareQuote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Business Executive",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Exceptional service! The cars are always spotless and drivers are professional and punctual.",
  },
  {
    id: 2,
    name: "Usman Ali",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    text: "I rented a car for my wedding and the experience was absolutely fantastic. Highly recommended!",
  },
  {
    id: 3,
    name: "Bilal Mahmood",
    role: "Travel Blogger",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    text: "Used their service for a Naran trip. The SUV was perfect for the mountain roads — no issues at all!",
  },
  {
    id: 4,
    name: "Imran Sheikh",
    role: "Corporate Lawyer",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text: "Professional and reliable. I use their service for all my business meetings. Never once disappointed!",
  },
  {
    id: 5,
    name: "Faisal Qureshi",
    role: "Event Planner",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    text: "Booked multiple cars for a corporate event. Smooth coordination and excellent fleet quality!",
  },
  {
    id: 6,
    name: "Tariq Jameel",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    text: "The self-drive option is amazing. Clean cars, fair prices, and a completely hassle-free experience!",
  },
  {
    id: 7,
    name: "Kashif Raza",
    role: "Doctor",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    rating: 5,
    text: "Needed a car urgently for a family emergency. They delivered within an hour. Truly grateful!",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const navigate = useCallback((newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((newIndex + testimonials.length) % testimonials.length);
    startTimer();
    setTimeout(() => setIsAnimating(false), 350);
  }, [isAnimating, startTimer]);

  const goToPrevious = () => navigate(currentIndex - 1);
  const goToNext = () => navigate(currentIndex + 1);
  const goToSlide = (index) => navigate(index);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 60) dx < 0 ? goToNext() : goToPrevious();
  };

  const t = testimonials[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.03)_0%,_transparent_70%)] -translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.03)_0%,_transparent_70%)] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100/50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm uppercase tracking-widest">
            <MessageSquareQuote className="h-3.5 w-3.5 text-blue-600" />
            Customer Reviews
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-gray-950 mb-4">
            What people <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">are saying</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-medium">
            Real experiences from our satisfied customers across Pakistan
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="glass-panel relative rounded-[2.5rem] p-8 md:p-14 shadow-xl overflow-hidden animate-fade-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Decorative Quote Icon */}
            <MessageSquareQuote className="absolute top-6 right-8 w-24 h-24 text-blue-600/5 -rotate-12" />

            {/* Content Area */}
            <div
              key={currentIndex}
              className="relative animate-fade-in"
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 md:h-6 md:w-6 ${i < t.rating ? 'fill-amber-400 text-amber-400 drop-shadow-sm' : 'text-gray-200'}`}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed mb-10">
                "{t.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-30" />
                  <img
                    src={t.image}
                    alt={t.name}
                    className="relative h-14 w-14 md:h-16 md:w-16 rounded-full object-cover ring-4 ring-white shadow-md shrink-0"
                  />
                </div>
                <div>
                  <p className="text-base md:text-lg font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-blue-600 font-semibold">{t.role}</p>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 shadow-sm border border-green-100">
                  <BadgeCheck className="h-4 w-4 text-green-600" />
                  Verified Review
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 md:-left-12 flex items-center h-full pointer-events-none">
            <button
              onClick={goToPrevious}
              className="pointer-events-auto flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full glass-panel shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95 group text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 md:-right-12 flex items-center h-full pointer-events-none">
            <button
              onClick={goToNext}
              className="pointer-events-auto flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full glass-panel shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95 group text-gray-600 hover:text-blue-600"
            >
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-10 flex items-center justify-center gap-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 w-8 shadow-sm'
                  : 'bg-gray-200 w-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Global Stats */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 sm:gap-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          
          {/* Rating */}
          <div className="glass-panel flex-1 min-w-[200px] max-w-[280px] rounded-3xl p-6 text-center shadow-md relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <Star className="h-6 w-6 fill-current" />
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="font-display text-4xl font-black text-gray-900">4.9</span>
              <span className="text-xl font-bold text-gray-400">/5</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Average Rating</p>
          </div>

          {/* Customers */}
          <div className="glass-panel flex-1 min-w-[200px] max-w-[280px] rounded-3xl p-6 text-center shadow-md relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="font-display text-4xl font-black text-gray-900">2,000</span>
              <span className="text-xl font-bold text-blue-500">+</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Happy Clients</p>
          </div>

          {/* Satisfaction */}
          <div className="glass-panel flex-1 min-w-[200px] max-w-[280px] rounded-3xl p-6 text-center shadow-md relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="font-display text-4xl font-black text-gray-900">100</span>
              <span className="text-xl font-bold text-emerald-500">%</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Satisfaction</p>
          </div>

        </div>

      </div>
    </section>
  );
}