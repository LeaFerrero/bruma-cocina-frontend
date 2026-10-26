import React from "react";
import Modal from "../Modal/Modal";
import styles from "./ConfirmModal.module.css";
import Button from "../../buttons/Button/Button";
import ButtonGroup from "../../buttons/ButtonGroup/ButtonGroup";

function ConfirmModal({
  title,
  isOpen,
  onClose,
  onConfirm,
  isDanger = false,
  message,
  confirmText,
  cancelText = "Cancelar",
}) {
  const defaultConfirmText = isDanger ? "Borrar" : "Confirmar";
  const finalConfirmText = confirmText || defaultConfirmText;

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <p className={styles.messageText}>{message}</p>
      <ButtonGroup>
        <Button
          text={finalConfirmText}
          variant={isDanger ? "danger" : "primary"}
          onClick={onConfirm}
        />
        <Button text={cancelText} variant="cancel" onClick={onClose} />
      </ButtonGroup>
    </Modal>
  );
}

export default ConfirmModal;
