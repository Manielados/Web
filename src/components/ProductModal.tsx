import React from 'react';
import { Product } from '../types';
import { X, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-200 relative animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Header */}
        <div className="relative h-56 sm:h-64 w-full">
          <img
            src={product.foto}
            alt={product.nombre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-emerald-950 inline-block mb-1">
                {product.tipo}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-50 leading-tight">
                {product.nombre}
              </h2>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-emerald-900">
              RD${product.precio}
            </div>
          </div>

          <p className="text-emerald-900/80 text-sm sm:text-base leading-relaxed">
            {product.desc}
          </p>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-1/3 py-3 px-4 bg-amber-100 hover:bg-amber-200 text-emerald-950 font-bold rounded-2xl text-sm transition-colors cursor-pointer"
            >
              Volver
            </button>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-2/3 py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-amber-50 font-bold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Agregar a mi Pedido</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
