import React, { useState, useEffect } from "react";
import styles from "./SupplyEntryModal.module.css";
import BasicModal from "../components/ui/modals/BasicModal";
import BasicButton from "../components/ui/buttons/BasicButton";
import ButtonGroup from "../components/ui/buttons/ButtonGroup";
import SupplyEntryForm from "./SupplyEntryForm";
import SupplyEntryItem from "./SupplyEntryItem";

function SupplyEntryModal({ availableSupplies, isOpen, onClose, onSaveLote }) {
  const [entryList, setEntryList] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setEntryList([]);
    }
  }, [isOpen]);

  const handleAddItem = (newItem) => {
    const exists = entryList.find((item) => item.name === newItem.name);
    if (exists) {
      setEntryList(
        entryList.map((item) =>
          item.name === newItem.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setEntryList([...entryList, newItem]);
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    setEntryList(
      entryList.map((item) =>
        item.id === id ? { ...item, quantity: Number(newQuantity) } : item,
      ),
    );
  };

  const handleRemoveItem = (id) => {
    setEntryList(entryList.filter((item) => item.id !== id));
  };

  const handleSubmitFinal = () => {
    onSaveLote(entryList);
    setEntryList([]);
    onClose();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose} title="Ingresar insumos">
      <div className={styles.modalLayout}>
        <SupplyEntryForm
          availableSupplies={availableSupplies}
          onAdd={handleAddItem}
        />

        <ul className={styles.itemsList}>
          {entryList.map((item) => (
            <SupplyEntryItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))}
        </ul>

        <ButtonGroup>
          <BasicButton
            text="Registrar"
            variant="primary"
            onClick={handleSubmitFinal}
          />
          <BasicButton text="Cancelar" variant="cancel" onClick={onClose} />
        </ButtonGroup>
      </div>
    </BasicModal>
  );
}

export default SupplyEntryModal;
