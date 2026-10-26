import React from "react";
import styles from "./KitchenOrderDetails.module.css";

function KitchenOrderDetails({ order, children }) {
  if (!order) return null;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Detalle a Preparar</h3>
        <div className={styles.itemsList}>
          {order.meals.map((meal, index) => (
            <div key={meal._id || index} className={styles.itemRow}>
              <p>
                {meal.name} <strong>x{meal.quantity}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {order.meals.notes && (
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
