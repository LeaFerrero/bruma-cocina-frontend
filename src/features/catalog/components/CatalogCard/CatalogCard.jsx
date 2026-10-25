import React from "react";
import styles from "./CatalogCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";

function CatalogCard({ meal, onClick }) {
  return (
    <Card title={meal.name} interactive>
      <div className={styles.cardDetail}>
        <p className={styles.description}>{meal.description}</p>
        <span className={styles.price}>${meal.price}</span>
      </div>
      <ButtonGroup>
        <Button
          text={meal.currentStock === 0 ? "Sin stock" : "Agregar al carrito"}
          onClick={onClick}
          disabled={meal.currentStock === 0}
        />
      </ButtonGroup>
    </Card>
  );
}

export default CatalogCard;
