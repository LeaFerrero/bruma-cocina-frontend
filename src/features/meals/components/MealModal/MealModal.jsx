import React, { useState, useEffect } from "react";
import styles from "./MealModal.module.css";
import {
  Modal,
  AutocompleteInput,
  Button,
  ButtonGroup,
} from "../../../../components/ui";
import IngredientItem from "../IngredientItem/IngredientItem";
import MealForm from "../MealForm/MealForm";

export default function MealModal({
  isOpen,
  onClose,
  mealToEdit,
  availableSupplies = [],
  onSave,
  formError = null,
  fieldErrors = {},
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [ingredients, setIngredientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [localError, setLocalError] = useState(null);
  const [currentFieldErrors, setCurrentFieldErrors] = useState({});

  useEffect(() => {
    setCurrentFieldErrors(fieldErrors);
  }, [fieldErrors]);

  useEffect(() => {
    if (mealToEdit) {
      setFormData({
        name: mealToEdit.name || "",
        category: mealToEdit.category || "",
        price: mealToEdit.price || "",
        description: mealToEdit.description || "",
      });
      setIngredientes(mealToEdit.ingredients || []);
    } else {
      setFormData({ name: "", category: "", price: "", description: "" });
      setIngredientes([]);
    }
    setSearchTerm("");
    setLocalError(null);
    setCurrentFieldErrors({});
  }, [mealToEdit, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const suppliesNames = availableSupplies.map((supply) => supply.name);

  const handleAddIngredient = () => {
    setLocalError(null);
    if (!searchTerm.trim()) return;

    const ingredientFound = availableSupplies.find(
      (supply) => supply.name.toLowerCase() === searchTerm.toLowerCase(),
    );

    if (!ingredientFound) {
      setLocalError("Insumo no encontrado.");
      return;
    }
    if (
      ingredients.some((ingredient) => ingredient._id === ingredientFound._id)
    ) {
      setLocalError("Este ingrediente ya está en la receta.");
      return;
    }

    setIngredientes([
      ...ingredients,
      {
        _id: ingredientFound._id,
        name: ingredientFound.name,
        unit: ingredientFound.unit || "gr",
        quantity: 1,
      },
    ]);
    setSearchTerm("");

    setCurrentFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy.ingredients;
      return copy;
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    setIngredientes((prev) =>
      prev.map((ingredient) =>
        ingredient._id === id
          ? { ...ingredient, quantity: newQuantity }
          : ingredient,
      ),
    );
  };

  const handleRemoveIngredient = (id) => {
    setIngredientes((prev) =>
      prev.filter((ingredient) => ingredient._id !== id),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price),
      ingredients,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mealToEdit ? "Editar Vianda" : "Registrar Vianda"}
    >
      <div className={styles.modalLayout}>
        <div>
          <MealForm
            id="meal-form"
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            formError={formError}
            fieldErrors={currentFieldErrors}
          />
        </div>

        <div className={styles.recipeContainer}>
          <h3>Receta</h3>

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <AutocompleteInput
                label="Seleccionar insumo"
                options={suppliesNames}
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar insumo..."
              />
            </div>
            <div>
              <Button
                type="button"
                text="Agregar"
                variant="primary"
                onClick={handleAddIngredient}
              />
            </div>
          </div>
          {localError && (
            <span className={styles.inlineError}>{localError}</span>
          )}
          <div className={styles.ingredientsList}>
            {ingredients.length === 0 ? (
              <p>No hay ingredients agregados.</p>
            ) : (
              ingredients.map((ingredient, index) => (
                <IngredientItem
                  key={ingredient._id}
                  item={ingredient}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveIngredient}
                  error={currentFieldErrors[`ingredients.${index}.quantity`]}
                />
              ))
            )}

            {currentFieldErrors.ingredients && (
              <span className={styles.errorMessage}>
                {currentFieldErrors.ingredients}
              </span>
            )}
          </div>
        </div>
      </div>

      <ButtonGroup>
        <Button
          type="submit"
          form="meal-form"
          text="Guardar"
          variant="primary"
        />
        <Button
          type="button"
          text="Cancelar"
          variant="cancel"
          onClick={onClose}
        />
      </ButtonGroup>
    </Modal>
  );
}
