import React from "react";
import styles from "./OrderCard.module.css";
import Card from "../Card/Card";
import Button from "../../buttons/Button/Button";
import ButtonGroup from "../../buttons/ButtonGroup/ButtonGroup";

function OrderCard({ order, onDetails }) {
  return (
    <Card title={order.orderId} interactive>
      <div className={styles.cardDetail}>
        <p className={styles.description}>
          <strong>Hora:</strong> {order.time}
        </p>
        <p className={styles.status}>
          <strong>Estado:</strong> {order.status}
        </p>
      </div>
      <ButtonGroup>
        <Button text={"Detalles"} onClick={onDetails} />
      </ButtonGroup>
    </Card>
  );
}

export default OrderCard;
