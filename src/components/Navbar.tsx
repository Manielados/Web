import React from 'react';
import { Star, Phone, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-amber-200/60 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between py-3">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-amber-500 p-0.5 shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden p-0.5">
                <img
                  src="/images/Logo.webp"
                  alt="Logo Manielados"
                  className="w-full h-full object-cover rounded-[12px]"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-emerald-950 p-1 rounded-full text-[10px] font-bold shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif text-2xl font-bold text-emerald-950 tracking-tight leading-none">
                Manielados
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Artesanal
              </span>
            </div>
            <p className="text-xs text-emerald-800/80 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-amber-600 inline" /> San José de Ocoa, R.D.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/18293488943"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-xl transition-colors border border-emerald-200/60"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>829-348-8943</span>
          </a>

          <a
            href="https://g.page/r/CQAuf3lcbjEGEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            id="rate-us-button"
            className="flex items-center gap-2 px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-emerald-950 rounded-2xl font-black text-xs sm:text-sm shadow-md hover:shadow-lg shadow-amber-500/20 active:scale-95 transition-all group cursor-pointer border border-amber-300"
          >
            <Star className="w-4 h-4 fill-emerald-950 text-emerald-950 group-hover:rotate-12 transition-transform" />
            <span>Califícanos</span>
          </a>
        </div>
      </div>
    </header>
  );
};

