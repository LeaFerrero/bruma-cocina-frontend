/**
 * Formatea una fecha o timestamp a hora local de Argentina (HH:mm).
 *
 * @param {string|Date} dateString - La fecha de Mongoose (createdAt, etc.)
 * @returns {string} La hora formateada (ej: "22:45")
 */
export const formatTime = (dateString) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(dateString));
};

/**
 * Convierte una fecha en formato "YYYY-MM-DD" a "DD/MM/YYYY" para mostrar en la interfaz.
 *
 * @param {string} dateString - Fecha en formato string (ej: "2026-10-25")
 * @returns {string} Fecha formateada para humanos (ej: "25/10/2026")
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

/**
 * Obtiene la fecha operativa del negocio ("business date") en formato YYYY-MM-DD,
 * asegurando que se respete la zona horaria local de Argentina sin importar
 * en qué región o servidor esté alojada la aplicación (evitando desfasajes por UTC).
 *
 * Nota: Se utiliza el locale 'en-CA' (Canadá) porque formatea nativamente
 * las fechas como Año-Mes-Día (YYYY-MM-DD).
 *
 * @returns {string} La fecha actual en formato "YYYY-MM-DD" (ej: "2026-10-25").
 */
const getBusinessDate = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

export { getBusinessDate };
