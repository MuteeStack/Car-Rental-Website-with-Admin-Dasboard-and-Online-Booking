// src/components/BookingModal.jsx
import { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Car, User, Phone, Mail, MessageSquare, Check, Loader2 } from 'lucide-react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const locations = ["Rawalpindi", "Islamabad", "Islamabad Airport"];
const rentalTypes = ["With Driver", "Self Drive"];

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  const [formData, setFormData] = useState({
    // Step 1: Trip Details
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    // Step 2: Car Selection
    selectedCar: '',
    rentalType: 'With Driver',
    // Step 3: Personal Info
    fullName: '',
    phone: '',
    email: '',
    cnic: '',
    specialRequests: '',
  });

  // Load cars from Firebase
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const q = query(collection(db, "cars"), orderBy("name"));
        const querySnapshot = await getDocs(q);
        const carsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCars(carsList);
        setLoadingCars(false);
      } catch (error) {
        console.error("Error loading cars:", error);
        setLoadingCars(false);
      }
    };

    if (isOpen) {
      fetchCars();
    }
  }, [isOpen]);

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
      // Save booking to Firebase
      await addDoc(collection(db, "bookings"), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });

      setIsSuccess(true);
      
      // Reset after 3 seconds and close
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setFormData({
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
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const isStep1Valid = formData.pickupLocation && formData.pickupDate && formData.dropoffDate;
  const isStep2Valid = formData.selectedCar && formData.rentalType;
  const isStep3Valid = formData.fullName && formData.phone;

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Full height on mobile, centered on desktop */}
      <div className="relative bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl md:m-4">
        {/* Header */}
        <div className="bg-gray-800 text-white px-5 md:px-8 py-4 md:py-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Book Your Car</h2>
            <p className="text-gray-300 text-xs md:text-sm mt-0.5 md:mt-1">Step {step} of 3</p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-gray-800 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Booking Submitted!</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Thank you! Our team will contact you within 30 minutes to confirm.
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              For immediate help, call <a href="tel:+923215466600" className="text-gray-800 font-bold">+92 321 5466600</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[65vh] md:max-h-[60vh]">
            {/* Step 1: Trip Details */}
            {step === 1 && (
              <div className="p-5 md:p-8 space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Trip Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Pickup Location *
                    </label>
                    <select
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                    >
                      <option value="">Select location</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Drop-off Location
                    </label>
                    <select
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                    >
                      <option value="">Same as pickup</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Pickup Date *
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      min={today}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Pickup Time
                    </label>
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Drop-off Date *
                    </label>
                    <input
                      type="date"
                      name="dropoffDate"
                      value={formData.dropoffDate}
                      onChange={handleChange}
                      min={formData.pickupDate || today}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Drop-off Time
                    </label>
                    <input
                      type="time"
                      name="dropoffTime"
                      value={formData.dropoffTime}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Car Selection */}
            {step === 2 && (
              <div className="p-5 md:p-8 space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Car className="w-5 h-5" /> Select Your Car
                </h3>

                {/* Rental Type Toggle */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">
                    Rental Type *
                  </label>
                  <div className="flex gap-2 md:gap-4">
                    {rentalTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rentalType: type }))}
                        className={`flex-1 py-2.5 md:py-3 px-3 md:px-6 rounded-xl font-medium transition border-2 text-sm md:text-base ${
                          formData.rentalType === type
                            ? 'border-gray-800 bg-gray-800 text-white'
                            : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Car Grid */}
                <div className="space-y-2 md:space-y-3 max-h-52 md:max-h-64 overflow-y-auto">
                  {loadingCars ? (
                    <div className="text-center py-6 md:py-8 text-gray-500">
                      <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin mx-auto mb-2" />
                      <span className="text-sm">Loading cars...</span>
                    </div>
                  ) : cars.length === 0 ? (
                    <div className="text-center py-6 md:py-8 text-gray-500 text-sm">
                      No cars available. Please contact us directly.
                    </div>
                  ) : (
                    cars.map(car => (
                      <button
                        key={car.id}
                        type="button"
                        onClick={() => handleCarSelect(car.id)}
                        className={`w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 transition text-left ${
                          formData.selectedCar === car.id
                            ? 'border-gray-800 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <img 
                          src={car.img} 
                          alt={car.name}
                          className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">{car.name}</h4>
                          <p className="text-xs md:text-sm text-gray-500">{car.type} • {car.seats || 5} seats</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-gray-900 text-sm md:text-base">
                            {formData.rentalType === 'With Driver' ? car.withDriver : car.withoutDriver}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-500">per day</p>
                        </div>
                        {formData.selectedCar === car.id && (
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Personal Info */}
            {step === 3 && (
              <div className="p-5 md:p-8 space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" /> Your Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="03XX XXXXXXX"
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Email (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      CNIC (Self Drive)
                    </label>
                    <input
                      type="text"
                      name="cnic"
                      value={formData.cnic}
                      onChange={handleChange}
                      placeholder="XXXXX-XXXXXXX-X"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition text-sm md:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    Special Requests
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 md:left-4 top-3 md:top-4 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Any special requests..."
                      className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition resize-none text-sm md:text-base"
                    />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-500">
                  By submitting, you agree to be contacted to confirm your booking.
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="px-5 md:px-8 py-4 md:py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 md:px-6 py-2.5 md:py-3 text-gray-600 font-medium hover:text-gray-800 transition text-sm md:text-base"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-gray-800 text-white rounded-full font-bold hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStep3Valid || isSubmitting}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-gray-800 text-white rounded-full font-bold hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      <span className="hidden md:inline">Submitting...</span>
                      <span className="md:hidden">Wait...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden md:inline">Submit Booking</span>
                      <span className="md:hidden">Submit</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
