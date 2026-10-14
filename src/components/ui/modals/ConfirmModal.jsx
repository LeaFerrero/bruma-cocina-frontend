import BasicModal from "./BasicModal";
import BasicButton from "../buttons/BasicButton";
import styles from "./ConfirmModal.module.css";

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
      <BasicModal title={title} isOpen={isOpen} onClose={onClose}>
        <p className={styles.messageText}>{message}</p>
        <div className={styles.buttonsContainer}>
          {isDanger ? (
            <BasicButton text="Borrar" variant="danger" onClick={onConfirm} />
          ) : (
            <BasicButton
              text="Confirmar"
              variant="primary"
              onClick={onConfirm}
            />
          )}

          <BasicButton text="Cancelar" variant="cancel" onClick={onClose} />
        </div>
      </BasicModal>
    </>
  );
}

export default ConfirmModal;
