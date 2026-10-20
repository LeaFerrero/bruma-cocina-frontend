import React from "react";
import styles from "./MealCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";

function MealCard({ meal, onEdit, onDelete }) {
  return (
    <Card title={meal.name} interactive>
      <div className={styles.cardDetail}>
        <p>
          <strong>Stock actual: </strong>
          {meal.stock}
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
