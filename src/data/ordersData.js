const orders = [
  {
    id: 1,
    orderId: "CMD-20261022-001",
    date: "2026-09-29T20:45:00.000Z",
    time: "20:45",
    status: "Pendiente",
    customer: {
      name: "Lucía",
      lastName: "Gómez",
      phone: "11-4567-8901",
      address: "Av. Corrientes 1234",
    },
    notes: "Risotto: Apto celíacos, sin queso extra. Wok: Poca salsa de soja.",
    items: [
      {
        id: 1,
        name: "Risotto de Hongos",
        quantity: 2,
        price: 15000,
      },
      {
        id: 3,
        name: "Wok Vegetariano",
        quantity: 1,
        price: 12500,
      },
    ],
    total: 42500,
  },
  {
    id: 2,
    orderId: "CMD-20261022-002",
    date: "2026-09-29T21:02:00.000Z",
    time: "21:02",
    status: "Pendiente",
    customer: {
      name: "Martín",
      lastName: "Pérez",
      phone: "11-2345-6789",
      address: "Callao 456",
    },
    notes: "Salmón: Punto de cocción a jugoso. Prioridad alta.",
    items: [
      {
        id: 4,
        name: "Salmón Rosado en Costra de Hierbas",
        quantity: 1,
        price: 21000,
      },
    ],
    total: 21000,
  },
  {
    id: 3,
    orderId: "CMD-20261022-003",
    date: "2026-09-29T21:15:00.000Z",
    time: "21:15",
    status: "Pendiente",
    customer: {
      name: "Sofía",
      lastName: "Benítez",
      phone: "11-9876-5432",
      address: "Santa Fe 3210",
    },
    notes: "Acompañamiento extra de arroz basmati.",
    items: [
      {
        id: 2,
        name: "Pollo al Curry",
        quantity: 2,
        price: 13500,
      },
    ],
    total: 27000,
  },
  {
    id: 4,
    orderId: "CMD-20261022-004",
    date: "2026-09-29T21:20:00.000Z",
    time: "21:20",
    status: "Lista",
    customer: {
      name: "Carlos",
      lastName: "Ruiz",
      phone: "11-3344-5566",
      address: "Rivadavia 5500",
    },
    notes: "Sin cubiertos descartables.",
    items: [
      {
        id: 2,
        name: "Pollo al Curry",
        quantity: 2,
        price: 13500,
      },
    ],
    total: 27000,
  },
  {
    id: 5,
    orderId: "CMD-20261022-005",
    date: "2026-09-29T21:25:00.000Z",
    time: "21:25",
    status: "Lista",
    customer: {
      name: "Ana",
      lastName: "Torres",
      phone: "11-7788-9900",
      address: "Cabildo 2100",
    },
    notes: "Timbre 4B.",
    items: [
      {
        id: 1,
        name: "Risotto de Hongos",
        quantity: 1,
        price: 15000,
      },
      {
        id: 2,
        name: "Pollo al Curry",
        quantity: 1,
        price: 13500,
      },
    ],
    total: 28500,
  },
  {
    id: 6,
    orderId: "CMD-20261022-006",
    date: "2026-09-29T21:30:00.000Z",
    time: "21:30",
    status: "Cancelada",
    customer: {
      name: "Jorge",
      lastName: "Vega",
      phone: "11-1122-3344",
      address: "Belgrano 890",
    },
    notes: "El cliente canceló por demora.",
    items: [
      {
        id: 2,
        name: "Pollo al Curry",
        quantity: 2,
        price: 13500,
      },
    ],
    total: 27000,
  },
];

export default orders;
