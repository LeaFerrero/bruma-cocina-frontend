import React from "react";
import styles from "./SupplyCard.module.css";
import BasicCard from "../components/ui/cards/BasicCard.jsx";
import BasicButton from "../components/ui/buttons/BasicButton.jsx";
import ButtonGroup from "../components/ui/buttons/ButtonGroup.jsx";

function SupplyCard({ supply, onEdit, onDelete }) {
  const getStockVariant = () => {
    if (supply.currentStock <= 0) return "danger";
    if (supply.currentStock <= supply.minStock) return "warning";
    return "success";
  };

  return (
    <BasicCard title={supply.name} interactive variant={getStockVariant()}>
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
        <BasicButton text={"Editar"} variant="secondary" onClick={onEdit} />
        <BasicButton text={"Eliminar"} variant="danger" onClick={onDelete} />
      </ButtonGroup>
    </BasicCard>
  );
}

export default SupplyCard;
