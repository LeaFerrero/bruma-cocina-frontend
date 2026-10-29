import React from "react";
import styles from "./SupplyCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";
import { formatForDisplay } from "../../../../utils/parsers";

function SupplyCard({ supply, onEdit, onDelete }) {
  const getStockVariant = () => {
    if (supply.currentStock <= 0) return "danger";
    if (supply.currentStock <= supply.minStock) return "warning";
    return "success";
  };

  return (
    <Card title={supply.name} interactive variant={getStockVariant()}>
      <div className={styles.cardDetail}>
        <p>
          <strong>Stock actual: </strong>
          {formatForDisplay(supply.currentStock, 3)} {supply.unit}
        </p>
        <p>
          <strong>Stock mínimo: </strong>
          {formatForDisplay(supply.minStock, 3)} {supply.unit}
        </p>
        <p>
          <strong>Precio: </strong>$ {formatForDisplay(supply.price, 2)}
        </p>
      </div>
      <ButtonGroup>
        <Button text={"Editar"} variant="secondary" onClick={onEdit} />
        <Button text={"Eliminar"} variant="danger" onClick={onDelete} />
      </ButtonGroup>
    </Card>
  );
}

export default SupplyCard;
