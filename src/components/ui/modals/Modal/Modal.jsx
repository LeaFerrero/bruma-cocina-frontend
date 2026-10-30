import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import Button from "../../buttons/Button/Button";
import { MdClose } from "react-icons/md";

function Modal({
  title,
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = false,
  error,
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
          <Button
            text={<MdClose size={24} aria-hidden="true" />}
            variant="ghost"
            isSquare={true}
            ariaLabel="Cerrar"
            onClick={onClose}
          />
        </div>

        {error && (
          <div className={styles.modalError} role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className={styles.modalChildrenContainer}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
