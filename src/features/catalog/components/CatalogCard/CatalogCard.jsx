import React from "react";
import styles from "./CatalogCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";
import { formatForDisplay } from "../../../../utils/parsers";

function CatalogCard({ meal, onClick, onDetails }) {
  const API_URL = import.meta.env.VITE_STATIC_URL || "http://localhost:3000";

  return (
    <Card title={meal.name} interactive>
      {meal.image && (
        <div className={styles.imageContainer}>
          <img
            src={`${API_URL}/uploads/${meal.image}`}
            alt={meal.name}
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.cardDetail}>
        <p className={styles.description}>{meal.description}</p>
        <span className={styles.price}>
          $ {formatForDisplay(meal.price, 2)}
        </span>
      </div>

      <ButtonGroup>
        <Button text="Detalles" onClick={onDetails} variant="secondary" />

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
