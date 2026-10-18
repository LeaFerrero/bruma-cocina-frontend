import React, { useState, useEffect } from "react";
import styles from "./SuppliesPage.module.css";
import suppliesData from "../data/suppliesData";
import BasicButton from "../components/ui/buttons/BasicButton";
import AutocompleteInput from "../components/ui/inputs/AutocompleteInput";
import SupplyCard from "../supplies/SupplyCard";
import SupplyEntryModal from "../supplies/SupplyEntryModal";
import ManageSupplyModal from "../supplies/ManageSupplyModal";
import {
  createSupply,
  deleteSupply,
  editSupply,
  getSupplies,
} from "../api/supplyApi";
import ConfirmModal from "../components/ui/modals/ConfirmModal";
import ButtonGroup from "../components/ui/buttons/ButtonGroup";
import toast from "react-hot-toast";
import {
  supplySchema,
  stockItemSchema,
  stockEntryListSchema,
} from "../utils/validations/supplyValidator";
import { validate } from "zod";

function SuppliesPage() {
  const [supplies, setSupplies] = useState(suppliesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [supplyToEdit, setSupplyToEdit] = useState(null);
  const [supplyToDelete, setSuplyToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setSupplyToEdit(null);
    setIsManageModalOpen(true);
  };

  const handleOpenEditModal = (supply) => {
    setSupplyToEdit(supply);
    setIsManageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsManageModalOpen(false);
    setIsEntryModalOpen(false);
    setIsConfirmOpen(false);
    setSupplyToEdit(null);
    setSuplyToDelete(null);
    setFormErrors({});
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
    const validations = supplySchema.safeParse(formData);

    if (!validations.success) {
      const fieldErrors = validations.error.flatten().fieldErrors;
      const formattedErrors = {};
      for (const key in fieldErrors) {
        formattedErrors[key] = fieldErrors[key][0];
      }

      setFormErrors(formattedErrors);
      return;
    }
    const cleanData = validations.data;

    try {
      setFormErrors({});
      let response;

      if (id) {
        response = await editSupply(id, cleanData);
      } else {
        response = await createSupply(cleanData);
      }

      toast.success(response.message);

      const supplyRespnse = await getSupplies();
      setSupplies(supplyRespnse.data);

      handleCloseModal();
    } catch (error) {
      toast.error(error.message);

      if (error.details) {
        setFormErrors(error.details);
      }
    }
  };

  const handleDeleteSupply = async () => {
    if (!supplyToDelete) return;
    try {
      const response = await deleteSupply(supplyToDelete._id);
      toast.success(response.message);

      const supplyRespnse = await getSupplies();
      setSupplies(supplyRespnse.data);
    } catch (error) {
      toast.error(error.message);
    }
    handleCloseModal();
  };

  const handleSaveEntryLot = (entryList) => {
    const validations = stockEntryListSchema.safeParse(entryList);
    if (!validations.success) {
      for (const key of entryError) {
        entryError[key] = entryError[key][0];

        toast.error(entryError[key]);
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
              <BasicButton
                text="Registrar insumo"
                variant="primary"
                onClick={handleOpenCreateModal}
              />
            </div>
            <div>
              <BasicButton
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

      <ManageSupplyModal
        isOpen={isManageModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSupply}
        supplyToEdit={supplyToEdit}
        errors={formErrors}
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
      />
    </section>
  );
}

export default SuppliesPage;
