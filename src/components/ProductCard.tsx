import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Minus, Star, Info, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onAdd,
  onRemove,
  onOpenDetail,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
        quantity > 0
          ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xl scale-[1.01]'
          : 'border-amber-200/80 hover:border-amber-300 shadow-md hover:shadow-xl hover:-translate-y-1'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media Section */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-amber-100/50">
        <img
          src={product.foto}
          alt={product.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-80 transition-opacity" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/90 text-emerald-950 backdrop-blur-md shadow-sm border border-white/40">
            {product.tipo}
          </span>

          {product.destacado && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-emerald-950 shadow-md">
              <Sparkles className="w-3 h-3 fill-emerald-950" />
              Favorito
            </span>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-emerald-950/90 text-amber-300 px-3 py-1 rounded-xl text-lg font-extrabold backdrop-blur-sm border border-emerald-800/60 shadow-md">
            RD${product.precio}
          </div>
        </div>

        {/* Detail Trigger */}
        <button
          onClick={() => onOpenDetail(product)}
          className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-emerald-950 rounded-xl shadow-md transition-all opacity-90 group-hover:opacity-100 cursor-pointer"
          title="Ver ingredientes y detalles"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Body Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-emerald-950 leading-tight group-hover:text-emerald-800 transition-colors">
              {product.nombre}
            </h3>
            {product.rating && (
              <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-emerald-900/70 font-medium line-clamp-2 leading-relaxed">
            {product.desc}
          </p>
        </div>

        {/* Quantity Controls & Add Action */}
        <div className="pt-2 border-t border-amber-100">
          {quantity === 0 ? (
            <button
              onClick={() => onAdd(product)}
              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-amber-50 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Agregar al Pedido</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-emerald-50 rounded-2xl p-1.5 border border-emerald-200">
              <button
                onClick={() => onRemove(product.id)}
                className="w-9 h-9 rounded-xl bg-white text-emerald-900 hover:bg-rose-100 hover:text-rose-700 border border-emerald-200 flex items-center justify-center transition-colors cursor-pointer"
                title="Reducir una unidad"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 font-bold text-emerald-950 px-3">
                <span className="text-lg">{quantity}</span>
                <span className="text-xs text-emerald-800 font-semibold">unid.</span>
              </div>

              <button
                onClick={() => onAdd(product)}
                className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-50 hover:bg-emerald-900 flex items-center justify-center transition-colors cursor-pointer"
                title="Aumentar una unidad"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
