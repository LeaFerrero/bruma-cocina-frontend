import React from "react";
import styles from "./CheckoutOrderCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";
import { formatTime, formatDateForDisplay } from "../../../../utils/dates";
import { PAYMENT_STATUS_NAMES } from "../../utils/paymentStatus";
import { ORDER_STATUS_NAMES } from "../../../kitchen";

function OrderCard({ order, onDetails }) {
  return (
    <Card title={order.orderCode} interactive>
      <div className={styles.cardDetail}>
        <p className={styles.description}>
          <strong>Hora:</strong> {formatTime(order.createdAt)}
        </p>
        <p>
          <strong>Fecha:</strong> {formatDateForDisplay(order.dateOnly)}
        </p>
        <p className={styles.status}>
          <strong>Estado de comanda:</strong>{" "}
          {ORDER_STATUS_NAMES[order.orderStatus]}
        </p>
        <p className={styles.status}>
          <strong>Estado de pago:</strong>{" "}
          {PAYMENT_STATUS_NAMES[order.paymentStatus]}
        </p>
      </div>
      <ButtonGroup>
        <Button text={"Detalles"} onClick={onDetails} />
      </ButtonGroup>
    </Card>
  );
}

export default OrderCard;
