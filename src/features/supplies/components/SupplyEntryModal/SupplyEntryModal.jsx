import React from "react";
import styles from "./SupplyEntryModal.module.css";
import { Modal } from "../../../../components/ui";
import SupplyEntryForm from "../SupplyEntryForm/SupplyEntryForm";

function SupplyEntryModal({
  availableSupplies,
  isOpen,
  onClose,
  onSave,
  formError = null,
  fieldErrors = {},
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ingresar insumos">
      <div className={styles.modalLayout}>
        <SupplyEntryForm
          availableSupplies={availableSupplies}
          onSave={onSave}
          onCancel={onClose}
          formError={formError}
          fieldErrors={fieldErrors}
        />
      </div>
    </Modal>
  );
}

export default SupplyEntryModal;
