import React from "react";
import styles from "./CatalogCard.module.css";
import { Card, Button } from "../../../../components/ui";

function CatalogCard({ meal, onClick }) {
  return (
    <Card title={meal.name} interactive>
      <div className={styles.cardDetail}>
        <p className={styles.description}>{meal.description}</p>
        <span className={styles.price}>${meal.price}</span>
      </div>
      <div className={styles.buttonsContainer}>
        <Button text={"Agregar"} onClick={onClick} />
      </div>
    </Card>
  );
}

export default CatalogCard;
