import React from "react";
import styles from "./CatalogModal.module.css";
import { Modal, Button, ButtonGroup } from "../../../../components/ui";
import { formatForDisplay } from "../../../../utils/parsers";

function CatalogModal({ meal, isOpen, onClose }) {
  const API_URL = import.meta.env.VITE_STATIC_URL || "http://localhost:3000";

  if (!meal) return null;

  return (
    <Modal
      title={meal.name || "Detalle del Producto"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.modalLayout}>
        {meal.image && (
          <div className={styles.imageContainer}>
            <img
              src={`${API_URL}/uploads/${meal.image}`}
              alt={meal.name}
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.mealDetails}>
          <p className={styles.description}>
            <strong>Descripción:</strong>{" "}
            {meal.description || "Sin descripción disponible."}
          </p>

          <p>
            <strong>Categorias:</strong>{" "}
            {Array.isArray(meal.category)
              ? meal.category.join(", ")
              : meal.category || "General"}
          </p>

          <p>
            <strong>Precio:</strong> $ {formatForDisplay(meal.price, 2)}
          </p>

          <p>
            <strong>Stock disponible:</strong> {meal.currentStock} unidades
          </p>
        </div>

        <ButtonGroup>
          <Button text="Cerrar" onClick={onClose} variant="cancel" />
        </ButtonGroup>
      </div>
    </Modal>
  );
}

export default CatalogModal;
