import React, { useState, useEffect } from "react";
import styles from "./SuppliesPage.module.css";
import toast from "react-hot-toast";
import {
  Button,
  ButtonGroup,
  AutocompleteInput,
  ConfirmModal,
} from "../../components/ui";

import {
  SupplyCard,
  SupplyEntryModal,
  SupplyModal,
  addStock,
  createSupply,
  deleteSupply,
  editSupply,
  getSupplies,
  supplySchema,
  stockItemSchema,
  stockEntryListSchema,
} from "../../features/supplies";

function SuppliesPage() {
  const [supplies, setSupplies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [supplyToEdit, setSupplyToEdit] = useState(null);
  const [supplyToDelete, setSuplyToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setSupplyToEdit(null);
    setIsManageModalOpen(true);
    setFieldErrors({});
    setFormError(null);
  };

  const handleOpenEditModal = (supply) => {
    setSupplyToEdit(supply);
    setIsManageModalOpen(true);
    setFieldErrors({});
    setFormError(null);
  };

  const handleCloseModal = () => {
    setIsManageModalOpen(false);
    setIsEntryModalOpen(false);
    setIsConfirmOpen(false);
    setSupplyToEdit(null);
    setSuplyToDelete(null);
    setFieldErrors({});
    setFormError(null);
  };

  const handleOpenDeleteModal = (supply) => {
    setSuplyToDelete(supply);
    setIsConfirmOpen(true);
  };

  useEffect(() => {
    const loadSupplies = async () => {
      try {
        const response = await getSupplies();
        setSupplies(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadSupplies();
  }, []);

  const handleSaveSupply = async (formData, id) => {
    setFieldErrors({});
    setFormError(null);

    const validations = supplySchema.safeParse(formData);

    if (!validations.success) {
      const formattedErrors = {};

      validations.error.issues.forEach((issue) => {
        if (issue.path.length === 0) {
          setFormError(issue.message);
        } else {
          const key = issue.path.join(".");

          if (!formattedErrors[key]) {
            formattedErrors[key] = issue.message;
          }
        }
      });

      setFieldErrors(formattedErrors);
      return;
    }

    const cleanData = validations.data;

    try {
      let response;

      if (id) {
        response = await editSupply(id, cleanData);
      } else {
        response = await createSupply(cleanData);
      }

      toast.success(response.message);

      const supplyResponse = await getSupplies();
      setSupplies(supplyResponse.data);

      handleCloseModal();
    } catch (error) {
      if (error.details) {
        setFieldErrors(error.details);
      } else {
        setFormError(
          error.message || "Ocurrió un error inesperado al guardar.",
        );
      }
    }
  };

  const handleDeleteSupply = async () => {
    if (!supplyToDelete) return;
    try {
      const response = await deleteSupply(supplyToDelete._id);
      toast.success(response.message);

      const supplyResponse = await getSupplies();
      setSupplies(supplyResponse.data);
    } catch (error) {
      toast.error(error.message);
    }
    handleCloseModal();
  };

  const handleSaveEntryLot = async (entryList) => {
    setFieldErrors({});
    setFormError(null);

    const validations = stockEntryListSchema.safeParse(entryList);

    if (!validations.success) {
      const formattedErrors = {};

      validations.error.issues.forEach((issue) => {
        if (issue.path.length === 0) {
          setFormError(issue.message);
        } else {
          const key = issue.path.join(".");

          if (!formattedErrors[key]) {
            formattedErrors[key] = issue.message;
          }
        }
      });

      setFieldErrors(formattedErrors);
      return;
    }

    const cleanEntryList = validations.data;

    try {
      const response = await addStock(cleanEntryList);

      toast.success(response.message);

      const supplyResponse = await getSupplies();
      setSupplies(supplyResponse.data);

      handleCloseModal();
    } catch (error) {
      if (error.statusCode === 404) {
        toast.error(error.message);
      } else if (error.details) {
        setFieldErrors(error.details);
      } else if (error.statusCode === 400) {
        setFormError(error.message);
      } else {
        toast.error(
          error.message || "Ocurrió un error inesperado en el servidor.",
        );
      }
    }
  };

  const supplyNames = supplies.map((supply) => supply.name);

  const filteredSupplies = supplies.filter((supply) =>
    supply.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className={styles.suppliesSection}>
      <div className={styles.titleContainer}>
        <h2>Insumos</h2>
        <div className={styles.buttonsContainer}>
          <ButtonGroup layout="row">
            <div>
              <Button
                text="Registrar insumo"
                variant="primary"
                onClick={handleOpenCreateModal}
              />
            </div>
            <div>
              <Button
                text="Ingresar insumos"
                variant="primary"
                onClick={() => setIsEntryModalOpen(true)}
              />
            </div>
          </ButtonGroup>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <AutocompleteInput
          label="Buscar por nombre"
          placeholder="Nombre..."
          options={supplyNames}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className={styles.suppliesGrid}>
        {filteredSupplies.length > 0 ? (
          filteredSupplies.map((supply) => (
            <SupplyCard
              key={supply._id}
              supply={supply}
              onEdit={() => handleOpenEditModal(supply)}
              onDelete={() => handleOpenDeleteModal(supply)}
            />
          ))
        ) : (
          <p className={styles.emptyMessage}>No se encontraron insumos.</p>
        )}
      </div>

      <SupplyModal
        isOpen={isManageModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSupply}
        supplyToEdit={supplyToEdit}
        fieldErrors={fieldErrors}
        formError={formError}
      />

      <ConfirmModal
        title="Eliminar insumo"
        isOpen={isConfirmOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteSupply}
        isDanger={true}
        message={`¿Desea eliminar "${supplyToDelete?.name}"? Esta acción no se puede deshacer.`}
      />

      <SupplyEntryModal
        isOpen={isEntryModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEntryLot}
        availableSupplies={supplies}
        formError={formError}
        fieldErrors={fieldErrors}
      />
    </section>
  );
}

export default SuppliesPage;
