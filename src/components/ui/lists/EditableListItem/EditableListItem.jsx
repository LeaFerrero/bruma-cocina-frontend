function EditableListItem({
  itemId,
  name,
  quantity,
  suffix,
  error,
  onQuantityChange,
  onRemove,
}) {
  const inputId = `quantity-${itemId}`;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <li className={styles.itemRow}>
      <div className={styles.nameContainer}>
        <span className={styles.itemName}>{name}</span>
        {error && (
          <span id={errorId} className={styles.errorMessage}>
            {error}
          </span>
        )}
      </div>

      <div className={styles.controlsContainer}>
        <div className={styles.inputGroup}>
          <Input
            id={inputId}
            aria-label={`Cantidad de ${name} en ${suffix}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={errorId}
            inputMode="decimal"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            additionalClass={`${styles.groupedInput} ${error ? styles.inputError : ""}`.trim()}
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
