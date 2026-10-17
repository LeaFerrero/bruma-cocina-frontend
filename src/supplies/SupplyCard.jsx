import React from "react";
import styles from "./SupplyCard.module.css";
import BasicCard from "../components/ui/cards/BasicCard.jsx";
import BasicButton from "../components/ui/buttons/BasicButton.jsx";
import ButtonGroup from "../components/ui/buttons/ButtonGroup.jsx";

function SupplyCard({ supply, onEdit, onDelete }) {
  return (
    <BasicCard title={supply.name} interactive>
      <div className={styles.cardDetail}>
        <p>
          <strong>Stock actual: </strong>
          {supply.stock} {supply.unit}
        </p>
        <p>
          <strong>Stock minimo: </strong>
          {supply.minStock} {supply.unit}
        </p>
      </div>
      <ButtonGroup className={styles.buttonsContainer}>
        <BasicButton text={"Editar"} variant="secondary" onClick={onEdit} />
        <BasicButton text={"Eliminar"} variant="danger" onClick={onDelete} />
      </ButtonGroup>
    </BasicCard>
  );
}

export default SupplyCard;
