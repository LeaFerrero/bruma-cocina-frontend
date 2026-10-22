import React from "react";
import styles from "./ProductionItem.module.css";
import { Input, Button } from "../../../../components/ui";

function ProductionItem({ item, onQuantityChange, onRemove, error }) {
  return (
    <li className={styles.itemRow}>
      <div className={styles.nameContainer}>
        <span className={styles.itemName}>{item.name}</span>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.inputGroup}>
          <Input
            inputMode="decimal"
            value={item.quantity}
            onChange={(e) =>
              onQuantityChange && onQuantityChange(item._id, e.target.value)
            }
            additionalClass={styles.groupedInput}
            maxLength={10}
          />
          <span className={styles.inputAddon}>cant.</span>
        </div>

        <Button
          text="X"
          variant="danger"
          isSquare={true}
          ariaLabel={`Eliminar ${item.name}`}
          onClick={() => onRemove(item._id)}
        />
      </div>
    </li>
  );
}

export default ProductionItem;
