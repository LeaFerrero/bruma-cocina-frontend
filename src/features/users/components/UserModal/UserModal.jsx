import React from "react";
import styles from "./UserModal.module.css";
import { Modal } from "../../../../components/ui";
import UserForm from "../UserForm/UserForm";

function UserModal({
  isOpen,
  onClose,
  onSave,
  userToEdit,
  fieldErrors,
  formError,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={userToEdit ? "Editar usuario" : "Registrar nuevo usuario"}
    >
      <div className={styles.modalLayout}>
        <UserForm
          userToEdit={userToEdit}
          onSubmit={onSave}
          onCancel={onClose}
          fieldErrors={fieldErrors}
          formError={formError}
        />
      </div>
    </Modal>
  );
}

export default UserModal;
