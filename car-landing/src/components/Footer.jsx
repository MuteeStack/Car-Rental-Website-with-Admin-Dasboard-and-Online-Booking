// src/components/Footer.jsx
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';

const WhatsAppIcon = ({ className = "" }) => (
  <svg className={`w-7 h-7 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-white pt-24 pb-12 overflow-hidden border-t-4 border-blue-600">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#" className="font-display text-5xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 hover:to-white transition-colors duration-300">
              IMRAN<span className="text-blue-500">.</span>
            </a>
            <p className="text-lg text-gray-400 font-medium max-w-sm leading-relaxed mb-6">
              Experience the pinnacle of premium car rentals in Rawalpindi & Islamabad. Unmatched fleet, exceptional service.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-dark text-xs font-bold tracking-widest uppercase text-gray-300">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Est. 2015
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-4">
            <h3 className="font-display text-xl font-bold mb-6 text-white tracking-wide">Contact Us</h3>
            <div className="space-y-4">
              <a href="tel:+923215466600" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-panel-dark flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Call Us</span>
                  <span className="text-base text-gray-300 group-hover:text-white font-medium transition-colors">+92 321 5466600</span>
                </div>
              </a>

              <a href="https://wa.me/923215466600" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-panel-dark flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                  <WhatsAppIcon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">WhatsApp</span>
                  <span className="text-base text-gray-300 group-hover:text-white font-medium transition-colors">Chat with us</span>
                </div>
              </a>

              <a href="mailto:imranrentacar@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-panel-dark flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Email</span>
                  <span className="text-base text-gray-300 group-hover:text-white font-medium transition-colors">imranrentacar@gmail.com</span>
                </div>
              </a>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-xl glass-panel-dark flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Location</span>
                  <span className="text-base text-gray-300 font-medium">Rawalpindi & Islamabad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links & Quick Actions */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl font-bold mb-6 text-white tracking-wide">Connect</h3>
              <div className="flex gap-3">
                <a href="https://instagram.com/imranrentacar" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass-panel-dark flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:-translate-y-1 group">
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
                <a href="https://facebook.com/imranrentacar" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass-panel-dark flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 group">
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
              </div>
              <p className="text-sm text-gray-500 font-medium mt-4">Follow us for latest fleets & offers.</p>
            </div>
            
            <div className="mt-8">
              <a href="https://wa.me/923215466600" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-500 transition-colors duration-300 shadow-lg shadow-blue-600/20 group">
                Book a Ride <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} <span className="font-bold text-gray-300">Imran Rent a Car</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}