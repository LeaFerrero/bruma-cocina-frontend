import React from "react";
import styles from "./MealCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";
import { formatForDisplay } from "../../../../utils/parsers";

function MealCard({ meal, onEdit, onDelete }) {
  const getStockVariant = () => {
    if (meal.currentStock <= 0) return "danger";
    if (meal.currentStock <= meal.minStock) return "warning";
    return "success";
  };

  return (
    <Card title={meal.name} interactive variant={getStockVariant()}>
      <div className={styles.cardDetail}>
        <p>
          <strong>Stock actual: </strong>
          {meal.currentStock}
        </p>
        <p>
          <strong>Stock mínimo: </strong>
          {meal.minStock}
        </p>
        <p>
          <strong>{formatForDisplay(meal.price, 2)}</strong>
        </p>
      </div>
      <ButtonGroup>
        <Button text={"Editar"} variant="secondary" onClick={onEdit} />
        <Button text={"Eliminar"} variant="danger" onClick={onDelete} />
      </ButtonGroup>
    </Card>
  );
}

export default MealCard;
