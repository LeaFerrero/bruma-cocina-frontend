/**
 * Clase de error personalizada para estandarizar el manejo de excepciones en el frontend.
 * Extiende la clase nativa Error para preservar el stack trace del navegador.
 *
 * @class AppError
 * @extends {Error}
 */
class AppError extends Error {
  /**
   * Crea una instancia de AppError.
   *
   * @param {string} message - Mensaje descriptivo del error para mostrar al usuario.
   * @param {number} [statusCode=500] - Código de estado HTTP devuelto por el servidor (ej. 400, 401, 404, 500).
   * @param {string} [status="error"] - Clasificación del error ("fail" para errores del cliente 4xx, "error" para 5xx).
   * @param {object|null} [details=null] - Detalles adicionales del error, típicamente un objeto con campos fallidos de express-validator.
   * @param {string} [errorCode="UNKNOWN_ERROR"] - Código interno estandarizado (ej. "VALIDATION_ERROR", "UNAUTHORIZED").
   */
  constructor(
    message,
    statusCode = 500,
    status = "error",
    details = null,
    errorCode = "UNKNOWN_ERROR",
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = status;
    this.details = details;
    this.errorCode = errorCode;
  }
}

export default AppError;
