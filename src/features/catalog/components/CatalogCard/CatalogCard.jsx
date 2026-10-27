import React from "react";
import styles from "./CatalogCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";

function CatalogCard({ meal, onClick }) {
  // Obtenemos la URL base desde la variable de entorno de Vite
  // Agregamos un fallback por seguridad
  const API_URL = import.meta.env.VITE_STATIC_URL || "http://localhost:3000";
  console.log(meal.image);

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
