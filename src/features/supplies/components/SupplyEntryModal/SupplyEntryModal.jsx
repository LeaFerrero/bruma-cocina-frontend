import React, { useState, useEffect } from "react";
import styles from "./SupplyEntryModal.module.css";
import { Modal, Button, ButtonGroup } from "../../../../components/ui";
import SupplyEntryForm from "../SupplyEntryForm/SupplyEntryForm";
import SupplyEntryItem from "../SupplyEntryItem/SupplyEntryItem";

function SupplyEntryModal({
  availableSupplies,
  isOpen,
  onClose,
  onSave,
  formError = null,
  fieldErrors = {},
}) {
  const [selectedSupplies, setSelectedSupplies] = useState([]);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedSupplies([]);
      setLocalError(null);
    }
  }, [isOpen]);

  const handleAddItem = (newItem) => {
    const exists = selectedSupplies.find((item) => item._id === newItem._id);

    if (exists) {
      setLocalError(`El insumo "${newItem.name}" ya está en la lista.`);
      return;
    }

    const itemWithQuantity = {
      ...newItem,
      quantity: "",
    };

    setSelectedSupplies([...selectedSupplies, itemWithQuantity]);
    setLocalError(null);
  };

  const handleQuantityChange = (id, newQuantity) => {
    setSelectedSupplies(
      selectedSupplies.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id) => {
    setSelectedSupplies(selectedSupplies.filter((item) => item._id !== id));
    setLocalError(null);
  };

  const handleSubmit = () => {
    setLocalError(null);
    onSave(selectedSupplies);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ingresar insumos">
      <div className={styles.modalLayout}>
        <SupplyEntryForm
          availableSupplies={availableSupplies}
          onAdd={handleAddItem}
          formError={localError || formError}
        />

        <ul className={styles.itemsList}>
          {selectedSupplies.length > 0 ? (
            selectedSupplies.map((item, index) => (
              <SupplyEntryItem
                key={item._id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                error={fieldErrors[`${index}.quantity`]}
              />
            ))
          ) : (
            <li className={styles.emptyMessage}>
              No hay insumos seleccionados
            </li>
          )}
        </ul>

        <div className={styles.buttonsContainer}>
          <ButtonGroup>
            <Button text="Registrar" variant="primary" onClick={handleSubmit} />
            <Button text="Cancelar" variant="cancel" onClick={onClose} />
          </ButtonGroup>
        </div>
      </div>
    </Modal>
  );
}

export default SupplyEntryModal;
