import React, { useState, useEffect } from "react";
import styles from "./SupplyForm.module.css";
import {
  Form,
  Input,
  DropdownInput,
  Button,
  ButtonGroup,
} from "../../../../components/ui";
import { UNIT_OPTIONS } from "../../utils/units";
import { formatForDisplay } from "../../../../utils/parsers";

function SupplyForm({
  supplyToEdit,
  onSubmit,
  onCancel,
  formError = null,
  fieldErrors = {},
}) {
  const [supplyData, setSupplyData] = useState({
    name: "",
    unit: "",
    price: "",
    currentStock: "",
    minStock: "",
  });

  useEffect(() => {
    if (supplyToEdit) {
      setSupplyData({
        name: supplyToEdit.name || "",
        unit: supplyToEdit.unit || "",
        price: formatForDisplay(supplyToEdit.price, 2) || "",
        currentStock: formatForDisplay(supplyToEdit.currentStock, 3) || "",
        minStock: formatForDisplay(supplyToEdit.minStock, 3) || "",
      });
    } else {
      setSupplyData({
        name: "",
        unit: "",
        price: "",
        currentStock: "",
        minStock: "",
      });
    }
  }, [supplyToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(supplyData, supplyToEdit ? supplyToEdit._id : null);
  };

  return (
    <Form onSubmit={handleSubmit} error={formError}>
      <Input
        label="Nombre del insumo"
        id="name"
        name="name"
        value={supplyData.name}
        onChange={handleChange}
        error={fieldErrors.name}
        required
        maxLength={50}
      />

      <div className={styles.rowInputs}>
        <DropdownInput
          id="unit"
          name="unit"
          value={supplyData.unit}
          onChange={handleChange}
          label="Unidad de medida"
          options={UNIT_OPTIONS}
          placeholder="Seleccione una unidad de medida..."
          error={fieldErrors.unit}
          required
        />
        <Input
          label="Precio"
          id="price"
          name="price"
          inputMode="decimal"
          value={supplyData.price}
          onChange={handleChange}
          error={fieldErrors.price}
          required
          maxLength={10}
        />
      </div>

      <div className={styles.rowInputs}>
        <Input
          label="Stock actual"
          id="currentStock"
          name="currentStock"
          inputMode="decimal"
          value={supplyData.currentStock}
          onChange={handleChange}
          error={fieldErrors.currentStock}
          required
          maxLength={10}
        />
        <Input
          label="Stock mínimo"
          id="minStock"
          name="minStock"
          inputMode="decimal"
          value={supplyData.minStock}
          onChange={handleChange}
          error={fieldErrors.minStock}
          required
          maxLength={10}
        />
      </div>

      <ButtonGroup>
        <Button
          text={supplyToEdit ? "Guardar cambios" : "Registrar"}
          variant="primary"
          type="submit"
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

export default SupplyForm;
