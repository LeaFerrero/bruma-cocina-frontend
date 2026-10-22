import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal({
  title,
  isOpen,
  onClose,
  children,
  maxWidth,
  closeOnOutsideClick = false,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOutsideClick) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onMouseDown={handleOverlayClick}>
      <div
        className={styles.modalContainer}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          {title && <h3 className={styles.modalTitle}>{title}</h3>}
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.modalChildrenContainer}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
