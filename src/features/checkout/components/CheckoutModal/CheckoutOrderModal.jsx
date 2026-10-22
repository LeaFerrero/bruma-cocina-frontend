import React, { useState, useEffect } from "react";
import styles from "./CheckoutOrderModal.module.css";
import { Modal, Button, ButtonGroup } from "../../../../components/ui";
import CheckoutOrderDetails from "../CheckoutOrderDetails/CheckoutOrderDetails";
import PaymentForm from "../PaymentForm/PaymentForm";

function CheckoutOrderModal({
  order,
  isOpen,
  onClose,
  onProcessPayment,
  onCancel,
}) {
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsPaying(false);
  }, [isOpen, order]);

  if (!order) return null;

  return (
    <Modal title={order.orderId} isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalLayout}>
        {!isPaying ? (
          <CheckoutOrderDetails
            order={order}
            showPrices={true}
            showCustomerData={true}
          >
            <ButtonGroup>
              <Button text="Registrar pago" onClick={() => setIsPaying(true)} />
              <Button
                text="Cancelar comanda"
                onClick={onCancel}
                variant="danger"
              />
            </ButtonGroup>
          </CheckoutOrderDetails>
        ) : (
          <PaymentForm
            order={order}
            onConfirm={(paymentMethod) => {
              onProcessPayment(order.orderId, paymentMethod);
            }}
            onCancel={() => setIsPaying(false)}
          />
        )}
      </div>
    </Modal>
  );
}

export default CheckoutOrderModal;
