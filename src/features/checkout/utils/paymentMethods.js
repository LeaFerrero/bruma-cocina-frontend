const PAYMENT_METHODS = Object.freeze({
  EFECTIVO: "efectivo",
  MERCADO_PAGO: "mercado_pago",
  TRANSFERENCIA: "transferencia",
  TARJETA_DEBITO: "tarjeta_debito",
  TARJETA_CREDITO: "tarjeta_credito",
});

const PAYMENT_METHODS_NAMES = Object.freeze({
  [PAYMENT_METHODS.EFECTIVO]: "Efectivo",
  [PAYMENT_METHODS.MERCADO_PAGO]: "Mercado Pago",
  [PAYMENT_METHODS.TRANSFERENCIA]: "Transferencia",
  [PAYMENT_METHODS.TARJETA_DEBITO]: "Tarjeta de debito",
  [PAYMENT_METHODS.TARJETA_CREDITO]: "Tarjeta de credito",
});

const PAYMENT_METHODS_OPTIONS = Object.values(PAYMENT_METHODS).map(
  (method) => ({
    value: method,
    label: PAYMENT_METHODS_NAMES[method],
  }),
);

export { PAYMENT_METHODS, PAYMENT_METHODS_NAMES, PAYMENT_METHODS_OPTIONS };
