import React, { useState } from 'react';
import { CartItem, CustomerInfo } from '../types';
import { SECTORES_OCOA } from '../data/products';
import { X, Trash2, Send, Plus, Minus, MapPin, DollarSign, Sparkles, Bike, Store } from 'lucide-react';

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
  const [customer, setCustomer] = useState<CustomerInfo>({
    nombre: '',
    tipoEntrega: 'motoconcho',
    sector: SECTORES_OCOA[0],
    direccion: '',
    metodoPago: 'efectivo',
    montoEfectivo: '',
    notas: '',
  });

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');

  if (!isOpen) return null;

  const subtotalHelados = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const costoEnvio = customer.tipoEntrega === 'motoconcho' ? 50 : 0;
  const totalFinal = subtotalHelados + costoEnvio;
  const totalUnits = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    let mensaje = `*¡NUEVO PEDIDO DE MANIELADOS!*\n`;
    mensaje += `*San José de Ocoa*\n\n`;

    mensaje += `*HELADOS SELECCIONADOS:*\n`;
    cartItems.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.cantidad}x *${item.nombre}* (${item.tipo}) - RD$${item.subtotal}\n`;
    });

    mensaje += `\n*MONTO TOTAL:*\n`;
    mensaje += `- Subtotal helados: RD$${subtotalHelados}\n`;
    if (customer.tipoEntrega === 'motoconcho') {
      mensaje += `- Envío en Motoconcho: RD$50\n`;
      mensaje += `- *TOTAL A PAGAR:* RD$${totalFinal}\n\n`;
    } else {
      mensaje += `- Modo: Pasar a recoger en local (RD$0)\n`;
      mensaje += `- *TOTAL A PAGAR:* RD$${totalFinal}\n\n`;
    }

    mensaje += `*DATOS DEL CLIENTE:*\n`;
    mensaje += `- *Nombre:* ${customer.nombre || 'No especificado'}\n`;
    mensaje += `- *Entrega:* ${
      customer.tipoEntrega === 'motoconcho'
        ? 'Envío por Motoconcho (+RD$50)'
        : 'Pasar a recoger al local (Gratis)'
    }\n`;

    if (customer.tipoEntrega === 'motoconcho') {
      mensaje += `- *Sector:* ${customer.sector}\n`;
      if (customer.direccion) {
        mensaje += `- *Dirección / Punto de Referencia:* ${customer.direccion}\n`;
      }
    }

    mensaje += `- *Pago:* ${
      customer.metodoPago === 'efectivo' ? 'Efectivo' : 'Transferencia Bancaria'
    }\n`;

    if (customer.metodoPago === 'efectivo' && customer.montoEfectivo) {
      mensaje += `- *Paga con:* RD$${customer.montoEfectivo}\n`;
    }

    if (customer.notas) {
      mensaje += `- *Notas:* ${customer.notas}\n`;
    }

    mensaje += `\n¡Gracias por preferir Manielados! Por favor confirmen el tiempo estimado de entrega.`;

    const encoded = encodeURIComponent(mensaje);
    const whatsappUrl = `https://wa.me/18293488943?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-emerald-950/60 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="relative w-full max-w-md bg-amber-50 h-full shadow-2xl flex flex-col justify-between animate-slide-left border-l border-amber-200">
        
        {/* Header */}
        <div className="p-5 bg-emerald-900 text-amber-50 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-amber-300" />
            <h2 className="font-serif text-xl font-bold">Enviar Pedido</h2>
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
                <Send className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-950">
                Aún no has elegido tus helados
              </h3>
              <p className="text-xs text-emerald-900/70 max-w-xs mx-auto">
                Selecciona tus sabores preferidos en el catálogo para armar tu pedido de Manielados.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-emerald-800 text-amber-50 rounded-2xl font-bold text-sm shadow-sm cursor-pointer"
              >
                Elegir Helados
              </button>
            </div>
          ) : (
            <>
              {/* Step Selector Tab */}
              <div className="flex rounded-2xl bg-amber-200/60 p-1 text-xs font-bold text-emerald-950">
                <button
                  onClick={() => setStep('cart')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    step === 'cart' ? 'bg-white shadow-sm text-emerald-900' : 'opacity-70'
                  }`}
                >
                  1. Helados ({cartItems.length})
                </button>
                <button
                  onClick={() => setStep('checkout')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    step === 'checkout' ? 'bg-white shadow-sm text-emerald-900' : 'opacity-70'
                  }`}
                >
                  2. Entrega y Pago
                </button>
              </div>

              {step === 'cart' ? (
                /* LIST OF ITEMS */
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200/80 text-xs font-bold text-emerald-900">
                    <span>Lista de Helados</span>
                    <button
                      onClick={onClearCart}
                      className="text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Limpiar</span>
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded-2xl border border-amber-200/80 shadow-xs flex items-center gap-3"
                    >
                      <img
                        src={item.foto}
                        alt={item.nombre}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-amber-100"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-emerald-950 truncate">
                          {item.nombre}
                        </h4>
                        <div className="text-xs text-emerald-800/80 font-medium">
                          RD${item.precio} c/u
                        </div>
                        <div className="text-xs font-bold text-emerald-950 mt-0.5">
                          Subtotal: RD${item.subtotal}
                        </div>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-1.5 bg-amber-50 p-1 rounded-xl border border-amber-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white text-emerald-900 flex items-center justify-center text-xs font-bold shadow-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-emerald-800 text-amber-50 flex items-center justify-center text-xs font-bold shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* CHECKOUT FORM */
                <form id="checkout-form" onSubmit={handleSendWhatsApp} className="space-y-4">
                  
                  {/* Delivery Selection */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                      <Bike className="w-4 h-4 text-amber-600" />
                      ¿Cómo deseas recibir tu pedido?
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, tipoEntrega: 'motoconcho' })}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          customer.tipoEntrega === 'motoconcho'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-800 shadow-sm'
                            : 'bg-amber-50 text-emerald-950 border-amber-200 hover:bg-amber-100/60'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-extrabold text-sm">
                          <Bike className="w-4 h-4" />
                          <span>Motoconcho</span>
                        </div>
                        <span className={`text-[11px] font-medium mt-0.5 ${
                          customer.tipoEntrega === 'motoconcho' ? 'text-amber-300' : 'text-emerald-700'
                        }`}>
                          +RD$50 de envío
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, tipoEntrega: 'recoger' })}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          customer.tipoEntrega === 'recoger'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-800 shadow-sm'
                            : 'bg-amber-50 text-emerald-950 border-amber-200 hover:bg-amber-100/60'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-extrabold text-sm">
                          <Store className="w-4 h-4" />
                          <span>Pasar a recoger</span>
                        </div>
                        <span className={`text-[11px] font-medium mt-0.5 ${
                          customer.tipoEntrega === 'recoger' ? 'text-amber-300' : 'text-emerald-700'
                        }`}>
                          Gratis (RD$0)
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      Datos para el Pedido
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        Tu Nombre
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. María Rosario"
                        value={customer.nombre}
                        onChange={(e) => setCustomer({ ...customer, nombre: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-amber-50/30"
                      />
                    </div>

                    {customer.tipoEntrega === 'motoconcho' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-emerald-900 mb-1">
                            Sector / Comunidad en Ocoa
                          </label>
                          <select
                            value={customer.sector}
                            onChange={(e) => setCustomer({ ...customer, sector: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-amber-50/30 font-medium text-emerald-950"
                          >
                            {SECTORES_OCOA.map((sec, idx) => (
                              <option key={idx} value={sec}>
                                {sec}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-emerald-900 mb-1">
                            Calle / Punto de Referencia
                          </label>
                          <input
                            type="text"
                            placeholder="Ej. Calle 16 de Agosto, frente a la farmacia"
                            value={customer.direccion}
                            onChange={(e) => setCustomer({ ...customer, direccion: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-amber-50/30"
                          />
                        </div>
                      </>
                    )}

                    {customer.tipoEntrega === 'recoger' && (
                      <div className="p-3 bg-amber-100/60 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                        📍 <strong>Punto de retiro:</strong> Te confirmaremos por WhatsApp la dirección exacta en San José de Ocoa cuando prepares tu orden.
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                      Forma de Pago
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, metodoPago: 'efectivo' })}
                        className={`py-2.5 px-3 rounded-xl border transition-all text-center cursor-pointer ${
                          customer.metodoPago === 'efectivo'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-800'
                            : 'bg-amber-50 text-emerald-950 border-amber-200'
                        }`}
                      >
                        💵 Efectivo
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, metodoPago: 'transferencia' })}
                        className={`py-2.5 px-3 rounded-xl border transition-all text-center cursor-pointer ${
                          customer.metodoPago === 'transferencia'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-800'
                            : 'bg-amber-50 text-emerald-950 border-amber-200'
                        }`}
                      >
                        🏦 Transferencia
                      </button>
                    </div>

                    {customer.metodoPago === 'efectivo' && (
                      <div>
                        <label className="block text-xs font-medium text-emerald-900/80 mb-1">
                          ¿Con cuánto dinero vas a pagar? (para el cambio)
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. RD$500 o RD$1000"
                          value={customer.montoEfectivo}
                          onChange={(e) =>
                            setCustomer({ ...customer, montoEfectivo: e.target.value })
                          }
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-amber-300 focus:outline-none bg-amber-50/30"
                        />
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-amber-200">
                    <label className="block text-xs font-bold text-emerald-900 mb-1">
                      Notas Especiales (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Favor empacar bien frío o alguna sugerencia."
                      value={customer.notas}
                      onChange={(e) => setCustomer({ ...customer, notas: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none bg-amber-50/30"
                    />
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-amber-200/80 space-y-3 shadow-lg">
            <div className="space-y-1 border-b border-amber-100 pb-2 text-xs">
              <div className="flex justify-between text-emerald-900/80">
                <span>Helados ({totalUnits}):</span>
                <span>RD${subtotalHelados}</span>
              </div>
              <div className="flex justify-between text-emerald-900/80">
                <span>Envío (Motoconcho):</span>
                <span>{customer.tipoEntrega === 'motoconcho' ? 'RD$50' : 'Gratis (RD$0)'}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-950 pt-1 font-bold text-sm">
                <span className="uppercase tracking-wider">Total a pagar:</span>
                <span className="font-serif text-2xl font-black text-emerald-950">
                  RD${totalFinal}
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-amber-50 font-bold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar a Entrega y Pago</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Pedido por WhatsApp</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
