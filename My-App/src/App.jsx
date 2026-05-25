// src/App.jsx
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  return (
    <div
      className="min-h-screen text-gray-900"
      style={{
        background:
          'radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(248,250,252,0.98) 38%, rgba(226,232,240,0.9) 100%)',
      }}
    >
      <div className="mx-auto w-full">
        <Navbar />
        <Home />
      </div>
    </div>
  );
}