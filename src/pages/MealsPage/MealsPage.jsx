import React, { useState, useEffect } from "react";
import styles from "./MealsPage.module.css";
import meals from "../../data/mealsData";
import { MealCard, MealModal } from "../../features/meals";
import { AutocompleteInput, Button } from "../../components/ui";
import { getSupplies } from "../../features/supplies";
import { mealSchema } from "../../features/meals";

function MealsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [availableSupplies, setAvileableSupplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const handleOpenCreateModal = () => {
    setMealToEdit(null);
    setIsModalOpen(true);
  };

  const editMeal = (meal) => {
    setMealToEdit(meal);
    setIsModalOpen(true);
  };

  const deleteMeal = (meal) => {
    alert(`Vianda eliminada: ${meal.name}`);
  };

  const handleSaveMeal = (formData, id) => {
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

    console.log("Datos a guardar:", formData, "ID:", id);
    alert(`Vianda ${id ? "editada" : "registrada"} con éxito.`);
    setIsModalOpen(false);
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
          {filteredMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onEdit={() => editMeal(meal)}
              onDelete={() => deleteMeal(meal)}
            />
          ))}
        </div>
      )}

      <MealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMeal}
        mealToEdit={mealToEdit}
        availableSupplies={availableSupplies}
        formError={formError}
        fieldErrors={fieldErrors}
      />
    </section>
  );
}

export default MealsPage;
