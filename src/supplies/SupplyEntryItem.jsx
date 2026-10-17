// SupplyEntryItem.jsx
import React from "react";
import styles from "./SupplyEntryItem.module.css";
import BasicButton from "../components/ui/buttons/BasicButton";
import BasicInput from "../components/ui/inputs/BasicInput";

function SupplyEntryItem({ item, onQuantityChange, onRemove }) {
  const unit = item.unit || "kg";

  return (
    <li className={styles.itemRow}>
      <span className={styles.itemName}>{item.name}</span>

      <div className={styles.controlsContainer}>
        <div className={styles.inputGroup}>
          <BasicInput
            type="number"
            variant="numeric"
            min="0.001"
            step="0.001"
            value={item.quantity}
            onChange={(e) =>
              onQuantityChange && onQuantityChange(item.id, e.target.value)
            }
            additionalClass={styles.groupedInput}
          />
          <span className={styles.inputAddon}>{unit}</span>
        </div>

        <BasicButton
          text="X"
          variant="danger"
          isSquare={true}
          ariaLabel={`Eliminar ${item.name}`}
          onClick={() => onRemove(item.id)}
        />
      </div>
    </li>
  );
}

export default SupplyEntryItem;
