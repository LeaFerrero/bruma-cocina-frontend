const meals = [
  {
    _id: 1,
    name: "Risotto de Hongos",
    description: "Plato principal sellado al vacío, apto celíacos.",
    price: 15000,
    category: "Principal",
    available: true,
    stock: 33,
    ingredients: [
      { id: 1, quantity: 200 },
      { id: 2, quantity: 150 },
    ],
  },
  {
    _id: 2,
    name: "Pollo al Curry",
    description: "Acompañado con arroz basmati y sésamo tostado.",
    price: 13500,
    category: "Principal",
    available: true,
    stock: 10,
    ingredients: [
      { id: 3, quantity: 250 },
      { id: 2, quantity: 100 },
    ],
  },
  {
    _id: 3,
    name: "Wok Vegetariano",
    description: "Vegetales de estación salteados con salsa de soja.",
    price: 12500,
    category: "Vegetariano",
    available: true,
    stock: 1,
    ingredients: [
      { id: 1, quantity: 300 },
      { id: 5, quantity: 2 },
    ],
  },
  {
    _id: 4,
    name: "Salmón Rosado en Costra de Hierbas",
    description: "Guarnición de vegetales asados alimonados.",
    price: 21000,
    category: "Especiales",
    available: false,
    stock: 40,
    ingredients: [
      { id: 4, quantity: 220 },
      { id: 1, quantity: 150 },
    ],
  },
  {
    _id: 5,
    name: "Pizza",
    description: "Con mucho quesito.",
    price: 21000,
    category: "Especiales",
    available: false,
    stock: 40,
    ingredients: [
      { id: 4, quantity: 220 },
      { id: 1, quantity: 150 },
    ],
  },
  {
    _id: 6,
    name: "PapasFrita",
    description: "Corcantes por fuera, sauves por dentro.",
    price: 21000,
    category: "Especiales",
    available: false,
    stock: 40,
    ingredients: [
      { id: 4, quantity: 220 },
      { id: 1, quantity: 150 },
    ],
  },
];

export default meals;
