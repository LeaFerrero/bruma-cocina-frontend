import React, { useState, useEffect } from "react";
import BasicForm from "../ui/forms/BasicForm";
import BasicButton from "../ui/buttons/BasicButton";
import BasicInput from "../ui/inputs/BasicInput";
import BasicDropdown from "../ui/inputs/BasicDropdown";
import styles from "./ManageUserForm.module.css";

function ManageUserForm({ userToEdit, onSubmit, onCancel }) {
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
        password: "", // Por seguridad se deja en blanco al editar
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
    onSubmit(formData, userToEdit ? userToEdit.id : null);
  };

    const roles = [
    { value: "", text: "Seleccionar..." },
    { value: "admin", text: "Administrador" },
    { value: "cocina", text: "Cocina" },
    { value: "caja", text: "Caja" },
    { value: "stock", text: "Stock" },
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
      />

      <BasicInput
        label="Apellido"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <BasicDropdown
        label="Rol"
        id="role"
        name="role"
        options={roles}
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