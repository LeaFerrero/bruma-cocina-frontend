const PAYMENT_STATUS = Object.freeze({
  PENDIENTE: "pendiente",
  PAGADO: "pagado",
  CANCELADO: "cancelado",
  REEMBOLSADO: "reembolsado",
  FALLIDO: "fallido",
});

const PAYMENT_STATUS_NAMES = Object.freeze({
  [PAYMENT_STATUS.PENDIENTE]: "Pendiente",
  [PAYMENT_STATUS.PAGADO]: "Pagado",
  [PAYMENT_STATUS.CANCELADO]: "Cancelado",
  [PAYMENT_STATUS.REEMBOLSADO]: "Reembolsado",
  [PAYMENT_STATUS.FALLIDO]: "Fallido",
});

const PAYMENT_STATUS_OPTIONS = Object.values(PAYMENT_STATUS).map(
  (paymentStatus) => ({
    value: paymentStatus,
    label: PAYMENT_STATUS_NAMES[paymentStatus],
  }),
);

export { PAYMENT_STATUS, PAYMENT_STATUS_NAMES, PAYMENT_STATUS_OPTIONS };
