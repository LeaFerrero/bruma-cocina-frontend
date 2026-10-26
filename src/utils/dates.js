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
