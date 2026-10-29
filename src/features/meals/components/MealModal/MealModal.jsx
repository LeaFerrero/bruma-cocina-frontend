import React from "react";
import styles from "./MealModal.module.css";
import { Modal } from "../../../../components/ui";
import MealForm from "../MealForm/MealForm";

function MealModal({
  isOpen,
  onClose,
  mealToEdit,
  availableSupplies = [],
  onSave,
  formError = null,
  fieldErrors = {},
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mealToEdit ? "Editar Vianda" : "Registrar Vianda"}
    >
      <div className={styles.modalLayout}>
        <MealForm
          mealToEdit={mealToEdit}
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

export default MealModal;
