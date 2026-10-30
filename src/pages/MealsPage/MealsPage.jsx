import React, { useState, useEffect } from "react";
import styles from "./MealsPage.module.css";
import { MealCard, MealModal } from "../../features/meals";
import {
  AutocompleteInput,
  Button,
  ConfirmModal,
  AlertBanner,
} from "../../components/ui";
import { getSupplies } from "../../features/supplies";
import { socket } from "../../services/socket";

import {
  getMeals,
  getMealById,
  createMeal,
  editMeal,
  deleteMeal,
  mealSchema,
} from "../../features/meals";
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
  const [showErrorAlert, setShowErrorAlert] = useState(true);
  const [showWarningAlert, setShowWarningAlert] = useState(true);

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

    socket.on("production-updated", () => {
      loadMeals();
    });

    socket.on("order-created", () => {
      loadMeals();
    });

    return () => {
      socket.off("production-updated");
      socket.off("order-created");
    };
  }, []);

  useEffect(() => {
    const loadAvileableSupplies = async () => {
      try {
        const suppliesData = await getSupplies();
        setAvileableSupplies(suppliesData.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    loadAvileableSupplies();
  }, []);

  const handleOpenCreateModal = () => {
    setMealToEdit(null);
    setIsModalOpen(true);
    setFieldErrors({});
    setFormError(null);
  };

  const handleOpenEditModal = async (meal) => {
    try {
      setIsLoading(true);
      const response = await getMealById(meal._id);

      setMealToEdit(response.data.meal);
      setIsModalOpen(true);
      setFieldErrors({});
      setFormError(null);
    } catch (error) {
      toast.error(error.message || "Error al cargar los detalles de la vianda");
    } finally {
      setIsLoading(false);
    }
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
        const key = issue.path.join(".");

        if (!formattedErrors[key]) {
          formattedErrors[key] = issue.message;
        }
      });

      setFieldErrors(formattedErrors);
      return;
    }

    const cleanData = validations.data;

    const payload = {
      name: cleanData.name,
      price: cleanData.price,
      minStock: cleanData.minStock,
      description: cleanData.description,
      category: cleanData.category,
      ingredients: cleanData.ingredients,
    };
    const dataToSend = new FormData();

    dataToSend.append("mealData", JSON.stringify(payload));

    if (cleanData.image instanceof File) {
      dataToSend.append("image", cleanData.image);
    }

    try {
      let response;

      if (id) {
        response = await editMeal(id, dataToSend);
      } else {
        response = await createMeal(dataToSend);
      }
      toast.success(response.message);

      const mealsResponse = await getMeals();
      setMeals(mealsResponse.data);

      setIsModalOpen(false);
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

  const formatMealItem = (meal) => {
    const currentStock = Number(meal.currentStock);

    return {
      name: meal.name,
      stockValue: currentStock,
      unit: "unidades",
    };
  };

  const outOfStockItems = meals
    .filter((meal) => Number(meal.currentStock) === 0)
    .map(formatMealItem);

  const lowStockItems = meals
    .filter((meal) => {
      return meal.currentStock > 0 && meal.currentStock <= meal.minStock;
    })
    .map(formatMealItem);

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

      {!isLoading && showErrorAlert && outOfStockItems.length > 0 && (
        <AlertBanner
          variant="error"
          title="Viandas Agotadas"
          items={outOfStockItems}
          onClose={() => setShowErrorAlert(false)}
        />
      )}

      {!isLoading && showWarningAlert && lowStockItems.length > 0 && (
        <AlertBanner
          variant="warning"
          title="Viandas con Stock Bajo"
          items={lowStockItems}
          onClose={() => setShowWarningAlert(false)}
        />
      )}

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
        <p className={styles.statusMessage}>Cargando datos...</p>
      ) : (
        <div className={styles.mealsGrid}>
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <MealCard
                key={meal._id}
                meal={meal}
                onEdit={() => handleOpenEditModal(meal)}
                onDelete={() => handleOpenDeleteModal(meal)}
              />
            ))
          ) : (
            <p className={styles.statusMessage}>No se encontraron viandas.</p>
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
