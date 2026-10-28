import React from "react";
import styles from "./KitchenOrderCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";
import { formatTime, formatDateForDisplay } from "../../../../utils/dates";
import { ORDER_STATUS_NAMES } from "../../utils/orderStatus";

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
          <strong>Estado:</strong> {ORDER_STATUS_NAMES[order.orderStatus]}
        </p>
      </div>
      <ButtonGroup>
        <Button text={"Detalles"} onClick={onDetails} />
      </ButtonGroup>
    </Card>
  );
}

export default OrderCard;
