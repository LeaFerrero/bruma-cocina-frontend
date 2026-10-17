import React, { useState, useEffect } from "react";
import styles from "./ManageSupplyForm.module.css";
import BasicForm from "../components/ui/forms/BasicForm";
import BasicInput from "../components/ui/inputs/BasicInput";
import BasicDropdown from "../components/ui/inputs/BasicDropdown";
import BasicButton from "../components/ui/buttons/BasicButton";
import ButtonGroup from "../components/ui/buttons/ButtonGroup";
import { UNIT_OPTIONS } from "../utils/units";

function ManageSupplyForm({ supplyToEdit, onSubmit, onCancel, errors = {} }) {
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    unit: "",
    minStock: "",
  });

  useEffect(() => {
    if (supplyToEdit) {
      setFormData({
        name: supplyToEdit.name || "",
        stock: supplyToEdit.stock || "",
        unit: supplyToEdit.unit || "",
        minStock: supplyToEdit.minStock || "",
      });
    } else {
      setFormData({ name: "", stock: "", unit: "", minStock: "" });
    }
  }, [supplyToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, supplyToEdit ? supplyToEdit.id : null);
  };

  return (
    <BasicForm onSubmit={handleSubmit}>
      <BasicInput
        label="Nombre del insumo"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <div className={styles.rowInputs}>
        <BasicDropdown
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          label="Unidad de medida"
          options={UNIT_OPTIONS}
          placeholder="Seleccione una unidad de medida..."
          error={errors.unit}
          required
        />
        <BasicInput
          label="Precio"
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          required
        />
      </div>

      <div className={styles.rowInputs}>
        <BasicInput
          label="Stock actual"
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          error={errors.currentStock}
          required
        />

        <BasicInput
          label="Stock mínimo"
          type="number"
          id="minStock"
          name="minStock"
          value={formData.minStock}
          onChange={handleChange}
          error={errors.minStock}
          required
        />
      </div>

      <ButtonGroup>
        <BasicButton
          text={supplyToEdit ? "Guardar cambios" : "Registrar"}
          variant="primary"
          type="submit"
        />
        <BasicButton
          text="Cancelar"
          variant="cancel"
          type="button"
          onClick={onCancel}
        />
      </ButtonGroup>
    </BasicForm>
  );
}

export default ManageSupplyForm;
