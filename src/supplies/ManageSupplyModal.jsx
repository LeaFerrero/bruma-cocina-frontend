import React from "react";
import styles from "./ManageSupplyModal.module.css";
import BasicModal from "../components/ui/modals/BasicModal";
import ManageSupplyForm from "./ManageSupplyForm";

function ManageSupplyModal({ isOpen, onClose, onSave, supplyToEdit }) {
  const handleFormSubmit = (formData, id) => {
    onSave(formData, id);
    onClose();
  };

  return (
    <BasicModal
      isOpen={isOpen}
      onClose={onClose}
      title={supplyToEdit ? "Editar insumo" : "Registrar nuevo insumo"}
    >
      <div className={styles.modalLayout}>
        <ManageSupplyForm
          supplyToEdit={supplyToEdit}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </div>
    </BasicModal>
  );
}

export default ManageSupplyModal;
