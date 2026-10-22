import React from "react";
import { Modal, Button, ButtonGroup } from "../../../../components/ui";
import KitchenOrderDetTails from "../KitchenOrderDetails/KitchenOrderDetails";
import styles from "./KitchenOrderModal.module.css";

function KitchenOrderModal({ order, isOpen, onClose, onDispatch, onCancel }) {
  if (!order) return null;

  return (
    <Modal title={order.orderId} isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalLayout}>
        <KitchenOrderDetTails order={order} showNotes={true}>
          <ButtonGroup>
            <Button text="Despachar" onClick={onDispatch} />
            <Button
              text="Cancelar comanda"
              onClick={onCancel}
              variant="danger"
            />
          </ButtonGroup>
        </KitchenOrderDetTails>
      </div>
    </Modal>
  );
}

export default KitchenOrderModal;
