import React, { useState } from "react";
import styles from "./SupplyEntryForm.module.css";
import BasicForm from "../components/ui/forms/BasicForm";
import AutocompleteInput from "../components/ui/inputs/AutocompleteInput";
import BasicButton from "../components/ui/buttons/BasicButton";
import ButtonGroup from "../components/ui/buttons/ButtonGroup";

function SupplyEntryForm({ availableSupplies, onAdd }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const selectedSupply = availableSupplies.find(
      (supply) => supply.name.toLowerCase() === inputValue.trim().toLowerCase(),
    );

    if (!selectedSupply) {
      alert("Por favor, selecciona un insumo válido de la lista.");
      return;
    }

    const newItem = {
      ...selectedSupply,
      quantity: 1,
    };

    onAdd(newItem);
    setInputValue("");
  };

  return (
    <BasicForm onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
          <label>Seleccionar insumo</label>
          <AutocompleteInput
            options={availableSupplies.map((supply) => supply.name)}
            placeholder="Nombre del insumo"
            value={inputValue}
            onChange={setInputValue}
          />
        </div>
        <ButtonGroup>
          <BasicButton text="Agregar" variant="primary" type="submit" />
        </ButtonGroup>
      </div>
    </BasicForm>
  );
}

export default SupplyEntryForm;
