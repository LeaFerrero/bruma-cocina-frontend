import React from "react";
import styles from "./MealCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";

function MealCard({ meal, onEdit, onDelete }) {
  const getStockVariant = () => {
    if (meal.currentStock <= 0) return "danger";
    if (meal.currentStock <= 10) return "warning";
    return "success";
  };

  return (
    <Card title={meal.name} interactive variant={getStockVariant()}>
      <div className={styles.cardDetail}>
        <p>
          <strong>Stock actual: </strong>
          {meal.currentStock}
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
