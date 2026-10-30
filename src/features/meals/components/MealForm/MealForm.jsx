import React, { useState, useEffect } from "react";
import styles from "./MealForm.module.css";
import {
  Form,
  Input,
  TextArea,
  ImageInput,
  AutocompleteInput,
  Button,
  ButtonGroup,
  EditableList,
  EditableListItem,
} from "../../../../components/ui";

export function MealForm({
  mealToEdit,
  availableSupplies,
  onSave,
  onCancel,
  formError = null,
  fieldErrors = {},
}) {
  const [mealData, setFormData] = useState({
    name: "",
    price: "",
    minStock: "",
    category: "",
    description: "",
    image: null,
  });

  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    if (mealToEdit) {
      setFormData({
        name: mealToEdit.name || "",
        price: mealToEdit.price || "",
        minStock:
          mealToEdit.minStock !== undefined && mealToEdit.minStock !== null
            ? mealToEdit.minStock
            : "",
        category: Array.isArray(mealToEdit.category)
          ? mealToEdit.category.join(", ")
          : mealToEdit.category || "",
        description: mealToEdit.description || "",
        image: mealToEdit.image || null,
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
    const categoriasArray =
      typeof mealData.category === "string"
        ? mealData.category
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => cat !== "")
        : mealData.category;

    const formattedIngredients = ingredients.map((ingredient) => ({
      _id: ingredient._id,
      quantity: ingredient.quantity,
    }));
    const mealDataToSave = {
      ...mealData,
      category: categoriasArray,
      ingredients: formattedIngredients,
    };

    onSave(mealDataToSave, mealToEdit ? mealToEdit._id : null);
  };

  return (
    <Form id="meal-form" onSubmit={handleSubmit} error={formError}>
      <div className={styles.formGridContainer}>
        <div className={styles.dataContainer}>
          <h3 className={styles.sectionTitle}>Datos de la vianda</h3>

          <div className={styles.fieldsContainer}>
            <Input
              id="meal-name"
              name="name"
              label="Nombre"
              value={mealData.name}
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
                value={mealData.price}
                onChange={handleChange}
                error={fieldErrors.price}
                required
                maxLength={10}
              />
              <Input
                id="meal-min-stock"
                name="minStock"
                label="Stock mínimo"
                inputMode="numeric"
                value={mealData.minStock}
                onChange={handleChange}
                maxLength={10}
                required
                error={fieldErrors.minStock}
              />
            </div>
            <Input
              id="meal-category"
              name="category"
              label="Categorías"
              placeholder="Ej: Vegano, Sin TACC"
              value={mealData.category}
              onChange={handleChange}
              maxLength={100}
              required
              error={fieldErrors.category}
            />
            <TextArea
              id="meal-description"
              name="description"
              label="Descripción"
              value={mealData.description}
              onChange={handleChange}
              maxLength={250}
              rows={4}
              error={fieldErrors.description}
            />

            <ImageInput
              label="Imagen de la vianda"
              value={mealData.image}
              onChange={(file) =>
                setFormData((prev) => ({ ...prev, image: file }))
              }
              error={fieldErrors.image}
            />
          </div>
        </div>

        <div className={styles.recipeContainer}>
          <h3 className={styles.sectionTitle}>Receta de la Vianda</h3>
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

          <div className={styles.editableListContainer}>
            <EditableList
              title="Ingredientes seleccionados:"
              isEmpty={ingredients.length === 0}
              emptyMessage="No hay ingredientes en la receta"
            >
              {ingredients.map((item, index) => (
                <EditableListItem
                  key={item._id}
                  name={item.name}
                  quantity={item.quantity}
                  suffix={item.unit || "u."}
                  error={fieldErrors[`ingredients.${index}.quantity`]}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(item._id, newQuantity)
                  }
                  onRemove={() => handleRemoveIngredient(item._id)}
                />
              ))}
            </EditableList>
          </div>
        </div>
      </div>

      <ButtonGroup>
        <Button
          text="Guardar Vianda"
          variant="primary"
          type="submit"
          disabled={ingredients.length === 0}
        />
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

export default MealForm;
