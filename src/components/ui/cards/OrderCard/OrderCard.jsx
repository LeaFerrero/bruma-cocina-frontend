import React from "react";
import styles from "./OrderCard.module.css";
import Card from "../Card/Card";
import Button from "../../buttons/Button/Button";
import ButtonGroup from "../../buttons/ButtonGroup/ButtonGroup";
import { formatTime, formatDateForDisplay } from "../../../../utils/dates";

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
          <strong>Estado:</strong> {order.orderStatus}
        </p>
      </div>
      <ButtonGroup>
        <Button text={"Detalles"} onClick={onDetails} />
      </ButtonGroup>
    </Card>
  );
}

export default OrderCard;
