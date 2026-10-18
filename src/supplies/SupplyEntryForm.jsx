import React, { useState } from "react";
import styles from "./SupplyEntryForm.module.css";
import BasicForm from "../components/ui/forms/BasicForm";
import AutocompleteInput from "../components/ui/inputs/AutocompleteInput";
import BasicButton from "../components/ui/buttons/BasicButton";
import ButtonGroup from "../components/ui/buttons/ButtonGroup";
import toast from "react-hot-toast";

function SupplyEntryForm({ availableSupplies, onAdd, formError = null }) {
  const [inputValue, setInputValue] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);

    if (inputValue.trim() === "") return;

    const selectedSupply = availableSupplies.find(
      (supply) => supply.name.toLowerCase() === inputValue.trim().toLowerCase(),
    );

    if (!selectedSupply) {
      setLocalError("Por favor, seleccione un insumo válido de la lista.");
      return;
    }

    onAdd(selectedSupply);
    setInputValue("");
  };

  return (
    <BasicForm onSubmit={handleSubmit} error={localError || formError}>
      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
          <AutocompleteInput
            label="Seleccionar un insumo"
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
