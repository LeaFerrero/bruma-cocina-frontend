import React from "react";
import styles from "./EditableListItem.module.css";
import Input from "../../inputs/Input/Input";
import Button from "../../buttons/Button/Button";

function EditableListItem({
  name,
  quantity,
  suffix,
  error,
  onQuantityChange,
  onRemove,
}) {
  return (
    <li className={styles.itemRow}>
      <div className={styles.nameContainer}>
        <span className={styles.itemName}>{name}</span>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>

      <div className={styles.controlsContainer}>
        <div className={styles.inputGroup}>
          <Input
            inputMode="decimal"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            additionalClass={styles.groupedInput}
            maxLength={10}
          />
          <span className={styles.inputAddon}>{suffix}</span>
        </div>

        <Button
          text="X"
          variant="danger"
          isSquare={true}
          ariaLabel={`Eliminar ${name}`}
          onClick={onRemove}
        />
      </div>
    </li>
  );
}

export default EditableListItem;
