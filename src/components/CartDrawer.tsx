import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Send, Plus, Minus, Bike, Store, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [tipoEntrega, setTipoEntrega] = useState<'motoconcho' | 'recoger'>('motoconcho');
  const [showProducts, setShowProducts] = useState<boolean>(true);

  if (!isOpen) return null;

  const subtotalHelados = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const costoEnvio = tipoEntrega === 'motoconcho' ? 50 : 0;
  const totalFinal = subtotalHelados + costoEnvio;
  const totalUnits = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  const handleSendWhatsApp = () => {
    if (cartItems.length === 0) return;

    let mensaje = `*¡NUEVO PEDIDO DE MANIELADOS!*\n`;
    mensaje += `*San José de Ocoa*\n\n`;

    mensaje += `*HELADOS SELECCIONADOS:*\n`;
    cartItems.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.cantidad}x *${item.nombre}* (${item.tipo}) - RD$${item.subtotal}\n`;
    });

    mensaje += `\n*MONTO TOTAL:*\n`;
    mensaje += `- Subtotal helados: RD$${subtotalHelados}\n`;
    if (tipoEntrega === 'motoconcho') {
      mensaje += `- Envío en Motoconcho: RD$50\n`;
      mensaje += `- *TOTAL A PAGAR:* RD$${totalFinal}\n\n`;
      mensaje += `- *Tipo de Entrega:* Envío por Motoconcho (+RD$50)\n`;
    } else {
      mensaje += `- Modo: Pasar a recoger en local (RD$0)\n`;
      mensaje += `- *TOTAL A PAGAR:* RD$${totalFinal}\n\n`;
      mensaje += `- *Tipo de Entrega:* Pasar a recoger al local (Gratis)\n`;
    }

    mensaje += `\n¡Gracias por preferir Manielados! Por favor confirmen el tiempo estimado.`;

    const encoded = encodeURIComponent(mensaje);
    const whatsappUrl = `https://wa.me/18293488943?text=${encoded}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset/Clear cart to 0 so no stale orders remain
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-emerald-950/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="relative w-full max-w-md bg-amber-50 h-full shadow-2xl flex flex-col justify-between border-l border-amber-200">
        
        {/* Header */}
        <div className="p-5 bg-emerald-900 text-amber-50 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h2 className="font-serif text-xl font-bold">Tu Pedido</h2>
            <span className="text-xs bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full font-bold">
              {totalUnits} {totalUnits === 1 ? 'helado' : 'helados'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-800 text-amber-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-200/50 flex items-center justify-center text-amber-700">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-950">
                Tu carrito está vacío
              </h3>
              <p className="text-xs text-emerald-900/70 max-w-xs mx-auto">
                Selecciona tus helados preferidos en el catálogo para armar tu pedido.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-emerald-800 text-amber-50 rounded-2xl font-bold text-sm shadow-sm cursor-pointer hover:bg-emerald-900 transition-colors"
              >
                Elegir Helados
              </button>
            </div>
          ) : (
            <>
              {/* Button to toggle/view selected products */}
              <div className="bg-white rounded-2xl border border-amber-200 shadow-xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowProducts(!showProducts)}
                  className="w-full p-3.5 bg-amber-100/60 hover:bg-amber-100 flex items-center justify-between text-emerald-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-700" />
                    <span>Ver productos seleccionados ({cartItems.length})</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800">
                    <span className="font-extrabold">RD${subtotalHelados}</span>
                    {showProducts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {showProducts && (
                  <div className="p-3 space-y-3 border-t border-amber-200/60 divide-y divide-amber-100">
                    <div className="flex items-center justify-between pb-1 text-[11px] font-bold text-emerald-900/70">
                      <span>Lista de helados</span>
                      <button
                        onClick={onClearCart}
                        className="text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Vaciar</span>
                      </button>
                    </div>

                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="pt-2 flex items-center gap-3"
                      >
                        <img
                          src={item.foto}
                          alt={item.nombre}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-amber-100"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-xs text-emerald-950 truncate">
                            {item.nombre}
                          </h4>
                          <div className="text-[11px] text-emerald-800/80">
                            RD${item.precio} c/u &bull; Subtotal: <strong>RD${item.subtotal}</strong>
                          </div>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded-lg bg-white text-emerald-900 flex items-center justify-center text-xs font-bold shadow-xs cursor-pointer hover:bg-amber-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded-lg bg-emerald-800 text-amber-50 flex items-center justify-center text-xs font-bold shadow-xs cursor-pointer hover:bg-emerald-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Delivery Choice */}
              <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-3 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-amber-600" />
                  ¿Cómo deseas recibir tu pedido?
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setTipoEntrega('motoconcho')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      tipoEntrega === 'motoconcho'
                        ? 'bg-emerald-800 text-amber-50 border-emerald-800 shadow-sm ring-2 ring-emerald-700/30'
                        : 'bg-amber-50 text-emerald-950 border-amber-200 hover:bg-amber-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-extrabold text-sm">
                      <Bike className="w-4 h-4" />
                      <span>Motoconcho</span>
                    </div>
                    <span className={`text-[11px] font-medium mt-0.5 ${
                      tipoEntrega === 'motoconcho' ? 'text-amber-300' : 'text-emerald-700'
                    }`}>
                      +RD$50 de envío
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTipoEntrega('recoger')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      tipoEntrega === 'recoger'
                        ? 'bg-emerald-800 text-amber-50 border-emerald-800 shadow-sm ring-2 ring-emerald-700/30'
                        : 'bg-amber-50 text-emerald-950 border-amber-200 hover:bg-amber-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-extrabold text-sm">
                      <Store className="w-4 h-4" />
                      <span>Pasar a recoger</span>
                    </div>
                    <span className={`text-[11px] font-medium mt-0.5 ${
                      tipoEntrega === 'recoger' ? 'text-amber-300' : 'text-emerald-700'
                    }`}>
                      Gratis (RD$0)
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-amber-200/80 space-y-3 shadow-lg">
            <div className="space-y-1 border-b border-amber-100 pb-2 text-xs">
              <div className="flex justify-between text-emerald-900/80">
                <span>Subtotal ({totalUnits} helados):</span>
                <span>RD${subtotalHelados}</span>
              </div>
              <div className="flex justify-between text-emerald-900/80">
                <span>Envío:</span>
                <span>{tipoEntrega === 'motoconcho' ? 'RD$50 (Motoconcho)' : 'Gratis (RD$0)'}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-950 pt-1 font-bold text-sm">
                <span className="uppercase tracking-wider">Total a pagar:</span>
                <span className="font-serif text-2xl font-black text-emerald-950">
                  RD${totalFinal}
                </span>
              </div>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido por WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
