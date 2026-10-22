import React from "react";
import styles from "./CheckoutOrderDetails.module.css";

function CheckoutOrderDetails({ order, children }) {
  if (!order) return null;

  return (
    <div className={styles.checkoutOrderContainer}>
      {/* Datos del Cliente */}
      {order.customer && (
        <div className={styles.checkoutOrderSection}>
          <h3 className={styles.checkoutOrderTitle}>Datos del Cliente</h3>

          <p>
            <strong>Nombre:</strong> {order.customer.name}{" "}
            {order.customer.lastName}
          </p>
          <p>
            <strong>Teléfono:</strong> {order.customer.phone}
          </p>
          <p>
            <strong>Dirección:</strong> {order.customer.address}
          </p>
          {order.customer.notes && (
            <p>
              <strong>Notas:</strong> {order.customer.notes}
            </p>
          )}
        </div>
      )}

      {/* Detalle del Pedido */}
      <div className={styles.checkoutOrderSection}>
        <h3 className={styles.checkoutOrderTitle}>Detalle del Pedido</h3>
        <div className={styles.checkoutOrderItemsList}>
          {order.items &&
            order.items.map((orderItem, index) => (
              <div
                key={orderItem._id || orderItem.id || index}
                className={styles.checkoutOrderItemRow}
              >
                <p>
                  {orderItem.name || orderItem.title} x{orderItem.quantity}
                </p>
                <p>${orderItem.price * orderItem.quantity}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Total del Pedido */}
      <div className={styles.checkoutOrderTotalContainer}>
        <p className={styles.checkoutOrderTotal}>Total:</p>
        <p className={styles.checkoutOrderTotalAmount}>${order.total}</p>
      </div>

      {/* Botones de acción adicionales */}
      {children && <div className={styles.buttonsContainer}>{children}</div>}
    </div>
  );
}

export default CheckoutOrderDetails;
