// src/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword, createUserWithEmailAndPassword } from "firebase/auth";
import { CarFront, LogOut, Pencil, PlusCircle, ShieldCheck, Trash2, Wallet, Calendar, MapPin, Phone, Mail, Check, X, Users, Lock, AlertCircle, Package } from 'lucide-react';
import { defaultHeroSettings, mergeHeroSettings } from './constants/heroDefaults';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4">
      <div className={`rounded-2xl border px-5 py-3.5 text-center text-sm font-semibold shadow-xl backdrop-blur-sm
        ${type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}
      >
        {message}
      </div>
    </div>
  );
};

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('fleet');
  const [toast, setToast] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [heroSettings, setHeroSettings] = useState(defaultHeroSettings);
  const [users, setUsers] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminConfirmPassword, setNewAdminConfirmPassword] = useState("");
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 4500);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [year, setYear] = useState("2025");
  const [type, setType] = useState("Sedan");
  const [brand, setBrand] = useState("Honda");
  const [seats, setSeats] = useState("5");
  const [transmission, setTransmission] = useState("Automatic");
  const [fuel, setFuel] = useState("Petrol");
  const [withDriver, setWithDriver] = useState("");
  const [withoutDriver, setWithoutDriver] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchCars();
        fetchBookings();
        fetchHeroSettings();
        fetchUsers();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchHeroSettings = async () => {
    try {
      const snapshot = await getDoc(doc(db, 'siteContent', 'hero'));
      if (snapshot.exists()) {
        setHeroSettings(mergeHeroSettings(snapshot.data()));
      } else {
        setHeroSettings(defaultHeroSettings);
      }
    } catch (error) {
      showToast('Failed to load hero settings', 'error');
    }
  };

  const updateHeroSetting = (key, value) => {
    setHeroSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveHeroSettings = async (e) => {
    e.preventDefault();

    const cleanedSettings = Object.fromEntries(
      Object.entries(heroSettings).map(([key, value]) => [key, String(value).trim()])
    );

    if (!cleanedSettings.headingLine1 || !cleanedSettings.headingLine2 || !cleanedSettings.description) {
      showToast('Please fill hero title and description fields', 'error');
      return;
    }

    try {
      await setDoc(doc(db, 'siteContent', 'hero'), {
        ...cleanedSettings,
        updatedAt: new Date(),
      });
      setHeroSettings(mergeHeroSettings(cleanedSettings));
      showToast('Hero section settings updated');
    } catch (error) {
      showToast('Failed to save hero settings', 'error');
    }
  };

  const resetHeroDefaults = async () => {
    setHeroSettings(defaultHeroSettings);
    try {
      await setDoc(doc(db, 'siteContent', 'hero'), {
        ...defaultHeroSettings,
        updatedAt: new Date(),
      });
      showToast('Hero section reset to defaults');
    } catch (error) {
      showToast('Failed to reset hero settings', 'error');
    }
  };

  const fetchCars = async () => {
    try {
      const snapshot = await getDocs(collection(db, "cars"));
      const carList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCars(carList);
    } catch (err) {
      showToast("Failed to load cars", "error");
    }
  };

  const fetchBookings = async () => {
    try {
      const snapshot = await getDocs(collection(db, "bookings"));
      const bookingList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
      setBookings(bookingList);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      showToast("Failed to load bookings", "error");
    }
  };

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    } catch (err) {
      console.error("Failed to load users:", err);
      showToast("Failed to load users", "error");
    }
  };

  const makeUserAdmin = async (e) => {
    e.preventDefault();
    
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      showToast("Please enter email and password", "error");
      return;
    }

    if (newAdminPassword !== newAdminConfirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    if (newAdminPassword.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    setCreatingAdmin(true);
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, newAdminEmail, newAdminPassword);
      const newUser = userCredential.user;

      // Add user to Firestore with admin role
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        email: newAdminEmail,
        role: "admin",
        createdAt: new Date(),
        createdBy: user.email
      });

      showToast(`Admin user ${newAdminEmail} created successfully!`);
      setNewAdminEmail("");
      setNewAdminPassword("");
      setNewAdminConfirmPassword("");
      fetchUsers();
    } catch (error) {
      console.error("Error creating admin:", error);
      if (error.code === 'auth/email-already-in-use') {
        showToast("Email already in use", "error");
      } else if (error.code === 'auth/invalid-email') {
        showToast("Invalid email address", "error");
      } else {
        showToast("Failed to create admin user", "error");
      }
    } finally {
      setCreatingAdmin(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("All fields are required", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    try {
      // Re-authenticate user with current password
      const credential = await signInWithEmailAndPassword(auth, user.email, currentPassword);
      
      // Update password
      await updatePassword(credential.user, newPassword);

      // Sign out from all sessions
      await signOut(auth);

      showToast("Password changed successfully. Please log in again.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        showToast("Current password is incorrect", "error");
      } else {
        console.error("Error changing password:", error);
        showToast("Failed to change password", "error");
      }
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      showToast("Wrong email or password!", "error");
    }
  };

  const logout = () => signOut(auth);

  const startEdit = (car) => {
    setEditingCar(car.id);
    setName(car.name);
    setYear(car.year);
    setType(car.type);
    setBrand(car.brand);
    setSeats(car.seats.toString());
    setTransmission(car.transmission);
    setFuel(car.fuel);
    setWithDriver(car.withDriver);
    setWithoutDriver(car.withoutDriver);
    setImg(car.img);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingCar(null);
    resetForm();
  };

  const resetForm = () => {
    setName(""); setYear("2025"); setType("Sedan"); setBrand("Honda");
    setSeats("5"); setTransmission("Automatic"); setFuel("Petrol");
    setWithDriver(""); setWithoutDriver(""); setImg("");
  };

  const saveCar = async (e) => {
    e.preventDefault();

    if (!name || !img || !withDriver || !withoutDriver) {
      showToast("Please fill all required fields!", "error");
      return;
    }

    // Function to automatically format price with PKR and /day
    const formatPrice = (amount) => {
      const num = parseFloat(amount);
      if (isNaN(num) || num <= 0) {
        return null;
      }
      return `PKR ${num.toLocaleString()}/day`;
    };

    const formattedWithDriver = formatPrice(withDriver);
    const formattedWithoutDriver = formatPrice(withoutDriver);

    if (!formattedWithDriver || !formattedWithoutDriver) {
      showToast("Please enter valid price values for both With Driver and Self Drive", "error");
      return;
    }

    try {
      const carData = {
        name: name.trim(),
        year,
        brand,
        type,
        seats: Number(seats),
        transmission,
        fuel,
        withDriver: formattedWithDriver,        // Automatically formatted as "PKR 12,000/day"
        withoutDriver: formattedWithoutDriver, // Automatically formatted as "PKR 8,000/day"
        img: img.trim(),
      };

      if (editingCar) {
        await updateDoc(doc(db, "cars", editingCar), carData);
        showToast("Car updated successfully!");
        setEditingCar(null);
      } else {
        await addDoc(collection(db, "cars"), { ...carData, addedAt: new Date() });
        showToast("Car added successfully!");
      }

      resetForm();
      fetchCars();
    } catch (error) {
      console.error(error);
      showToast("Operation failed", "error");
    }
  };

  const deleteCar = async (id) => {
    if (!window.confirm("Delete this car permanently?")) return;
    try {
      await deleteDoc(doc(db, "cars", id));
      showToast("Car deleted successfully");
      fetchCars();
    } catch (error) {
      showToast("Delete failed", "error");
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: newStatus
      });
      showToast(`Booking ${newStatus} successfully`);
      fetchBookings();
    } catch (error) {
      showToast("Failed to update booking status", "error");
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Delete this booking permanently?")) return;
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      showToast("Booking deleted successfully");
      fetchBookings();
    } catch (error) {
      showToast("Failed to delete booking", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_50%)] bg-slate-50">
        <div className="rounded-3xl border border-slate-200 bg-white/90 px-8 py-6 text-slate-900 shadow-lg backdrop-blur">
          <p className="text-base font-semibold tracking-wide">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_38%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#f8fafc_100%)] px-4 py-10">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-lg backdrop-blur sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Admin Access</h2>
          <p className="mt-2 text-sm text-slate-600">Secure dashboard login for fleet management</p>
        </div>

        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="admin@elite.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-md hover:shadow-lg"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_38%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <CarFront className="h-3.5 w-3.5" /> Fleet Control
                </div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Admin Dashboard</h1>
                <p className="mt-2 text-sm text-slate-600">Manage vehicles, prices, and listing updates in one place.</p>
                <p className="mt-1 text-xs text-slate-500">Signed in as <span className="font-semibold text-slate-700">{user.email}</span></p>
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-slate-500">Total Cars</p>
                <p className="mt-1 text-2xl font-black text-slate-900">{cars.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-slate-500">Total Bookings</p>
                <p className="mt-1 text-2xl font-black text-slate-900">{bookings.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-slate-500">Pricing</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Wallet className="h-4 w-4" /> PKR/day format
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-2 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('fleet')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'fleet'
                    ? 'border-b-2 border-slate-900 text-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <CarFront className="mb-1 inline h-4 w-4" /> Fleet Management
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'bookings'
                    ? 'border-b-2 border-slate-900 text-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Calendar className="mb-1 inline h-4 w-4" /> Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-slate-900 text-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Lock className="mb-1 inline h-4 w-4" /> Settings
              </button>
            </div>
          </div>

          {activeTab === 'fleet' && (
          <>
          <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
            <h2 className="mb-6 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {editingCar ? "Edit Car" : "Add New Car"}
            </h2>
            <form onSubmit={saveCar} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input placeholder="Car Name" value={name} onChange={e => setName(e.target.value)} required className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500" />
              <input placeholder="Image URL" value={img} onChange={e => setImg(e.target.value)} required className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500" />
              <input 
                type="number" 
                placeholder="With Driver Price (e.g. 12000)" 
                value={withDriver} 
                onChange={e => setWithDriver(e.target.value)} 
                required 
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500" 
              />
              <input 
                type="number" 
                placeholder="Self Drive Price (e.g. 8000)" 
                value={withoutDriver} 
                onChange={e => setWithoutDriver(e.target.value)} 
                required 
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500" 
              />

              <select value={brand} onChange={e => setBrand(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500">
                <option>Honda</option><option>Toyota</option><option>KIA</option><option>Suzuki</option><option>MG</option><option>Hyundai</option>
              </select>
              <select value={type} onChange={e => setType(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500">
                <option>Sedan</option><option>SUV</option><option>Crossover</option><option>Hatchback</option><option>Pickup</option><option>Luxury SUV</option>
              </select>
              <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500" />
              <input placeholder="Seats" value={seats} onChange={e => setSeats(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500" />
              <select value={transmission} onChange={e => setTransmission(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500">
                <option>Automatic</option><option>Manual</option>
              </select>
              <select value={fuel} onChange={e => setFuel(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500">
                <option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
              </select>

              <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                  {editingCar ? <Pencil className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                  {editingCar ? "Update Car" : "Add Car"}
                </button>
                {editingCar && (
                  <button type="button" onClick={cancelEdit} className="rounded-xl border border-slate-300 bg-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Hero Section Settings</h2>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">First Section</span>
            </div>

            <form onSubmit={saveHeroSettings} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                placeholder="Hero image URL"
                value={heroSettings.heroImageUrl}
                onChange={(e) => updateHeroSetting('heroImageUrl', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                placeholder="Hero image alt text"
                value={heroSettings.heroImageAlt}
                onChange={(e) => updateHeroSetting('heroImageAlt', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              
              <input
                placeholder="Price label"
                value={heroSettings.priceLabel}
                onChange={(e) => updateHeroSetting('priceLabel', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                placeholder="Price value"
                value={heroSettings.priceValue}
                onChange={(e) => updateHeroSetting('priceValue', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                placeholder="Price unit"
                value={heroSettings.priceUnit}
                onChange={(e) => updateHeroSetting('priceUnit', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />

              <input
                placeholder="Driver tag title"
                value={heroSettings.driverTagTitle}
                onChange={(e) => updateHeroSetting('driverTagTitle', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                placeholder="Driver tag value"
                value={heroSettings.driverTagValue}
                onChange={(e) => updateHeroSetting('driverTagValue', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />

              <input
                placeholder="Pickup tag title"
                value={heroSettings.pickupTagTitle}
                onChange={(e) => updateHeroSetting('pickupTagTitle', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                placeholder="Pickup tag value"
                value={heroSettings.pickupTagValue}
                onChange={(e) => updateHeroSetting('pickupTagValue', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />

              <input
                placeholder="Area tag title"
                value={heroSettings.areaTagTitle}
                onChange={(e) => updateHeroSetting('areaTagTitle', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                placeholder="Area tag value"
                value={heroSettings.areaTagValue}
                onChange={(e) => updateHeroSetting('areaTagValue', e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />

              <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Save Hero Settings
                </button>
                <button
                  type="button"
                  onClick={resetHeroDefaults}
                  className="rounded-xl border border-slate-300 bg-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Reset Defaults
                </button>
              </div>
            </form>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Current Fleet</h2>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">{cars.length} Vehicles</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map(car => (
              <div key={car.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative">
                  <img src={car.img} alt={car.name} className="h-52 w-full object-contain" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">{car.type}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-slate-900">{car.name}</h3>
                  <p className="text-sm text-slate-600">{car.brand} • {car.year}</p>
                  <div className="mt-3 space-y-1 text-sm text-slate-700">
                    <p><strong>Seats:</strong> {car.seats} • <strong>Fuel:</strong> {car.fuel}</p>
                    <p><strong>With Driver:</strong> {car.withDriver}</p>
                    <p><strong>Self Drive:</strong> {car.withoutDriver}</p>
                  </div>
                  <div className="mt-5 flex gap-2.5">
                    <button onClick={() => startEdit(car)} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-sky-600 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700">
                      <Pencil className="h-4 w-4" /> Edit
                    </button>
                    <button onClick={() => deleteCar(car.id)} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cars.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
              <Package className="mx-auto mb-4 h-12 w-12 text-slate-300" />
              <p className="text-lg font-semibold text-slate-500">No cars in fleet yet. Add one above.</p>
            </div>
          )}
          </>
          )}

          {activeTab === 'bookings' && (
          <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
            <h2 className="mb-6 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Booking Applications</h2>
            
            {bookings.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-slate-300" />
                <p className="text-lg font-semibold text-slate-500">No booking applications yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => {
                  const carName = cars.find(c => c.id === booking.selectedCar)?.name || 'Unknown Car';
                  const bookingDate = booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'N/A';

                  const statusColors = {
                    pending: 'bg-amber-50 border-amber-200 text-amber-700',
                    approved: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                    rejected: 'bg-rose-50 border-rose-200 text-rose-700'
                  };

                  return (
                    <div key={booking.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
                      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{booking.fullName}</h3>
                          <p className="text-sm text-slate-600">Applied on {bookingDate}</p>
                        </div>
                        <span className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${statusColors[booking.status] || statusColors.pending}`}>
                          {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending'}
                        </span>
                      </div>

                      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-slate-500">Car Selected</p>
                          <p className="text-sm font-semibold text-slate-900">{carName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-slate-500">Rental Type</p>
                          <p className="text-sm font-semibold text-slate-900">{booking.rentalType}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-slate-500">Pickup Date & Time</p>
                          <p className="text-sm font-semibold text-slate-900">{booking.pickupDate} • {booking.pickupTime}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-slate-500">Dropoff Date & Time</p>
                          <p className="text-sm font-semibold text-slate-900">{booking.dropoffDate} • {booking.dropoffTime}</p>
                        </div>
                      </div>

                      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-slate-500">Pickup Location</p>
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <MapPin className="h-4 w-4" /> {booking.pickupLocation}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-slate-500">Dropoff Location</p>
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <MapPin className="h-4 w-4" /> {booking.dropoffLocation}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-slate-500">Phone</p>
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Phone className="h-4 w-4" /> {booking.phone}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase text-slate-500">Email</p>
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Mail className="h-4 w-4" /> {booking.email}
                          </div>
                        </div>
                      </div>

                      <div className="mb-5 space-y-2 rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase text-slate-500">CNIC</p>
                        <p className="text-sm font-mono text-slate-700">{booking.cnic}</p>
                      </div>

                      {booking.specialRequests && (
                        <div className="mb-5 space-y-2 rounded-lg bg-blue-50 p-3">
                          <p className="text-xs font-semibold uppercase text-blue-600">Special Requests</p>
                          <p className="text-sm text-blue-900">{booking.specialRequests}</p>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'approved')}
                          disabled={booking.status === 'approved'}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Check className="h-4 w-4" /> Approve
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'rejected')}
                          disabled={booking.status === 'rejected'}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X className="h-4 w-4" /> Reject
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )}

          {activeTab === 'settings' && (
          <>
          <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
            <h2 className="mb-6 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">User Management</h2>
            <div className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <p className="mb-4 text-sm font-semibold text-sky-900">Create New Admin User</p>
              <form onSubmit={makeUserAdmin} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <input
                  type="email"
                  placeholder="Admin email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  required
                  className="rounded-xl border border-sky-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-sky-500"
                />
                <input
                  type="password"
                  placeholder="Password (min 6 chars)"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  required
                  className="rounded-xl border border-sky-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-sky-500"
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={newAdminConfirmPassword}
                  onChange={(e) => setNewAdminConfirmPassword(e.target.value)}
                  required
                  className="rounded-xl border border-sky-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-sky-500"
                />
                <button
                  type="submit"
                  disabled={creatingAdmin}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Users className="h-4 w-4" /> {creatingAdmin ? 'Creating...' : 'Create Admin'}
                </button>
              </form>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Current Admins</h3>
              {users.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center">
                  <p className="text-sm text-slate-600">No users found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {users.filter(u => u.role === 'admin').map(adminUser => (
                    <div key={adminUser.uid || adminUser.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900">
                          <ShieldCheck className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{adminUser.email}</p>
                          <p className="text-xs text-slate-500">Admin {adminUser.createdBy ? `• Created by ${adminUser.createdBy}` : ''}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        <Check className="h-3 w-3" /> Active
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
            <h2 className="mb-6 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Change Password</h2>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 mt-0.5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-900">
                <strong>Important:</strong> Changing your password will log you out from all sessions for security purposes.
              </p>
            </div>
            <form onSubmit={changePassword} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />
              <div className="sm:col-span-2 lg:col-span-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Lock className="h-4 w-4" /> Update Password
                </button>
              </div>
            </form>
          </div>
          </>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}