import React from "react";
import BasicModal from "../components/ui/modals/BasicModal";
import ManageUserForm from "./ManageUserForm";
import styles from "./ManageUserModal.module.css";

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
    <BasicModal
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
    </BasicModal>
  );
}

export default ManageUserModal;
