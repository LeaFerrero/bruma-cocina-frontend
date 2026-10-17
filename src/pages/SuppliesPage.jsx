import React, { useState } from "react";
import styles from "./SuppliesPage.module.css";
import suppliesData from "../data/suppliesData";
import BasicButton from "../components/ui/buttons/BasicButton";
import AutocompleteInput from "../components/ui/inputs/AutocompleteInput";
import SupplyCard from "../supplies/SupplyCard";
import SupplyEntryModal from "../supplies/SupplyEntryModal";
import ManageSupplyModal from "../supplies/ManageSupplyModal";

function SuppliesPage() {
  const [supplies, setSupplies] = useState(suppliesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [supplyToEdit, setSupplyToEdit] = useState(null);

  const handleOpenCreateModal = () => {
    setSupplyToEdit(null);
    setIsManageModalOpen(true);
  };

  const handleOpenEditModal = (supply) => {
    setSupplyToEdit(supply);
    setIsManageModalOpen(true);
  };

  const handleCloseManageModal = () => {
    setIsManageModalOpen(false);
    setSupplyToEdit(null);
  };

  const handleSaveSupply = (formData, id) => {
    if (id) {
      setSupplies(
        supplies.map((s) => (s.id === id ? { ...s, ...formData } : s)),
      );
    } else {
      const newSupply = {
        id: Date.now(),
        ...formData,
      };
      setSupplies([...supplies, newSupply]);
    }
  };

  const deleteSupply = (supply) => {
    setSupplies(supplies.filter((s) => s.id !== supply.id));
  };

  const handleSaveEntryLot = (entryList) => {
    console.log("Lote a guardar en base de datos:", entryList);
    alert("Ingreso registrado (ver consola)");
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
              key={supply.id}
              supply={supply}
              onEdit={() => handleOpenEditModal(supply)}
              onDelete={() => deleteSupply(supply)}
            />
          ))
        ) : (
          <p>No se encontraron insumos.</p>
        )}
      </div>

      <ManageSupplyModal
        isOpen={isManageModalOpen}
        onClose={handleCloseManageModal}
        onSave={handleSaveSupply}
        supplyToEdit={supplyToEdit}
      />

      <SupplyEntryModal
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        onSaveLote={handleSaveEntryLot}
        availableSupplies={supplies}
      />
    </section>
  );
}

export default SuppliesPage;
