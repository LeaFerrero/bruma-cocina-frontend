import React, { useState, useEffect } from "react";
import styles from "./UserFormModal.module.css";
import BasicModal from "..components/ui/modals/BasicModal";
import BasicForm from "..components/ui/forms/BasicForm";
import BasicInput from "..components/ui/inputs/BasicInput";
import BasicButton from "..components/ui/buttons/BasicButton";
import ButtonGroup from "../components/ui/buttons/ButtonGroup";

function UserFormModal({ isOpen, onClose, onSave, userToEdit }) {
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
      setFormData({
        name: "",
        lastName: "",
        role: "",
        password: "",
      });
    }
  }, [userToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, userToEdit ? userToEdit.id : null);
    onClose();
  };

  return (
    <BasicModal
      isOpen={isOpen}
      onClose={onClose}
      title={userToEdit ? "Editar usuario" : "Registrar nuevo usuario"}
      maxWidth="30rem"
    >
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

        <BasicInput
          label="Rol"
          id="role"
          name="role"
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

        <ButtonGroup>
          <BasicButton
            text={userToEdit ? "Guardar cambios" : "Registrar"}
            variant="primary"
            type="submit"
          />
          <BasicButton
            text="Cancelar"
            variant="cancel"
            type="button"
            onClick={onClose}
          />
        </ButtonGroup>
      </BasicForm>
    </BasicModal>
  );
}

export default UserFormModal;
