import React from "react";
import styles from "./SupplyForm.module.css";
import {
  Form,
  Input,
  DropdownInput,
  Button,
  ButtonGroup,
} from "../../../../components/ui";
import { UNIT_OPTIONS } from "../../utils/units";

function SupplyForm({
  formData,
  onSubmit,
  onChange,
  onCancel,
  isEditing,
  formError = null,
  fieldErrors = {},
}) {
  return (
    <Form onSubmit={onSubmit} error={formError}>
      <Input
        label="Nombre del insumo"
        id="name"
        name="name"
        value={formData.name} // <-- Lee directamente la prop
        onChange={onChange} // <-- Usa la función del padre
        error={fieldErrors.name}
        required
        maxLength={50}
      />

      <div className={styles.rowInputs}>
        <DropdownInput
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={onChange}
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
          value={formData.price}
          onChange={onChange}
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
          value={formData.currentStock}
          onChange={onChange}
          error={fieldErrors.currentStock}
          required
          maxLength={10}
        />
        <Input
          label="Stock mínimo"
          id="minStock"
          name="minStock"
          inputMode="decimal"
          value={formData.minStock}
          onChange={onChange}
          error={fieldErrors.minStock}
          required
          maxLength={10}
        />
      </div>

      <ButtonGroup>
        <Button
          text={isEditing ? "Guardar cambios" : "Registrar"}
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
