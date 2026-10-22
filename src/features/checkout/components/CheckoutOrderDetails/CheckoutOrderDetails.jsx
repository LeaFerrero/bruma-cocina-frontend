import React from "react";
import styles from "./CheckoutOrderDetails.module.css";

function CheckoutOrderSummary({ order, children }) {
  if (!order) return null;

  return (
    <div className={styles.container}>
      {order.customer && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Datos del Cliente</h3>
          {typeof order.customer === "object" ? (
            <>
              <p className={styles.textRow}>
                <strong>Nombre:</strong> {order.customer.name}{" "}
                {order.customer.lastName}
              </p>
              {order.customer.tel && (
                <p className={styles.textRow}>
                  <strong>Teléfono:</strong> {order.customer.tel}
                </p>
              )}
              {order.customer.address && (
                <p className={styles.textRow}>
                  <strong>Dirección:</strong> {order.customer.address}
                </p>
              )}
            </>
          ) : (
            <p className={styles.textRow}>
              <strong>Nombre:</strong> {order.customer}
            </p>
          )}
        </div>
      )}

      {/* Detalle del Pedido: Siempre incluye los precios en la caja */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Detalle del Pedido</h3>
        <div className={styles.itemsList}>
          {order.items.map((orderItem, index) => (
            <div key={orderItem.id || index} className={styles.itemRow}>
              <p>
                {orderItem.name || orderItem.title} x{orderItem.quantity}
              </p>
              <p>${orderItem.price * orderItem.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.totalContainer}>
        <p className={styles.total}>Total:</p>
        <p className={styles.totalAmount}>${order.total}</p>
      </div>

      {children && <div className={styles.buttonsContainer}>{children}</div>}
    </div>
  );
}

export default CheckoutOrderSummary;
