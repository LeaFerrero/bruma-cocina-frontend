import React from "react";
import styles from "./AlertBanner.module.css";
import { MdError, MdWarning, MdClose } from "react-icons/md";

function AlertBanner({ variant = "warning", title, items = [], onClose }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`${styles.banner} ${styles[variant]}`} role="alert">
      <div className={styles.content}>
        {variant === "error" ? (
          <MdError className={`${styles.icon} ${styles.errorIcon}`} size={22} />
        ) : (
          <MdWarning
            className={`${styles.icon} ${styles.warningIcon}`}
            size={22}
          />
        )}

        <div>
          {title && <h4 className={styles.title}>{title}</h4>}
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>: {item.stockValue} {item.unit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {onClose && (
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Cerrar"
        >
          <MdClose size={18} />
        </button>
      )}
    </div>
  );
}

export default AlertBanner;
