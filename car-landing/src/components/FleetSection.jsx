// src/components/FleetSection.jsx
import { ArrowRight, Users, Fuel, Gauge, Calendar, ChevronDown, Star, Shield, Zap, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';

const brands = ["All Brands", "Toyota", "Honda", "KIA", "Hyundai", "Suzuki", "MG"];
const types = ["All Types", "Sedan", "SUV", "Pickup", "Crossover", "Hatchback", "Electric SUV", "Luxury SUV"];
const locations = ["Rawalpindi", "Islamabad", "Airport"];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <div className="h-64 bg-gray-200 animate-pulse" />
      <div className="p-8 space-y-4 flex-1">
        <div className="h-7 w-2/3 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse" />
        <div className="grid grid-cols-2 gap-3 mt-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
        <div className="h-16 bg-gray-100 rounded-2xl mt-6 animate-pulse" />
        <div className="h-12 bg-gray-200 rounded-full mt-6 animate-pulse" />
      </div>
    </div>
  );
}

function Dropdown({ label, items, selected, onSelect, openDropdown, setOpenDropdown, setVisibleCount }) {
  const isOpen = openDropdown === label;
  
  return (
    <div className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpenDropdown(isOpen ? null : label)}
        className="w-full sm:w-[200px] glass-panel px-6 py-4 rounded-full flex items-center justify-between text-gray-800 font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      >
        <span className="truncate">{selected}</span>
        <ChevronDown
          className={`w-5 h-5 ml-3 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
          <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 glass-panel rounded-2xl shadow-2xl z-50 overflow-hidden animate-scale-in origin-top">
            <div className="max-h-64 overflow-y-auto hide-scrollbar py-2">
              {items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onSelect(item);
                    setOpenDropdown(null);
                    setVisibleCount(6);
                  }}
                  className={`w-full text-left px-6 py-3 transition-all duration-200 font-medium ${
                    selected === item
                      ? 'bg-blue-50/80 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:pl-8 hover:text-gray-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CarCard({ car, index, navigate }) {
  const [hovered, setHovered] = useState(false);
  const delay = `${(index % 3) * 100}ms`;

  return (
    <div
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 flex flex-col animate-fade-up"
      style={{ animationDelay: delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <img
          src={car.img}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-4 right-4 glass-panel bg-white/90 text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
          {car.year || "2025"}
        </div>
        
        <div className="absolute bottom-4 left-4 glass-panel-dark text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md">
          {car.type}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="mb-6">
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{car.name}</h3>
          <div className="flex items-center gap-2">
            <div className={`h-0.5 bg-blue-600 rounded-full transition-all duration-500 ${hovered ? 'w-10' : 'w-6'}`} />
            <span className="text-sm text-gray-500 font-semibold">{car.brand || 'Premium'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8 text-sm text-gray-600">
          {[
            { icon: Users, label: `${car.seats || 5} Seats` },
            { icon: Gauge, label: car.transmission || "Auto" },
            { icon: Fuel, label: car.fuel || "Petrol" },
            { icon: Calendar, label: "Brand New" },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 transition-colors group-hover:bg-blue-50/50">
              <Icon className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-xs sm:text-sm">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-3 mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs sm:text-sm font-medium">With Driver</span>
            <span className="text-lg sm:text-xl font-black text-gray-900 transition-colors group-hover:text-blue-600">{car.withDriver || "PKR 12,000/d"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs sm:text-sm font-medium">Self Drive</span>
            <span className="text-lg sm:text-xl font-black text-gray-900 transition-colors group-hover:text-blue-600">{car.withoutDriver || "PKR 9,000/d"}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/book')}
          className="relative overflow-hidden w-full bg-gray-950 text-white font-bold py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 active:scale-95 group/btn"
        >
          <span className="relative z-10 flex items-center gap-2">Book Now <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" /></span>
        </button>
      </div>
    </div>
  );
}

export default function FleetSection() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLocation, setSelectedLocation] = useState("Rawalpindi");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [filterKey, setFilterKey] = useState(0);

  const gridRef = useRef(null);
  const previousCountRef = useRef(0);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeadingVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const q = query(collection(db, "cars"), orderBy("name"));
        const snapshot = await getDocs(q);
        setCars(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error loading cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleBrandChange = (v) => { setSelectedBrand(v); setFilterKey(k => k + 1); setVisibleCount(6); };
  const handleTypeChange  = (v) => { setSelectedType(v);  setFilterKey(k => k + 1); setVisibleCount(6); };

  const filteredCars  = cars.filter(car => {
    const matchBrand = selectedBrand === "All Brands" || car.brand === selectedBrand;
    const matchType  = selectedType  === "All Types"  || car.type  === selectedType;
    return matchBrand && matchType;
  });

  const displayedCars = filteredCars.slice(0, visibleCount);

  const loadMore = () => {
    previousCountRef.current = visibleCount;
    setVisibleCount(prev => Math.min(prev + 3, filteredCars.length));
    setTimeout(() => {
      const children = gridRef.current?.children;
      children?.[previousCountRef.current]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const dropdownProps = { openDropdown, setOpenDropdown, setVisibleCount };

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.05)_0%,_transparent_70%)] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,_rgba(15,23,42,0.03)_0%,_transparent_70%)] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Heading Section */}
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-100/50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" /> Latest 2025 Models
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-gray-950">
            Our <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">Premium</span> Fleet
          </h2>

          <div className="h-1.5 w-16 bg-blue-600 rounded-full mx-auto mb-6" />

          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-medium">
            Hand-picked 2025 models • Available in Rawalpindi & Islamabad
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: Star, label: '4.9★ Rated' },
              { icon: Shield, label: 'Fully Insured' },
              { icon: Zap, label: '24/7 Support' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="glass-panel flex items-center gap-2 text-gray-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-transform hover:-translate-y-1">
                <Icon className="w-4 h-4 text-blue-600" /> {label}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className={`flex flex-col md:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-200 ease-out ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Dropdown label="Brand" items={brands} selected={selectedBrand} onSelect={handleBrandChange} {...dropdownProps} />
            <Dropdown label="Type" items={types} selected={selectedType} onSelect={handleTypeChange} {...dropdownProps} />
            <Dropdown label="Location" items={locations} selected={selectedLocation} onSelect={setSelectedLocation} {...dropdownProps} />
          </div>
          <button
            onClick={() => navigate('/book')}
            className="w-full sm:w-auto mt-4 md:mt-0 bg-gray-950 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-gray-900/20 text-sm border-2 border-gray-900 hover:bg-white hover:text-gray-950 transition-all duration-300 active:scale-95 text-center whitespace-nowrap"
          >
            Find Vehicles
          </button>
        </div>

        {/* Results Info */}
        <div className="text-center mb-10">
          <p key={filterKey} className="text-sm text-gray-500 font-medium animate-fade-up">
            Showing <span className="font-black text-gray-900 text-lg">{displayedCars.length}</span> of <span className="font-bold text-gray-700">{filteredCars.length}</span> vehicles
            {selectedLocation && selectedLocation !== "Airport" && (
              <span className="ml-3 inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" /> {selectedLocation}
              </span>
            )}
          </p>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-24 animate-fade-in bg-gray-50 rounded-[3rem] border border-gray-100">
            <p className="text-6xl mb-6">🚗</p>
            <p className="text-2xl font-black text-gray-900 mb-2 font-display">No vehicles found</p>
            <p className="text-gray-500 font-medium">Try a different brand or type filter</p>
            <button onClick={() => { setSelectedBrand("All Brands"); setSelectedType("All Types"); }} className="mt-6 text-blue-600 font-bold hover:underline">Reset Filters</button>
          </div>
        ) : (
          <div key={filterKey} ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCars.map((car, i) => (
              <CarCard key={car.id || i} car={car} index={i} navigate={navigate} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && visibleCount < filteredCars.length && (
          <div className="text-center mt-16 animate-fade-up">
            <button
              onClick={loadMore}
              className="group inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold text-sm shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              See More Vehicles
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </button>
            <p className="text-xs font-semibold text-gray-400 mt-4 tracking-wide uppercase">
              {filteredCars.length - visibleCount} more available
            </p>
          </div>
        )}

        {/* Final CTA */}
        <div className="mt-28 relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50 blur-2xl" />
          <div className="glass-panel rounded-[3rem] p-10 md:p-16 text-center max-w-4xl mx-auto shadow-xl">
            <p className="font-display text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Wedding, tour, or business?
            </p>
            <p className="text-gray-600 mb-10 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              We've got the perfect car waiting for you. Get a custom quote tailored to your specific needs.
            </p>
            <button
              onClick={() => navigate('/book')}
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-bold shadow-xl shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 active:scale-95 animate-pulse-soft"
            >
              Get a Free Quote <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}