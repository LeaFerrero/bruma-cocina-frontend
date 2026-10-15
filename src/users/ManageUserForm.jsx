import React, { useState, useEffect } from "react";
import BasicForm from "../components/ui/forms/BasicForm";
import BasicButton from "../components/ui/buttons/BasicButton";
import BasicInput from "../components/ui/inputs/BasicInput";
import BasicDropdown from "../components/ui/inputs/BasicDropdown";
import styles from "./ManageUserForm.module.css";
import { ROLES, ROLE_NAMES } from "../utils/roles";

function ManageUserForm({ userToEdit, onSubmit, onCancel, errors = {} }) {
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

  const dropdownRolesOptions = [
    { value: "", label: "Seleccione un rol..." },
    ...Object.values(ROLES).map((rol) => ({
      value: rol,
      label: ROLE_NAMES[rol],
    })),
  ];

  return (
    <BasicForm onSubmit={handleSubmit}>
      <BasicInput
        label="Nombre"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        error={errors.name}
      />

      <BasicInput
        label="Apellido"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        error={errors.lastName}
      />

      <BasicDropdown
        label="Rol"
        id="role"
        name="role"
        options={dropdownRolesOptions}
        value={formData.role}
        onChange={handleChange}
        required
      />

      <BasicInput
        label={userToEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required={!userToEdit}
        error={errors.password}
      />

      <div className={styles.buttonsContainer}>
        <BasicButton
          text={userToEdit ? "Guardar cambios" : "Registrar"}
          variant="primary"
          type="submit"
        />
        <BasicButton
          text="Cancelar"
          variant="cancel"
          type="button"
          onClick={onCancel}
        />
      </div>
    </BasicForm>
  );
}

export default ManageUserForm;
