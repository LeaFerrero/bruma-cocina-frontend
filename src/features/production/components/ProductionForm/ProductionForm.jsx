import React, { useState } from "react";
import styles from "./ProductionForm.module.css";
import {
  Form,
  AutocompleteInput,
  Button,
  ButtonGroup,
  EditableList,
  EditableListItem,
} from "../../../../components/ui";

function ProductionForm({
  availableMeals = [],
  onSave,
  onCancel,
  formError = null,
  fieldErrors = {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [searchError, setSearchError] = useState(null);

  const handleAddItem = () => {
    setSearchError(null);

    if (inputValue.trim() === "") return;

    const selectedMeal = availableMeals.find(
      (meal) => meal.name.toLowerCase() === inputValue.trim().toLowerCase(),
    );

    if (!selectedMeal) {
      setSearchError("Por favor, seleccione una vianda válida de la lista.");
      return;
    }

    const exists = selectedMeals.find((meal) => meal._id === selectedMeal._id);
    if (exists) {
      setSearchError(`La vianda "${selectedMeal.name}" ya está en la lista.`);
      return;
    }

    const mealWithQuantity = {
      ...selectedMeal,
      quantity: "",
    };

    setSelectedMeals([...selectedMeals, mealWithQuantity]);
    setInputValue("");
  };

  const handleQuantityChange = (id, newQuantity) => {
    setSelectedMeals(
      selectedMeals.map((meal) =>
        meal._id === id ? { ...meal, quantity: newQuantity } : meal,
      ),
    );
  };

  const handleRemoveItem = (id) => {
    setSelectedMeals(selectedMeals.filter((meal) => meal._id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchError(null);

    const cleanMeals = selectedMeals.map((meal) => ({
      _id: meal._id,
      quantity: meal.quantity,
    }));

    onSave({ meals: cleanMeals });
  };

  const handleCancel = () => {
    setInputValue("");
    setSelectedMeals([]);
    setSearchError(null);

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Form onSubmit={handleSubmit} error={formError}>
      <div>
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <AutocompleteInput
              label="Seleccionar una vianda"
              options={availableMeals.map((meal) => meal.name) || []}
              placeholder="Nombre de la vianda..."
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

        {(searchError || fieldErrors.meals) && (
          <span className={styles.inlineError}>
            {searchError || fieldErrors.meals}
          </span>
        )}
      </div>

      <EditableList
        title="Viandas seleccionadas:"
        isEmpty={selectedMeals.length === 0}
        emptyMessage="No hay viandas seleccionadas"
      >
        {selectedMeals.map((meal, index) => (
          <EditableListItem
            key={meal._id}
            name={meal.name}
            quantity={meal.quantity}
            suffix="cant."
            error={fieldErrors[`meals.${index}.quantity`]}
            onQuantityChange={(newQuantity) =>
              handleQuantityChange(meal._id, newQuantity)
            }
            onRemove={() => handleRemoveItem(meal._id)}
          />
        ))}
      </EditableList>

      <ButtonGroup>
        <Button
          text="Registrar"
          variant="primary"
          type="submit"
          disabled={selectedMeals.length === 0}
        />
        <Button
          text="Cancelar"
          variant="cancel"
          type="button"
          onClick={handleCancel}
        />
      </ButtonGroup>
    </Form>
  );
}

export default ProductionForm;
