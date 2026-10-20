import React, { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    price: "",
    currentStock: "",
    minStock: "",
  });

  useEffect(() => {
    if (supplyToEdit) {
      setFormData({
        name: supplyToEdit.name || "",
        unit: supplyToEdit.unit || "",
        price: supplyToEdit.price || "",
        currentStock: supplyToEdit.currentStock || "",
        minStock: supplyToEdit.minStock || "",
      });
    } else {
      setFormData({
        name: "",
        unit: "",
        price: "",
        currentStock: "",
        minStock: "",
      });
    }
  }, [supplyToEdit, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave(formData, supplyToEdit ? supplyToEdit._id : null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={supplyToEdit ? "Editar insumo" : "Registrar nuevo insumo"}
    >
      <div className={styles.modalLayout}>
        <SupplyForm
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
          isEditing={!!supplyToEdit}
          fieldErrors={fieldErrors}
          formError={formError}
        />
      </div>
    </Modal>
  );
}

export default SupplyModal;
