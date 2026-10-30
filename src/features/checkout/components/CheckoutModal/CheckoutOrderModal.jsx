import React, { useState, useEffect } from "react";
import styles from "./CheckoutOrderModal.module.css";
import { Modal, Button, ButtonGroup } from "../../../../components/ui";
import CheckoutOrderDetails from "../CheckoutOrderDetails/CheckoutOrderDetails";
import PaymentForm from "../PaymentForm/PaymentForm";
import { getBusinessDate } from "../../../../utils/dates";

function CheckoutOrderModal({
  order,
  isOpen,
  onClose,
  onProcessPayment,
  onCancel,
  formError,
}) {
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsPaying(false);
  }, [isOpen, order]);

  if (!order) return null;

  const handleConfirmPayment = (paymentMethod) => {
    onProcessPayment({
      order: order._id,
      totalAmount: order.total,
      paymentMethod: paymentMethod,
      paidAt: getBusinessDate(),
    });
  };

  return (
    <Modal
      title={`Comanda: ${order.orderCode}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.modalLayout}>
        {!isPaying ? (
          <CheckoutOrderDetails order={order}>
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
            onConfirm={handleConfirmPayment}
            onCancel={() => setIsPaying(false)}
            formError={formError}
          />
        )}
      </div>
    </Modal>
  );
}

export default CheckoutOrderModal;
