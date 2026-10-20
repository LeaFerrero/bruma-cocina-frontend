import React from "react";
import styles from "./MealForm.module.css";
import { Form, Input, TextArea } from "../../../../components/ui";

export default function MealForm({
  id,
  formData,
  onSubmit,
  onChange,
  formError = null,
  fieldErrors = {},
}) {
  return (
    <Form
      id={id}
      onSubmit={onSubmit}
      title="Datos de la Vianda"
      error={formError}
    >
      <Input
        id="meal-name"
        name="name"
        label="Nombre"
        placeholder="Ingrese nombre"
        value={formData.name}
        onChange={onChange}
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
          onChange={onChange}
          error={fieldErrors.price}
          required
          maxLength={10}
        />

        <Input
          id="meal-category"
          name="category"
          label="Categoría"
          placeholder="Ej: Vegano, Sin TACC, Plato Principal"
          value={formData.category}
          onChange={onChange}
          maxLength={100}
          required
          error={fieldErrors.category}
        />
      </div>
      <TextArea
        id="meal-description"
        name="description"
        label="Descripción"
        placeholder="Ingrese descipcción"
        value={formData.description}
        onChange={onChange}
        maxLength={250}
        rows={4}
        error={fieldErrors.description}
      />
    </Form>
  );
}
