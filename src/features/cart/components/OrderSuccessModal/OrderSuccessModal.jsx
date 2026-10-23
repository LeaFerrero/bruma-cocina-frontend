import React from "react";
import styles from "./OrderSuccessModal.module.css";
import { Modal, Button, ButtonGroup } from "../../../../components/ui";

function OrderSuccessModal({ isOpen, onClose, orderCode }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="¡Pedido Confirmado!">
      <div className={styles.successContainer}>
        <h2 className={styles.successTitle}>¡Gracias por su compra!</h2>
        <p>Hemos recibido tu pedido.</p>

        <div className={styles.codeBox}>
          <p className={styles.codeLabel}>Su código de pedido es:</p>
          <p className={styles.codeValue}>{orderCode}</p>
        </div>
      </div>
      <ButtonGroup>
        <Button variant="primary" onClick={onClose} text="Entendido" />
      </ButtonGroup>
    </Modal>
  );
}

export default OrderSuccessModal;
