const ORDER_STATUS = Object.freeze({
  PENDIENTE: "pendiente",
  DESPACHADO: "despachado",
  CANCELADO: "cancelado",
});

const ORDER_STATUS_NAMES = Object.freeze({
  [ORDER_STATUS.PENDIENTE]: "Pendiente",
  [ORDER_STATUS.DESPACHADO]: "Despachado",
  [ORDER_STATUS.CANCELADO]: "Cancelado",
});

const ORDER_STATUS_OPTIONS = Object.values(ORDER_STATUS).map((orderStatus) => ({
  value: orderStatus,
  label: ORDER_STATUS_NAMES[orderStatus],
}));

export { ORDER_STATUS, ORDER_STATUS_NAMES, ORDER_STATUS_OPTIONS };
