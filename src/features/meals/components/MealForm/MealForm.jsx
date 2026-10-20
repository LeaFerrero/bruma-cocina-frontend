import React, { useState, useEffect } from "react";
import styles from "./MealForm.module.css";
import {
  Form,
  Input,
  TextArea,
  AutocompleteInput,
  Button,
  ButtonGroup,
} from "../../../../components/ui";
import IngredientItem from "../IngredientItem/IngredientItem";

export default function MealForm({
  mealToEdit,
  availableSupplies,
  onSave,
  onCancel,
  formError = null,
  fieldErrors = {},
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    if (mealToEdit) {
      setFormData({
        name: mealToEdit.name || "",
        price: mealToEdit.price || "",
        category: mealToEdit.category || "",
        description: mealToEdit.description || "",
      });
      setIngredients(mealToEdit.ingredients || []);
    }
  }, [mealToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = () => {
    setSearchError(null);
    if (inputValue.trim() === "") return;

    const selectedSupply = availableSupplies.find(
      (supply) => supply.name.toLowerCase() === inputValue.trim().toLowerCase(),
    );

    if (!selectedSupply) {
      setSearchError(
        "Por favor, seleccione un ingrediente válido de la lista.",
      );
      return;
    }

    const exists = ingredients.find((item) => item._id === selectedSupply._id);
    if (exists) {
      setSearchError(
        `El ingrediente "${selectedSupply.name}" ya está en la receta.`,
      );
      return;
    }

    const itemWithQuantity = { ...selectedSupply, quantity: "" };
    setIngredients([...ingredients, itemWithQuantity]);
    setInputValue("");
  };

  const handleQuantityChange = (id, newQuantity) => {
    setIngredients(
      ingredients.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter((item) => item._id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mealDataToSave = {
      ...formData,
      ingredients: ingredients,
    };

    onSave(mealDataToSave, mealToEdit ? mealToEdit._id : null);
  };

  return (
    <Form
      id="meal-form"
      onSubmit={handleSubmit}
      title="Datos de la Vianda"
      error={formError}
    >
      <Input
        id="meal-name"
        name="name"
        label="Nombre"
        placeholder="Ingrese nombre"
        value={formData.name}
        onChange={handleChange}
        maxLength={50}
        required
        error={fieldErrors.name}
      />
      <div className={styles.rowInputs}>
        <Input
          id="price"
          label="Precio"
          name="price"
          inputMode="decimal"
          value={formData.price}
          onChange={handleChange}
          error={fieldErrors.price}
          required
          maxLength={10}
        />
        <Input
          id="meal-category"
          name="category"
          label="Categoría"
          placeholder="Ej: Vegano, Sin TACC"
          value={formData.category}
          onChange={handleChange}
          maxLength={100}
          required
          error={fieldErrors.category}
        />
      </div>
      <TextArea
        id="meal-description"
        name="description"
        label="Descripción"
        placeholder="Ingrese descripción"
        value={formData.description}
        onChange={handleChange}
        maxLength={250}
        rows={4}
        error={fieldErrors.description}
      />

      <div className={styles.recipeSection}>
        <h3 className={styles.sectionTitle}>Receta de la Vianda</h3>

        {/* Contenedor extra para proteger del gap del Form */}
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
                onClick={handleAddIngredient}
              />
            </ButtonGroup>
          </div>

          {searchError && (
            <span className={styles.inlineError}>{searchError}</span>
          )}
        </div>

        <ul className={styles.itemsList}>
          {ingredients.length > 0 ? (
            ingredients.map((item, index) => (
              <IngredientItem
                key={item._id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveIngredient}
                error={fieldErrors[`ingredients.${index}.quantity`]}
              />
            ))
          ) : (
            <li className={styles.emptyMessage}>
              No hay ingredientes en la receta
            </li>
          )}
        </ul>
      </div>

      <ButtonGroup>
        <Button text="Guardar Vianda" variant="primary" type="submit" />
        <Button
          text="Cancelar"
          variant="cancel"
          type="button"
          onClick={onCancel}
        />
      </ButtonGroup>
    </Form>
  );
}
