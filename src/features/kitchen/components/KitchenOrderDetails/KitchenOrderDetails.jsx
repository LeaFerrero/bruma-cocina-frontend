import React from "react";
import styles from "./KitchenOrderDetails.module.css";

function KitchenOrderDetails({ order, children }) {
  if (!order) return null;

  return (
    <div className={styles.container}>
      {/* 1. Primero el Detalle a Preparar */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Detalle a Preparar</h3>
        <div className={styles.itemsList}>
          {order.items.map((orderItem, index) => (
            <div key={orderItem.id || index} className={styles.itemRow}>
              <p>
                {orderItem.name || orderItem.title}{" "}
                <strong>x{orderItem.quantity}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {order.notes && (
        <div className={`${styles.section} ${styles.noteWarning}`}>
          <p className={styles.textRow}>
            <strong>Nota:</strong> {order.notes}
          </p>
        </div>
      )}

      {children && <div className={styles.buttonsContainer}>{children}</div>}
    </div>
  );
}

export default KitchenOrderDetails;
