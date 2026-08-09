import React from 'react';
import { ArrowDown, Heart, ShieldCheck, Truck, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/70 via-amber-50 to-emerald-50/40 pt-8 pb-12 sm:py-16 px-4 sm:px-6">
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-200/60 border border-amber-300/80 text-amber-900 text-xs font-bold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />
              <span>Helados en fundita</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-emerald-950 leading-tight tracking-tight">
              Helados Artesanales <br className="hidden sm:block" />
              en <span className="text-amber-600">San José de Ocoa</span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-900/80 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Sabores hechos con dedicación, inspirados en lo nuestro y pensados para disfrutarlos de verdad. Explora el catálogo y haz tu pedido por WhatsApp.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExplore}
                id="hero-explore-btn"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-amber-50 rounded-2xl font-bold text-base shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explorar Sabores</span>
                <ArrowDown className="w-4 h-4 text-amber-300 group-hover:translate-y-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/18293488943?text=¡Hola!%20Quisiera%20consultar%20sobre%20pedidos%20al%20por%20mayor%20o%20eventos."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/80 hover:bg-white text-emerald-900 rounded-2xl font-semibold text-base border border-emerald-900/10 shadow-sm transition-all text-center cursor-pointer"
              >
                Pedidos para Eventos
              </a>
            </div>

            {/* Value Badges */}
            <div className="pt-6 border-t border-emerald-900/10 grid grid-cols-3 gap-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-900/90 text-xs sm:text-sm font-semibold">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Delivery en Ocoa</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-900/90 text-xs sm:text-sm font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% Natural</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-900/90 text-xs sm:text-sm font-semibold">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Receta Ocoeña</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-200 to-emerald-600 rotate-3 scale-105 opacity-40 blur-lg" />
              
              {/* Card Container with Image */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-amber-200/80 overflow-hidden">
                <div className="relative rounded-2xl overflow-hidden group">
                  <img
                    src="https://lh3.googleusercontent.com/d/1J0_ddHAXvMANUOIes_ZhNI3ZENqSm4m9"
                    alt="Helados Manielados San José de Ocoa"
                    className="w-full h-auto object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
