// src/pages/BookingPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X, Calendar, MapPin, Car, User, Phone, Mail, MessageSquare,
  Check, Loader2, ArrowRight, ArrowLeft, ChevronRight, Shield, Clock, Sparkles
} from 'lucide-react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';

const locations = ["Rawalpindi", "Islamabad", "Islamabad Airport"];
const rentalTypes = ["With Driver", "Self Drive"];

const steps = [
  { number: 1, title: "Trip Details", subtitle: "Where & when", icon: MapPin },
  { number: 2, title: "Select Car", subtitle: "Choose your ride", icon: Car },
  { number: 3, title: "Your Info", subtitle: "Almost done!", icon: User },
];

export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    selectedCar: '',
    rentalType: 'With Driver',
    fullName: '',
    phone: '',
    email: '',
    cnic: '',
    specialRequests: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const q = query(collection(db, "cars"), orderBy("name"));
        const querySnapshot = await getDocs(q);
        setCars(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error loading cars:", error);
      } finally {
        setLoadingCars(false);
      }
    };
    fetchCars();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCarSelect = (carId) => {
    setFormData(prev => ({ ...prev, selectedCar: carId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStep1Valid = formData.pickupLocation && formData.pickupDate && formData.dropoffDate;
  const isStep2Valid = formData.selectedCar && formData.rentalType;
  const isStep3Valid = formData.fullName && formData.phone;
  const today = new Date().toISOString().split('T')[0];

  // ── Success State ──
  if (isSuccess) {
    return (
      <div
        className="min-h-screen text-gray-900"
        style={{ background: 'radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(248,250,252,0.98) 38%, rgba(226,232,240,0.9) 100%)' }}
      >
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="glass-panel rounded-[3rem] p-12 md:p-20 text-center max-w-lg w-full shadow-2xl animate-scale-in">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30 animate-pulse-soft">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900 mb-4">Booking Submitted!</h2>
            <p className="text-gray-600 mb-8 text-base md:text-lg font-medium leading-relaxed">
              Thank you! Our team will contact you within <span className="font-black text-gray-900">30 minutes</span> to confirm your booking.
            </p>
            <p className="text-sm text-gray-500 mb-10">
              For immediate help, call <a href="tel:+923215466600" className="text-blue-600 font-bold hover:underline">+92 321 5466600</a>
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-gray-950 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-gray-800 transition-all duration-300 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{ background: 'radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(248,250,252,0.98) 38%, rgba(226,232,240,0.9) 100%)' }}
    >
      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-8 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60 mix-blend-multiply bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100/50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm uppercase tracking-widest animate-fade-up">
            <Sparkles className="w-3.5 h-3.5" /> Quick & Easy Booking
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-gray-950 mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Book Your <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Perfect Ride</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-medium animate-fade-up" style={{ animationDelay: '0.15s' }}>
            Complete your booking in just 3 simple steps
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-8 mb-12 relative z-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <div className="glass-panel rounded-2xl md:rounded-full p-3 md:p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0">
          {steps.map((s, i) => {
            const isActive = step === s.number;
            const isCompleted = step > s.number;
            const Icon = s.icon;
            return (
              <div key={s.number} className="flex items-center flex-1">
                <button
                  onClick={() => {
                    if (isCompleted) setStep(s.number);
                  }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl md:rounded-full flex-1 transition-all duration-300 ${
                    isActive
                      ? 'bg-gray-950 text-white shadow-lg shadow-gray-900/20'
                      : isCompleted
                        ? 'bg-emerald-50 text-emerald-700 cursor-pointer hover:bg-emerald-100'
                        : 'text-gray-400'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-white text-gray-950'
                      : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : s.number}
                  </div>
                  <div className="text-left">
                    <div className={`text-sm font-bold ${isActive ? 'text-white' : isCompleted ? 'text-emerald-700' : 'text-gray-400'}`}>{s.title}</div>
                    <div className={`text-[10px] font-medium ${isActive ? 'text-gray-300' : isCompleted ? 'text-emerald-500' : 'text-gray-300'}`}>{s.subtitle}</div>
                  </div>
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 mx-2 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pb-24">
        <form onSubmit={handleSubmit}>

          {/* ─── Step 1: Trip Details ─── */}
          {step === 1 && (
            <div className="animate-fade-up">
              <div className="glass-panel rounded-[2rem] p-8 md:p-12 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-display">Trip Details</h2>
                    <p className="text-sm text-gray-500 font-medium">Tell us where and when you need the car</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pickup Location <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition bg-white text-sm font-medium"
                      >
                        <option value="">Select location</option>
                        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Drop-off Location</label>
                      <select
                        name="dropoffLocation"
                        value={formData.dropoffLocation}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition bg-white text-sm font-medium"
                      >
                        <option value="">Same as pickup</option>
                        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pickup Date <span className="text-red-500">*</span>
                      </label>
                      <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} min={today} required
                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition bg-white text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Time</label>
                      <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange}
                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition bg-white text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Drop-off Date <span className="text-red-500">*</span>
                      </label>
                      <input type="date" name="dropoffDate" value={formData.dropoffDate} onChange={handleChange} min={formData.pickupDate || today} required
                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition bg-white text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Drop-off Time</label>
                      <input type="time" name="dropoffTime" value={formData.dropoffTime} onChange={handleChange}
                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition bg-white text-sm font-medium" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: Shield, label: "Fully Insured", color: "text-emerald-500" },
                  { icon: Clock, label: "24/7 Support", color: "text-blue-500" },
                  { icon: Sparkles, label: "Best Prices", color: "text-amber-500" },
                ].map(({ icon: Icon, label, color }, i) => (
                  <div key={i} className="glass-panel flex items-center gap-2 text-gray-700 text-xs font-bold px-4 py-2 rounded-full">
                    <Icon className={`w-4 h-4 ${color}`} /> {label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Step 2: Car Selection ─── */}
          {step === 2 && (
            <div className="animate-fade-up">
              <div className="glass-panel rounded-[2rem] p-8 md:p-12 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-display">Select Your Car</h2>
                    <p className="text-sm text-gray-500 font-medium">Choose the perfect vehicle for your trip</p>
                  </div>
                </div>

                {/* Rental Type Toggle */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Rental Type</label>
                  <div className="flex gap-3">
                    {rentalTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rentalType: type }))}
                        className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 border-2 text-sm ${
                          formData.rentalType === type
                            ? 'border-gray-950 bg-gray-950 text-white shadow-lg shadow-gray-900/20'
                            : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Car Grid */}
                <div className="space-y-3 max-h-[50vh] overflow-y-auto hide-scrollbar pr-1">
                  {loadingCars ? (
                    <div className="text-center py-12 text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
                      <span className="text-sm font-medium">Loading available cars...</span>
                    </div>
                  ) : cars.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-sm">
                      No cars available. Please contact us directly.
                    </div>
                  ) : (
                    cars.map(car => (
                      <button
                        key={car.id}
                        type="button"
                        onClick={() => handleCarSelect(car.id)}
                        className={`w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 text-left group ${
                          formData.selectedCar === car.id
                            ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10'
                            : 'border-gray-200 hover:border-gray-400 bg-white hover:shadow-md'
                        }`}
                      >
                        <img
                          src={car.img}
                          alt={car.name}
                          className="w-20 h-14 md:w-24 md:h-16 object-cover rounded-xl"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">{car.name}</h4>
                          <p className="text-xs md:text-sm text-gray-500 font-medium">{car.type} • {car.seats || 5} seats • {car.transmission || 'Auto'}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-black text-gray-900 text-sm md:text-base">
                            {formData.rentalType === 'With Driver' ? car.withDriver : car.withoutDriver}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-500 font-medium">per day</p>
                        </div>
                        {formData.selectedCar === car.id && (
                          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 3: Personal Info ─── */}
          {step === 3 && (
            <div className="animate-fade-up">
              <div className="glass-panel rounded-[2rem] p-8 md:p-12 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-display">Your Information</h2>
                    <p className="text-sm text-gray-500 font-medium">Just a few details to finalize your booking</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full name"
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-sm font-medium bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="03XX XXXXXXX"
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-sm font-medium bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-sm font-medium bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CNIC (Self Drive)</label>
                      <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} placeholder="XXXXX-XXXXXXX-X"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-sm font-medium bg-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows={3} placeholder="Any special requests or notes..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition resize-none text-sm font-medium bg-white" />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 font-medium">
                    By submitting, you agree to be contacted to confirm your booking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── Navigation Buttons ─── */}
          <div className="flex items-center justify-between mt-8 gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300 text-sm glass-panel shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300 text-sm glass-panel shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> Home
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-950 text-white rounded-full font-bold shadow-xl shadow-gray-900/20 hover:bg-gray-800 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 text-sm"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStep3Valid || isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 text-sm"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Booking <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
