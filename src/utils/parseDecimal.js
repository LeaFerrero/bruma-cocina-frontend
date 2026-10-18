/**
 * Convierte un valor a número con la cantidad de decimales especificada (soporta comas).
 * Si el valor es inválido, retorna el original para que validadores como Zod detecten el error.
 *
 * @param {string|number} value - El valor numérico o texto a procesar.
 * @param {number} decimals - La cantidad de posiciones decimales a conservar.
 * @returns {number|string} El número formateado, o el valor original si la conversión falla.
 */
export const parseDecimal = (value, decimals) => {
  let parsedNumber = value;

  if (typeof value === "string") {
    parsedNumber = Number(value.replace(",", "."));
  }

  if (isNaN(parsedNumber)) return NaN;

  return Number(parsedNumber.toFixed(decimals));
};
