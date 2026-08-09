import { Product } from '../types';

export const LINEAS_INFO = {
  naturales: {
    nombre: "Naturales",
    badge: "100% fruta",
    color: "amber-600",
    bgColor: "bg-amber-50 text-amber-900 border-amber-200",
    desc: "Helados refrescantes elaborados con fruta 100% natural"
  },
  cremosos: {
    nombre: "Cremosos",
    badge: "Clásicos",
    color: "emerald-700",
    bgColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    desc: "Bases suaves y cremosas con auténticos sabores tradicionales"
  },
  premium: {
    nombre: "Premium",
    badge: "Selección Especial",
    color: "rose-600",
    bgColor: "bg-rose-50 text-rose-900 border-rose-200",
    desc: "Ingredientes de máxima calidad con textura rica y sabor intenso"
  }
};

export const PRODUCTOS: Product[] = [
  {
    id: "p1",
    nombre: "Tamarindo",
    linea: "naturales",
    precio: 25,
    tipo: "Natural",
    desc: "Pulpa natural de tamarindo en un helado refrescante con el equilibrio perfecto entre dulce y ese toque ácido que tanto gusta.",
    foto: "https://lh3.googleusercontent.com/d/11BGDS0Dx3ZXhq0rPwit5GjwY_o1BrVYK",
    colorBg: "from-amber-700/20 to-orange-900/10",
    accentColor: "bg-amber-700",
    destacado: true,
    ingredientes: ["Pulpa natural de tamarindo", "Agua purificada", "Azúcar de caña"],
    calorias: "90 kcal",
    rating: 4.9
  },
  {
    id: "p2",
    nombre: "Fresa Crema",
    linea: "cremosos",
    precio: 50,
    tipo: "Cremoso",
    desc: "Un clásico reinventado con el auténtico sabor de la fresa y una cremosidad que invita a disfrutar cada bocado.",
    foto: "https://lh3.googleusercontent.com/d/1lHLCsFiXeveG6Uc19sOWBofB7jUVwapo",
    colorBg: "from-pink-500/20 to-rose-600/10",
    accentColor: "bg-rose-500",
    destacado: true,
    ingredientes: ["Fresas naturales", "Crema de leche", "Leche entera", "Azúcar"],
    calorias: "160 kcal",
    rating: 5.0
  },
  {
    id: "p3",
    nombre: "Chinola Crema",
    linea: "cremosos",
    precio: 50,
    tipo: "Cremoso",
    desc: "Pulpa natural de chinola preparada artesanalmente y mezclada con una base cremosa que logra una textura firme, suave y llena de sabor.",
    foto: "https://lh3.googleusercontent.com/d/1sWW_WMvJMAbNhOi1Df3xgAI4JBRfqyf6",
    colorBg: "from-yellow-400/20 to-amber-500/10",
    accentColor: "bg-amber-500",
    destacado: true,
    ingredientes: ["Pulpa natural de chinola (maracuyá)", "Crema de leche", "Azúcar"],
    calorias: "155 kcal",
    rating: 4.9
  },
  {
    id: "p4",
    nombre: "Dulce de Leche",
    linea: "cremosos",
    precio: 50,
    tipo: "Cremoso",
    desc: "Preparado con dulce de leche artesanal, ofrece un sabor suave a caramelo y una cremosidad que se disfruta hasta el último bocado.",
    foto: "https://lh3.googleusercontent.com/d/1lHLCsFiXeveG6Uc19sOWBofB7jUVwapo",
    colorBg: "from-amber-800/20 to-yellow-900/10",
    accentColor: "bg-amber-800",
    destacado: true,
    ingredientes: ["Dulce de leche artesanal", "Leche entera", "Vainilla"],
    calorias: "190 kcal",
    rating: 4.9
  },
  {
    id: "p5",
    nombre: "Cookies & Cream",
    linea: "cremosos",
    precio: 50,
    tipo: "Cremoso + Galletas",
    desc: "Una deliciosa combinación de chocolate y galleta en una base cremosa que sorprende con cada bocado.",
    foto: "https://lh3.googleusercontent.com/d/1ZEqI8tTqLPOYHRvvZ4XXd9nsx34HOYQO",
    colorBg: "from-stone-700/20 to-neutral-900/10",
    accentColor: "bg-stone-800",
    destacado: false,
    ingredientes: ["Trozos de galleta de chocolate", "Crema helada de vainilla"],
    calorias: "205 kcal",
    rating: 4.8
  },
  {
    id: "p6",
    nombre: "Coco con Batata",
    linea: "cremosos",
    precio: 50,
    tipo: "Cremoso",
    desc: "Inspirado en una receta tradicional dominicana, combina una textura reconfortante con un sabor que despierta los mejores recuerdos.",
    foto: "https://lh3.googleusercontent.com/d/1dpJl8ntXX7SnMKISuCu7oJYBmfeS6ZOU",
    colorBg: "from-amber-600/20 to-amber-950/10",
    accentColor: "bg-amber-700",
    destacado: true,
    ingredientes: ["Coco rallado", "Batata horneada dulce", "Leche entera", "Canela"],
    calorias: "180 kcal",
    rating: 5.0
  },
  {
    id: "p7",
    nombre: "Maní Crema",
    linea: "cremosos",
    precio: 50,
    tipo: "Cremoso",
    desc: "Intenso sabor a maní con una textura cremosa y un sutil toque crujiente que lo hace simplemente adictivo.",
    foto: "https://lh3.googleusercontent.com/d/1Nl1eXEob2waMH8q4s3ZE_zsbA96mDHLi",
    colorBg: "from-amber-700/20 to-amber-900/10",
    accentColor: "bg-amber-800",
    destacado: false,
    ingredientes: ["Maní tostado molido", "Crema de leche", "Toque crocante de maní"],
    calorias: "195 kcal",
    rating: 4.8
  },
  {
    id: "p8",
    nombre: "Coco Cream",
    linea: "premium",
    precio: 75,
    tipo: "Cremoso",
    desc: "Coco seco licuado directamente en la mezcla, conservando toda su pulpa para ofrecer una textura rica, cremosa y auténticamente tropical.",
    foto: "https://lh3.googleusercontent.com/d/1-Dxz6pFJxQTga0jAmsyhXrcAvF-AQMt2",
    colorBg: "from-teal-600/20 to-emerald-900/10",
    accentColor: "bg-emerald-800",
    destacado: true,
    ingredientes: ["Coco seco molido con su pulpa", "Crema de leche", "Leche de coco pura"],
    calorias: "210 kcal",
    rating: 5.0
  }
];

export const SECTORES_OCOA = [
  "Centro del Pueblo / Casco Urbano",
  "Sector San Antonio",
  "Sector Las Flores",
  "Sector Pueblo Arriba",
  "Sector Pueblo Abajo",
  "Sector San Luis",
  "Sabana Larga (Envío Especial)",
  "El Pinar (Punto de Encuentro)",
  "Rancho Arriba (Envío Programado)",
  "Otro sector en Ocoa"
];
