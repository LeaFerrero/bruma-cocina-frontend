/**
 * Convierte un valor a número con la cantidad de decimales especificada (soporta comas).
 * Si el valor es inválido o vacío, retorna el original o NaN.
 *
 * @param {string|number} value El valor numérico o texto a procesar.
 * @param {number} decimals La cantidad de posiciones decimales a conservar.
 * @returns {number|string} El número decimal, o el valor original/NaN si falla.
 */
const parseDecimal = (value, decimals) => {
  if (value === "" || value === null || value === undefined) return 0;

  let parsedNumber = value;

  if (typeof value === "string") {
    parsedNumber = Number(value.replace(",", "."));
  }

  if (isNaN(parsedNumber)) return NaN;

  return Number(parsedNumber.toFixed(decimals));
};

/**
 * Convierte un valor a número entero puro.
 * Si el valor es inválido o vacío, retorna el original o NaN.
 *
 * @param {string|number} value El valor numérico o texto a procesar.
 * @returns {number|string} El número entero, o el valor original/NaN si falla.
 */
const parseInteger = (value) => {
  if (value === "" || value === null || value === undefined) return 0;

  const parsedNumber = parseInt(value, 10);

  if (isNaN(parsedNumber)) return NaN;

  return parsedNumber;
};

/**
 * Formatea un valor numérico para la interfaz, forzando siempre la cantidad de decimales.
 * Útil para mostrar precios (ej: "150.00") o pesos (ej: "1.500") de forma consistente.
 *
 * @param {string|number} value El valor a formatear.
 * @param {number} decimals La cantidad exacta de decimales visuales.
 * @returns {string} El texto formateado, o un string vacío si es inválido.
 */
const formatForDisplay = (value, decimals) => {
  if (value === "" || value === null || value === undefined) return 0;

  const number = Number(
    typeof value === "string" ? value.replace(",", ".") : value,
  );

  if (isNaN(number)) return "-";

  return number.toFixed(decimals);
};

export { parseDecimal, parseInteger, formatForDisplay };
