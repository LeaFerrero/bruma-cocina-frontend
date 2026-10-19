import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Form,
  AutocompleteInput,
  Button,
  ButtonGroup,
} from "../../../../components/ui";
import styles from "./SupplyEntryForm.module.css";

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
    <Form onSubmit={handleSubmit} error={localError || formError}>
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
          <Button text="Agregar" variant="primary" type="submit" />
        </ButtonGroup>
      </div>
    </Form>
  );
}

export default SupplyEntryForm;
