import React from "react";
import styles from "./CheckoutOrderDetails.module.css";
import { formatForDisplay } from "../../../../utils/parsers";

function CheckoutOrderDetails({ order, children }) {
  if (!order) return null;

  return (
    <div className={styles.checkoutOrderContainer}>
      {order && (
        <div className={styles.checkoutOrderSection}>
          <h3 className={styles.checkoutOrderTitle}>Datos del Cliente</h3>
          <p>
            <strong>Nombre:</strong> {order.name} {order.lastName}
          </p>
          <p>
            <strong>Teléfono:</strong> {order.phone}
          </p>
          <p>
            <strong>Dirección:</strong> {order.address}
          </p>
          {order.notes && (
            <p>
              <strong>Notas:</strong> {order.notes}
            </p>
          )}
        </div>
      )}

      <div className={styles.checkoutOrderSection}>
        <h3 className={styles.checkoutOrderTitle}>Detalle del Pedido</h3>
        <div className={styles.checkoutOrderItemsList}>
          {order.meals &&
            order.meals.map((meal, index) => (
              <div key={meal._id} className={styles.checkoutOrderItemRow}>
                <p>
                  {meal.name} x{meal.quantity}
                </p>
                <p>${formatForDisplay(meal.price * meal.quantity, 2)}</p>
              </div>
            ))}
        </div>
      </div>

      <div className={styles.checkoutOrderTotalContainer}>
        <p className={styles.checkoutOrderTotal}>Total:</p>
        <p className={styles.checkoutOrderTotalAmount}>
          ${formatForDisplay(order.total, 2)}
        </p>
      </div>

      {children && <div className={styles.buttonsContainer}>{children}</div>}
    </div>
  );
}

export default CheckoutOrderDetails;
