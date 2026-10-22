import React, { useState } from "react";
import {
  Form,
  AutocompleteInput,
  Button,
  ButtonGroup,
  EditableList,
  EditableListItem,
} from "../../../../components/ui";
import styles from "./SupplyEntryForm.module.css";

function SupplyEntryForm({
  availableSupplies,
  onSave,
  onCancel,
  formError = null,
  fieldErrors = {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedSupplies, setSelectedSupplies] = useState([]);
  const [searchError, setSearchError] = useState(null);

  const handleAddItem = () => {
    setSearchError(null);

    if (inputValue.trim() === "") return;

    const selectedSupply = availableSupplies.find(
      (supply) => supply.name.toLowerCase() === inputValue.trim().toLowerCase(),
    );

    if (!selectedSupply) {
      setSearchError("Por favor, seleccione un insumo válido de la lista.");
      return;
    }

    const exists = selectedSupplies.find(
      (item) => item._id === selectedSupply._id,
    );
    if (exists) {
      setSearchError(`El insumo "${selectedSupply.name}" ya está en la lista.`);
      return;
    }

    const itemWithQuantity = {
      ...selectedSupply,
      quantity: "",
    };

    setSelectedSupplies([...selectedSupplies, itemWithQuantity]);
    setInputValue("");
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchError(null);
    onSave({ items: selectedSupplies });
  };

  return (
    <Form onSubmit={handleSubmit} error={formError}>
      <div>
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <AutocompleteInput
              label="Seleccionar un insumo"
              options={availableSupplies.map((supply) => supply.name)}
              placeholder="Nombre del insumo..."
              value={inputValue}
              onChange={setInputValue}
            />
          </div>
          <ButtonGroup>
            <Button
              text="Agregar"
              variant="primary"
              type="button"
              onClick={handleAddItem}
            />
          </ButtonGroup>
        </div>

        {(searchError || fieldErrors.items) && (
          <span className={styles.inlineError}>
            {searchError || fieldErrors.items}
          </span>
        )}
      </div>

      <EditableList
        title="Insumos seleccionados:"
        isEmpty={selectedSupplies.length === 0}
        emptyMessage="No hay insumos seleccionados"
      >
        {selectedSupplies.map((item, index) => (
          <EditableListItem
            key={item._id}
            name={item.name}
            quantity={item.quantity}
            suffix={item.unit || "kg"}
            error={fieldErrors[`items.${index}.quantity`]}
            onQuantityChange={(newQuantity) =>
              handleQuantityChange(item._id, newQuantity)
            }
            onRemove={() => handleRemoveItem(item._id)}
          />
        ))}
      </EditableList>

      {/* Contenedor con margin-top dinámico para empujar los botones al fondo */}
      <div style={{ marginTop: "auto" }}>
        <ButtonGroup>
          <Button text="Registrar ingreso" variant="primary" type="submit" />
          <Button
            text="Cancelar"
            variant="cancel"
            type="button"
            onClick={onCancel}
          />
        </ButtonGroup>
      </div>
    </Form>
  );
}

export default SupplyEntryForm;
