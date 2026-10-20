import React, { useState, useEffect } from "react";
import { ROLE_OPTIONS } from "../../utils/roles";
import {
  Form,
  Input,
  DropdownInput,
  Button,
  ButtonGroup,
} from "../../../../components/ui";

function UserForm({
  userToEdit,
  onSubmit,
  onCancel,
  formError,
  fieldErrors = {},
}) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || "",
        lastName: userToEdit.lastName || "",
        role: userToEdit.role || "",
        password: "",
      });
    } else {
      setFormData({ name: "", lastName: "", role: "", password: "" });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, userToEdit ? userToEdit._id : null);
  };

  return (
    <Form onSubmit={handleSubmit} error={formError}>
      <Input
        label="Nombre"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        error={fieldErrors.name}
        maxLength={50}
      />

      <Input
        label="Apellido"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        error={fieldErrors.lastName}
        maxLength={50}
      />

      <DropdownInput
        label="Rol"
        id="role"
        name="role"
        options={ROLE_OPTIONS}
        placeholder="Seleccione un rol..."
        value={formData.role}
        onChange={handleChange}
        required
        error={fieldErrors.role}
      />

      <Input
        label={userToEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required={!userToEdit}
        error={fieldErrors.password}
        minLength={8}
        maxLength={16}
      />

      <ButtonGroup>
        <Button
          text={userToEdit ? "Guardar cambios" : "Registrar"}
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

export default UserForm;
