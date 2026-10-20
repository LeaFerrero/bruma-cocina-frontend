import React, { useState, useEffect } from "react";
import styles from "./MealsPage.module.css";
import meals from "../../data/mealsData";
import { MealCard, MealModal } from "../../features/meals";
import { AutocompleteInput, Button, ConfirmModal } from "../../components/ui";
import { getSupplies } from "../../features/supplies";
import { mealSchema } from "../../features/meals";
import {
  getMeals,
  getMealById,
  createMeal,
  editMeal,
  deleteMeal,
} from "../../features/meals/services/mealsApi";
import toast from "react-hot-toast";

function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableSupplies, setAvileableSupplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [mealToDelete, setMealToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const loadMeals = async () => {
      try {
        setIsLoading(true);
        const response = await getMeals();
        setMeals(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadMeals();
  }, []);

  useEffect(() => {
    const loadAvileableSupplies = async () => {
      try {
        setIsLoading(true);
        const suppliesData = await getSupplies();

        setAvileableSupplies(suppliesData.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAvileableSupplies();
  }, []);

  const handleOpenCreateModal = () => {
    setMealToEdit(null);
    setIsModalOpen(true);
  };

  const editMeal = (meal) => {
    setMealToEdit(meal);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (meal) => {
    setMealToDelete(meal);
    setIsConfirmOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirmOpen(false);
    setMealToEdit(null);
    setMealToDelete(null);
    setFieldErrors({});
    setFormError(null);
  };

  const handleSaveMeal = async (formData, id) => {
    setFieldErrors({});
    setFormError(null);

    const validations = mealSchema.safeParse(formData);

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
        response = await editMeal(id, formData);
      } else {
        response = await createMeal(formData);
      }
    } catch (error) {}

    setIsModalOpen(false);
  };

  const handleDeleteMeal = async () => {
    if (!mealToDelete) return;

    try {
      const response = await deleteMeal(mealToDelete._id);
      toast.success(response.message);

      const mealsResponse = await getMeals();
      setMeals(mealsResponse.data);

      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const mealsNames = meals.map((meal) => meal.name);

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className={styles.mealsSection}>
      <div className={styles.titleContainer}>
        <h2>Viandas</h2>
        <div>
          <Button
            text="Registrar vianda"
            variant="primary"
            onClick={handleOpenCreateModal}
          />
        </div>
      </div>

      <div className={styles.searchContainer}>
        <AutocompleteInput
          label="Buscar por nombre"
          placeholder="Nombre..."
          options={mealsNames}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className={styles.mealsGrid}>
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onEdit={() => editMeal(meal)}
                onDelete={() => handleOpenDeleteModal(meal)}
              />
            ))
          ) : (
            <p className={styles.emptyMessage}>No se encontraron viandas.</p>
          )}
        </div>
      )}

      <MealModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveMeal}
        mealToEdit={mealToEdit}
        availableSupplies={availableSupplies}
        formError={formError}
        fieldErrors={fieldErrors}
      />

      <ConfirmModal
        title="Eliminar vianda"
        isOpen={isConfirmOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteMeal}
        isDanger={true}
        message={`¿Desea eliminar "${mealToDelete?.name}"? Esta acción no se puede deshacer.`}
      />
    </section>
  );
}

export default MealsPage;
