// src/components/FAQsSection.jsx
import { ChevronDown, ArrowRight, MessageCircleQuestion } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  { q: "Do you provide cars with driver?", a: "Yes! All our vehicles are available both with and without a professional driver. Our drivers are experienced, licensed, and know Rawalpindi & Islamabad routes perfectly." },
  { q: "What documents are required for renting a car?", a: "You need a valid CNIC (original) and a driving license. For self-drive, the license must be valid in Pakistan. For foreigners, an international driving permit + passport is required." },
  { q: "Are there any hidden charges?", a: "Absolutely not. The price we quote is final. Fuel, toll taxes, and parking are not included unless specified in a special package." },
  { q: "Can I rent a car for outstation trips (Murree, Nathiagali, etc.)?", a: "Yes! We offer special outstation packages. Popular routes include Islamabad → Murree, Naran, Swat, and Kashmir with customized pricing." },
  { q: "What is the minimum rental duration?", a: "Minimum rental is 24 hours (1 day). We also offer weekly and monthly plans with up to 25% discount." },
  { q: "Do you offer airport pickup and drop-off?", a: "Yes! We provide complimentary meet & greet service at Islamabad International Airport (ISB) for bookings with driver." },
  { q: "What happens if I return the car late?", a: "Late returns are charged on an hourly basis after a 2-hour grace period. We recommend informing us in advance to avoid extra charges." }
];

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-white" />
      <div className="absolute top-1/4 left-0 h-[500px] w-[500px] rounded-full bg-indigo-100/30 blur-3xl -translate-x-1/2 -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-indigo-50/80 border border-indigo-100/50 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm uppercase tracking-widest">
            <MessageCircleQuestion className="h-3.5 w-3.5 text-indigo-600" />
            Got Questions?
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight text-gray-950">
            Frequently Asked <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Everything you need to know before booking your ride with us.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 md:space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'shadow-lg border-blue-200 bg-white/90' : 'hover:shadow-md hover:bg-white/70'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left transition-colors"
              >
                <h3 className={`font-display text-lg md:text-xl font-bold pr-8 transition-colors ${openIndex === i ? 'text-blue-700' : 'text-gray-900'}`}>
                  {faq.q}
                </h3>
                <div className={`p-2 rounded-full transition-all duration-300 shrink-0 ${openIndex === i ? 'bg-blue-600 text-white shadow-md rotate-180' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </button>

              {/* Collapsible Answer */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium border-t border-gray-100 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative rounded-[2.5rem] p-10 md:p-14 overflow-hidden glass-panel-dark text-center border-gray-800 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />
            <h3 className="font-display text-2xl md:text-4xl font-black text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-base md:text-lg font-medium">
              Our support team is here to help. Reach out anytime and we'll get back to you within 30 minutes.
            </p>
            <a
              href="https://wa.me/923215466600"
              className="inline-flex items-center gap-3 bg-white text-gray-950 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-gray-100 hover:shadow-white/20 transition-all duration-300 active:scale-95 group text-sm md:text-base"
            >
              Chat on WhatsApp <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}