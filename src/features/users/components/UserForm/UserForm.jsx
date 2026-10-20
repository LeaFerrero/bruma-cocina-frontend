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
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setUserData({
        name: userToEdit.name || "",
        lastName: userToEdit.lastName || "",
        role: userToEdit.role || "",
        password: "",
      });
    } else {
      setUserData({ name: "", lastName: "", role: "", password: "" });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData, userToEdit ? userToEdit._id : null);
  };

  return (
    <Form onSubmit={handleSubmit} error={formError}>
      <Input
        label="Nombre"
        id="name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        required
        error={fieldErrors.name}
        maxLength={50}
      />

      <Input
        label="Apellido"
        id="lastName"
        name="lastName"
        value={userData.lastName}
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
        value={userData.role}
        onChange={handleChange}
        required
        error={fieldErrors.role}
      />

      <Input
        label={userToEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
        type="password"
        id="password"
        name="password"
        value={userData.password}
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
