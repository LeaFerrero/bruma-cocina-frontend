import React, { useState } from "react";
import styles from "./PaymentForm.module.css";
import {
  Form,
  Button,
  DropdownInput,
  ButtonGroup,
} from "../../../../components/ui";
import { PAYMENT_METHODS_OPTIONS } from "../../utils/paymentMethods";
import { formatForDisplay } from "../../../../utils/parsers";

function PaymentForm({ order, onConfirm, onCancel, formError }) {
  const [paymentMethod, setPaymentMethod] = useState("efectivo");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(paymentMethod);
  };

  return (
    <Form onSubmit={handleSubmit} error={formError}>
      <div className={styles.totalBox}>
        <p>Total a cobrar:</p>
        <p className={styles.totalAmount}>
          ${formatForDisplay(order.total, 2)}
        </p>
      </div>

      <DropdownInput
        id="paymentMethod"
        label="Método de pago"
        value={paymentMethod}
        options={PAYMENT_METHODS_OPTIONS}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />

      <ButtonGroup>
        <Button
          text="Confirmar Pago"
          type="submit"
          className={styles.submitButton}
        />
        <Button text="Volver al resumen" onClick={onCancel} variant="cancel" />
      </ButtonGroup>
    </Form>
  );
}

export default PaymentForm;
