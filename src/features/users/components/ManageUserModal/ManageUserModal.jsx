import React from "react";
import styles from "./ManageUserModal.module.css";
import { Modal } from "../../../../components/ui";
import ManageUserForm from "../ManageUserForm/ManageUserForm";

function ManageUserModal({
  isOpen,
  onClose,
  onSave,
  userToEdit,
  fieldErrors,
  formError,
}) {
  const handleFormSubmit = (formData, id) => {
    onSave(formData, id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={userToEdit ? "Editar usuario" : "Registrar nuevo usuario"}
    >
      <div className={styles.modalLayout}>
        <ManageUserForm
          userToEdit={userToEdit}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
          fieldErrors={fieldErrors}
          formError={formError}
        />
      </div>
    </Modal>
  );
}

export default ManageUserModal;
