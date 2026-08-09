export interface Product {
  id: string;
  nombre: string;
  linea: 'naturales' | 'cremosos' | 'premium';
  precio: number;
  tipo: string;
  desc: string;
  foto: string;
  colorBg: string;
  accentColor: string;
  destacado?: boolean;
  ingredientes?: string[];
  calorias?: string;
  rating?: number;
}

export interface CartItem extends Product {
  cantidad: number;
  subtotal: number;
}

export interface CustomerInfo {
  nombre: string;
  tipoEntrega: 'motoconcho' | 'recoger';
  sector: string;
  direccion: string;
  metodoPago: 'efectivo' | 'transferencia';
  montoEfectivo?: string;
  notas?: string;
}
