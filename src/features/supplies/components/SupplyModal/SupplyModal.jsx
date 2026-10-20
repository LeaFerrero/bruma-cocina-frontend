import React from "react";
import styles from "./SupplyModal.module.css";
import { Modal } from "../../../../components/ui";
import SupplyForm from "../SupplyForm/SupplyForm";

function SupplyModal({
  isOpen,
  onClose,
  onSave,
  supplyToEdit,
  formError = null,
  fieldErrors = {},
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={supplyToEdit ? "Editar insumo" : "Registrar nuevo insumo"}
    >
      <div className={styles.modalLayout}>
        <SupplyForm
          supplyToEdit={supplyToEdit}
          onSubmit={onSave}
          onCancel={onClose}
          fieldErrors={fieldErrors}
          formError={formError}
        />
      </div>
    </Modal>
  );
}

export default SupplyModal;
