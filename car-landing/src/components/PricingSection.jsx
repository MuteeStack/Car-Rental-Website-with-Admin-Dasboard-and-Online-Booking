// src/components/PricingSection.jsx
import { Check, ArrowRight, Car, Clock, Calendar, Sparkles, Plane, Heart, Mountain, Building2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pricingPlans = [
  {
    id: "daily",
    name: "Daily",
    description: "Perfect for short trips",
    icon: Clock,
    popular: false,
    categories: [
      {
        name: "Economy",
        cars: "Suzuki Alto, Cultus, WagonR",
        withDriver: "PKR 5,000",
        selfDrive: "PKR 3,500",
        features: ["Fuel not included", "200km limit/day", "AC included"]
      },
      {
        name: "Sedan",
        cars: "Toyota Corolla, Honda City, Civic",
        withDriver: "PKR 8,000",
        selfDrive: "PKR 6,000",
        features: ["Fuel not included", "250km limit/day", "Premium AC"],
        popular: true
      },
      {
        name: "SUV",
        cars: "Sportage, Tucson, Fortuner",
        withDriver: "PKR 15,000",
        selfDrive: "PKR 12,000",
        features: ["Fuel not included", "300km limit/day", "Luxury features"]
      },
      {
        name: "Luxury",
        cars: "Prado, Land Cruiser, Audi",
        withDriver: "PKR 35,000",
        selfDrive: "PKR 28,000",
        features: ["Fuel not included", "Unlimited km", "VIP treatment"]
      }
    ]
  },
  {
    id: "weekly",
    name: "Weekly",
    description: "Save 15% on weekly rentals",
    icon: Calendar,
    popular: true,
    discount: "15% OFF",
    categories: [
      {
        name: "Economy",
        cars: "Suzuki Alto, Cultus, WagonR",
        withDriver: "PKR 30,000",
        selfDrive: "PKR 21,000",
        features: ["Fuel not included", "1400km limit/week", "AC included"]
      },
      {
        name: "Sedan",
        cars: "Toyota Corolla, Honda City, Civic",
        withDriver: "PKR 48,000",
        selfDrive: "PKR 36,000",
        features: ["Fuel not included", "1750km limit/week", "Premium AC"],
        popular: true
      },
      {
        name: "SUV",
        cars: "Sportage, Tucson, Fortuner",
        withDriver: "PKR 90,000",
        selfDrive: "PKR 72,000",
        features: ["Fuel not included", "2100km limit/week", "Luxury features"]
      },
      {
        name: "Luxury",
        cars: "Prado, Land Cruiser, Audi",
        withDriver: "PKR 210,000",
        selfDrive: "PKR 168,000",
        features: ["Fuel not included", "Unlimited km", "VIP treatment"]
      }
    ]
  },
  {
    id: "monthly",
    name: "Monthly",
    description: "Best value for long-term",
    icon: Sparkles,
    popular: false,
    discount: "25% OFF",
    categories: [
      {
        name: "Economy",
        cars: "Suzuki Alto, Cultus, WagonR",
        withDriver: "PKR 100,000",
        selfDrive: "PKR 75,000",
        features: ["Fuel not included", "5000km limit/month", "AC included"]
      },
      {
        name: "Sedan",
        cars: "Toyota Corolla, Honda City, Civic",
        withDriver: "PKR 160,000",
        selfDrive: "PKR 120,000",
        features: ["Fuel not included", "6000km limit/month", "Premium AC"],
        popular: true
      },
      {
        name: "SUV",
        cars: "Sportage, Tucson, Fortuner",
        withDriver: "PKR 300,000",
        selfDrive: "PKR 240,000",
        features: ["Fuel not included", "7000km limit/month", "Luxury features"]
      },
      {
        name: "Luxury",
        cars: "Prado, Land Cruiser, Audi",
        withDriver: "PKR 700,000",
        selfDrive: "PKR 560,000",
        features: ["Fuel not included", "Unlimited km", "VIP treatment"]
      }
    ]
  }
];

const specialPackages = [
  {
    name: "Airport Transfer",
    price: "PKR 3,500",
    description: "One-way pickup/drop to Islamabad Airport",
    features: ["Meet & greet service", "Flight tracking", "Free waiting up to 1 hour"]
  },
  {
    name: "Wedding Package",
    price: "PKR 25,000",
    description: "Full day luxury car with decoration",
    features: ["Decorated vehicle", "Professional chauffeur", "Red carpet service"]
  },
  {
    name: "Murree Day Trip",
    price: "PKR 12,000",
    description: "Round trip to Murree with driver",
    features: ["Sedan/SUV options", "Experienced hill driver", "Flexible timing"]
  },
  {
    name: "Corporate Monthly",
    price: "Custom",
    description: "Dedicated vehicle for your business",
    features: ["Priority booking", "Dedicated driver", "Monthly billing"]
  }
];

export default function PricingSection() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("daily");
  const currentPlan = pricingPlans.find(p => p.id === selectedPlan);

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50 via-white to-transparent" />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl translate-x-1/3" />
        <div className="absolute bottom-10 left-0 h-[600px] w-[600px] rounded-full bg-indigo-100/30 blur-3xl -translate-x-1/4" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 px-2 animate-fade-up">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-gray-950">
            Transparent <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">Pricing</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            No hidden charges. Choose the plan that fits your needs perfectly.
          </p>
        </div>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-12 md:mb-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-panel p-2 rounded-2xl md:rounded-full flex flex-col sm:flex-row gap-2 w-full max-w-md sm:max-w-none sm:w-auto shadow-md">
            {pricingPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative px-6 py-3.5 md:py-4 rounded-xl md:rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base ${selectedPlan === plan.id
                    ? 'bg-gray-950 text-white shadow-xl shadow-gray-900/20 scale-[1.02]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                  }`}
              >
                <plan.icon className={`w-4 h-4 md:w-5 md:h-5 ${selectedPlan === plan.id ? 'text-blue-400' : ''}`} />
                {plan.name}
                {plan.discount && (
                  <span className={`absolute -top-3 -right-2 md:-right-4 text-[9px] md:text-[10px] px-2 py-1 rounded-full font-black tracking-widest shadow-sm ${selectedPlan === plan.id ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'bg-blue-100 text-blue-700'
                    }`}>
                    {plan.discount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-28 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {currentPlan.categories.map((category, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col ${category.popular
                  ? 'border-2 border-blue-500 shadow-[0_20px_40px_rgba(59,130,246,0.15)] z-10 scale-[1.02] md:scale-105'
                  : 'border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl'
                }`}
            >
              {category.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${category.popular ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                  <Car className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-gray-900">{category.name}</h3>
                  <p className="text-gray-500 text-xs md:text-sm line-clamp-1 font-medium">{category.cars}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-8">
                <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/50 transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50/30">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">With Driver</p>
                  <p className="text-xl md:text-2xl font-black text-gray-900">{category.withDriver}</p>
                </div>
                <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/50 transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50/30">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Self Drive</p>
                  <p className="text-xl md:text-2xl font-black text-gray-900">{category.selfDrive}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {category.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/book')}
                className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 text-sm shadow-md hover:shadow-lg active:scale-95 ${category.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'
                    : 'bg-gray-950 text-white hover:bg-gray-800 shadow-gray-900/20'
                  }`}
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Special Packages Section */}
        <div className="mt-24 md:mt-32">
          <div className="text-center mb-12 animate-fade-up">
            <h3 className="font-display text-3xl md:text-4xl font-black text-gray-900">Special Packages</h3>
            <p className="text-gray-600 mt-3 text-base md:text-lg font-medium">Curated experiences for your specific needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {specialPackages.map((pkg, i) => (
              <div
                key={i}
                className="group relative bg-gray-900 rounded-[2rem] p-6 md:p-8 text-white overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,23,42,0.3)]"
              >
                <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-transparent opacity-50" />
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-pink-500' : i === 2 ? 'bg-emerald-500' : 'bg-amber-500'}`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                      {i === 0 ? <Plane className="w-6 h-6 text-blue-400" /> : i === 1 ? <Heart className="w-6 h-6 text-pink-400" /> : i === 2 ? <Mountain className="w-6 h-6 text-emerald-400" /> : <Building2 className="w-6 h-6 text-amber-400" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight">{pkg.name}</h4>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-6 flex-1">{pkg.description}</p>

                  <div className="mb-6 pb-6 border-b border-white/10">
                    <p className="text-3xl font-black text-white font-display tracking-tight">{pkg.price}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-300 text-xs sm:text-sm font-medium">
                        <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate('/book')}
                    className="mt-auto w-full py-3.5 bg-white text-gray-950 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 shadow-lg active:scale-95 text-sm"
                  >
                    Book Package <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 md:mt-24 animate-fade-up">
          <div className="relative rounded-[3rem] p-10 md:p-16 overflow-hidden glass-panel border-white shadow-xl text-center">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/80 to-indigo-50/80 -z-10" />
            <h3 className="font-display text-2xl md:text-4xl font-black text-gray-900 mb-4">
              Need a Custom Quote?
            </h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto text-base md:text-lg font-medium">
              Planning a long trip or need multiple vehicles? Contact us for special corporate and bulk rates.
            </p>
            <button
              onClick={() => navigate('/book')}
              className="inline-flex items-center gap-3 bg-gray-950 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-gray-900/20 hover:bg-gray-800 transition-all duration-300 active:scale-95 text-sm md:text-base"
            >
              Contact Sales <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
