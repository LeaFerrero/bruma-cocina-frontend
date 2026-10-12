import React from "react";
import { createPortal } from "react-dom";
import styles from "./BasicModal.module.css";

function BasicModal({ title, isOpen, onClose, children, maxWidth }) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
        style={maxWidth ? { maxWidth: maxWidth } : {}}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default BasicModal;