import React from "react";
import styles from "./SupplyCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";

function SupplyCard({ supply, onEdit, onDelete }) {
  const getStockVariant = () => {
    if (supply.currentStock <= 0) return "danger";
    if (supply.currentStock <= supply.minStock) return "warning";
    return "success";
  };

  return (
    <Card title={supply.name} interactive variant={getStockVariant()}>
      <div className={styles.cardDetail}>
        <p className={styles.description}>
          <strong>Stock actual: </strong>
          {supply.currentStock} {supply.unit}
        </p>
        <p className={styles.description}>
          <strong>Stock mínimo: </strong>
          {supply.minStock} {supply.unit}
        </p>
        <p className={styles.price}>$ {supply.price}</p>
      </div>

      <ButtonGroup className={styles.buttonsContainer}>
        <Button text={"Editar"} variant="secondary" onClick={onEdit} />
        <Button text={"Eliminar"} variant="danger" onClick={onDelete} />
      </ButtonGroup>
    </Card>
  );
}

export default SupplyCard;
