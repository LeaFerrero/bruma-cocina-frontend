import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  ButtonGroup,
} from "../../../../components/ui";

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={userToEdit ? "Editar usuario" : "Registrar nuevo usuario"}
      maxWidth="30rem"
    >
      <Form onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Apellido"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <Input
          label="Rol"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <Input
          label={userToEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!userToEdit}
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
            onClick={onClose}
          />
        </ButtonGroup>
      </Form>
    </Modal>
  );
}

export default UserFormModal;
