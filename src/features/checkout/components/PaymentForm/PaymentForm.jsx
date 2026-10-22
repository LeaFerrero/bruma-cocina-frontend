import React, { useState } from "react";
import styles from "./PaymentForm.module.css";
import {
  Form,
  Button,
  DropdownInput,
  ButtonGroup,
} from "../../../../components/ui";

function PaymentForm({ order, onConfirm, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState("efectivo");

  const paymentOptions = [
    { value: "efectivo", text: "Efectivo" },
    { value: "debito", text: "Tarjeta de Débito" },
    { value: "credito", text: "Tarjeta de Crédito" },
    { value: "mercadopago", text: "MercadoPago / Transferencia" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(paymentMethod);
  };

  return (
    <Form title="Registrar Cobro" onSubmit={handleSubmit}>
      <div className={styles.totalBox}>
        <p>Total a cobrar:</p>
        <p className={styles.totalAmount}>${order.total}</p>
      </div>

      <DropdownInput
        id="paymentMethod"
        label="Método de pago"
        value={paymentMethod}
        options={paymentOptions}
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
