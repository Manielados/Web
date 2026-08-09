import React, { useState, useMemo } from 'react';
import { PRODUCTOS, LINEAS_INFO } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import {
  Search,
  Filter,
  Heart,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  Instagram,
  Facebook,
  Send
} from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedFilter, setSelectedFilter] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Cart helper calculations
  const cartItems: CartItem[] = useMemo(() => {
    return (Object.entries(cart) as [string, number][])
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = PRODUCTOS.find((p) => p.id === id)!;
        return {
          ...product,
          cantidad: qty,
          subtotal: qty * product.precio,
        };
      });
  }, [cart]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTOS.filter((p) => {
      const matchesFilter = selectedFilter === 'todas' || p.linea === selectedFilter;
      const matchesSearch =
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tipo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const scrollToCatalog = () => {
    const section = document.getElementById('catalogo-sabores');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 text-emerald-950 font-sans selection:bg-amber-300 selection:text-emerald-950">
      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Header */}
      <Hero onExplore={scrollToCatalog} />

      {/* Main Catalog Container */}
      <main id="catalogo-sabores" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        {/* Section Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-200/50 px-3 py-1 rounded-full mb-2">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              Catálogo Interactivo
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
              Nuestros Sabores Artesanales
            </h2>
            <p className="text-xs sm:text-sm text-emerald-900/70 font-medium mt-1">
              Selecciona los helados que deseas y envíanos tu orden por WhatsApp.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-emerald-800/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar sabor o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white rounded-2xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-xs text-emerald-950 placeholder:text-emerald-900/50 font-medium"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedFilter('todas')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'todas'
                ? 'bg-emerald-800 text-amber-50 shadow-md shadow-emerald-900/20'
                : 'bg-white text-emerald-950 border border-amber-200 hover:bg-amber-100/60'
            }`}
          >
            🍦 Todos los Sabores ({PRODUCTOS.length})
          </button>

          {Object.entries(LINEAS_INFO).map(([key, info]) => {
            const isSelected = selectedFilter === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedFilter(key)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-amber-50 shadow-md shadow-emerald-900/20'
                    : 'bg-white text-emerald-950 border border-amber-200 hover:bg-amber-100/60'
                }`}
              >
                <span>{info.nombre}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-200/50 text-amber-900 rounded-md font-extrabold">
                  {PRODUCTOS.filter((p) => p.linea === key).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Line Banner if a specific category is selected */}
        {selectedFilter !== 'todas' && (
          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-emerald-950">
                {LINEAS_INFO[selectedFilter as keyof typeof LINEAS_INFO].nombre}
              </h4>
              <p className="text-xs text-emerald-900/70 font-medium">
                {LINEAS_INFO[selectedFilter as keyof typeof LINEAS_INFO].desc}
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-amber-200 p-8 space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-emerald-950">
              No encontramos sabores que coincidan
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900/70 max-w-sm mx-auto font-medium">
              Intenta buscar otro nombre o cambia la categoría seleccionada arriba.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('todas');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-emerald-800 text-amber-50 rounded-xl text-xs font-bold cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onAdd={handleAddToCart}
                onRemove={(id) => handleUpdateQuantity(id, -1)}
                onOpenDetail={(prod) => setModalProduct(prod)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Sticky Floating 'Enviar Pedido' Button */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4 animate-fade-in">
          <button
            onClick={() => setIsCartOpen(true)}
            id="floating-enviar-pedido-btn"
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-amber-50 p-3.5 sm:p-4 rounded-2xl shadow-2xl shadow-emerald-950/40 font-bold flex items-center justify-between border-2 border-amber-400/80 cursor-pointer transform hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-sm shadow-xs">
                {totalCartCount}
              </div>
              <div className="text-left">
                <span className="block text-sm font-black text-amber-300 uppercase tracking-wide">Enviar Pedido</span>
                <span className="block text-xs font-medium text-emerald-100">
                  {totalCartCount} {totalCartCount === 1 ? 'helado seleccionado' : 'helados seleccionados'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-700/50">
              <span className="text-xs text-amber-200/80 font-bold">Subtotal:</span>
              <span className="font-serif text-base sm:text-lg font-black text-amber-300">
                RD${cartItems.reduce((acc, i) => acc + i.subtotal, 0)}
              </span>
              <Send className="w-4 h-4 text-amber-300 ml-1" />
            </div>
          </button>
        </div>
      )}

      {/* Quality Commitment Section */}
      <section className="bg-amber-100/60 border-y border-amber-200/80 py-12 px-4 sm:px-6 mt-16">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
              Compromiso Manielados
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
              ¿Por qué nuestros helados son tan especiales?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                🌾
              </div>
              <h4 className="font-serif font-bold text-base text-emerald-950">
                Frutas del Campo Ocoeño
              </h4>
              <p className="text-xs text-emerald-900/70 font-medium leading-relaxed">
                Compramos directamente a los productores locales de San José de Ocoa, garantizando frescura y apoyando la agricultura de nuestra sierra.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                🥛
              </div>
              <h4 className="font-serif font-bold text-base text-emerald-950">
                Leche Pura Batida
              </h4>
              <p className="text-xs text-emerald-900/70 font-medium leading-relaxed">
                Nuestras bases cremosas se elaboran artesanalmente sin saborizantes artificiales ni conservantes industriales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                ❤️
              </div>
              <h4 className="font-serif font-bold text-base text-emerald-950">
                Tradición Familiar
              </h4>
              <p className="text-xs text-emerald-900/70 font-medium leading-relaxed">
                Mantenemos viva la receta tradicional ocoeña transmitida entre generaciones para regalarte sonrisas en cada paleta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-amber-100 pt-12 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-emerald-900 pb-8">
          
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-black text-amber-300">Manielados</span>
              <span className="text-xs bg-emerald-800 text-amber-200 px-2 py-0.5 rounded-full font-semibold">
                Helados Artesanales
              </span>
            </div>
            <p className="text-xs text-amber-100/70 leading-relaxed max-w-sm">
              El auténtico sabor de San José de Ocoa en helados y paletas artesanales. Pedidos para consumo personal, cumpleaños, bodas y eventos especiales.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs text-amber-100/80">
            <h5 className="font-bold text-amber-300 uppercase tracking-wider text-xs">Ubicación & Contacto</h5>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>San José de Ocoa, República Dominicana</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Teléfono / WhatsApp: 829-348-8943</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Horario: Lunes a Domingo (9:00 AM - 9:00 PM)</span>
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-amber-300 uppercase tracking-wider text-xs">Síguenos</h5>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/18293488943"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-300 flex items-center justify-center transition-colors"
                title="WhatsApp Manielados"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-6 text-center text-xs text-amber-100/50">
          <p>© {new Date().getFullYear()} Manielados. San José de Ocoa, R.D. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
