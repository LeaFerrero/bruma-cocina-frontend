import React, { useEffect, useState } from "react";
import styles from "./ProductionPage.module.css";
import toast from "react-hot-toast";
import {
  ProductionForm,
  registerProduction,
  mealStockListSchema,
} from "../../features/production";
import { getMeals } from "../../features/meals";
import { Card } from "../../components/ui";

function ProductionPage() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const loadAvailableMeals = async () => {
      try {
        const response = await getMeals();
        setAvailableMeals(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    loadAvailableMeals();
  }, []);

  const handleSaveProduction = async (productionData) => {
    setFieldErrors({});
    setFormError(null);

    const validations = mealStockListSchema.safeParse(productionData);

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

    try {
      const response = await registerProduction(cleanData);

      toast.success(response.message);
      setFormKey((prevKey) => prevKey + 1);
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

  return (
    <section className={styles.productionSection}>
      <div className={styles.productionContainer}>
        <Card title="Registrar producción" headingLevel="h2">
          <ProductionForm
            key={formKey}
            availableMeals={availableMeals}
            onSave={handleSaveProduction}
            formError={formError}
            fieldErrors={fieldErrors}
          />
        </Card>
      </div>
    </section>
  );
}

export default ProductionPage;
