import Modal from "../Modal/Modal";
import styles from "./ConfirmModal.module.css";
import Button from "../../buttons/Button/Button";

import React from "react";

function ConfirmModal({
  title,
  isOpen,
  onClose,
  onConfirm,
  isDanger = false,
  message,
}) {
  return (
    <>
      <Modal title={title} isOpen={isOpen} onClose={onClose}>
        <p className={styles.messageText}>{message}</p>
        <div className={styles.buttonsContainer}>
          {isDanger ? (
            <Button text="Borrar" variant="danger" onClick={onConfirm} />
          ) : (
            <Button text="Confirmar" variant="primary" onClick={onConfirm} />
          )}

          <Button text="Cancelar" variant="cancel" onClick={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default ConfirmModal;
