import React, { useState } from "react";
import styles from "./CatalogPage.module.css";
import { useCart } from "../../context/CartContext";
import { CatalogCard } from "../../features/catalog";
// Importamos el modal de éxito junto con el del carrito
import { CartModal, OrderSuccessModal } from "../../features/cart";

import { DropdownInput, Button, ConfirmModal } from "../../components/ui";
import meals from "../../data/mealsData";
import { orderSchema } from "../../features/cart/utils/cartValidation";
import toast from "react-hot-toast";

function CatalogPage() {
  const { cart, addToCart, clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Todas");

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);

  const [successOrderCode, setSuccessOrderCode] = useState(null);

  const uniqueCategories = [...new Set(meals.map((meal) => meal.category))];

  const filterOptions = [
    { value: "Todas", label: "Todas" },
    ...uniqueCategories.map((cat) => ({ value: cat, label: cat })),
  ];

  const filteredMeals =
    selectedFilter === "Todas"
      ? meals
      : meals.filter((meal) => meal.category === selectedFilter);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleProcessOrder = (placedOrder) => {
    setFieldErrors({});
    setFormError(null);

    const validations = orderSchema.safeParse(placedOrder);

    if (!validations.success) {
      const formattedErrors = {};
      validations.error.issues.forEach((issue) => {
        if (issue.path.length === 0) {
          setFormError(issue.message);
        } else {
          let key = issue.path.join(".");
          if (key.startsWith("client.")) {
            key = key.replace("client.", "");
          }
          if (!formattedErrors[key]) {
            formattedErrors[key] = issue.message;
          }
        }
      });
      setFieldErrors(formattedErrors);
      return;
    }

    setPendingOrder(validations.data);
    setIsModalOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmOrder = async () => {
    try {
      console.log("Enviando orden a la BD:", pendingOrder);

      // Acá irá tu petición real: const response = await createOrder(pendingOrder);
      // Simulamos la respuesta del backend con un código generado:
      const generatedCode = `ORD-${Math.floor(Math.random() * 100000)}`;

      clearCart();
      setIsConfirmOpen(false);
      setPendingOrder(null);

      // Abrimos el modal de éxito pasándole el código
      setSuccessOrderCode(generatedCode);
    } catch (error) {
      // Manejo del error de stock sin borrar el carrito
      const errorMessage =
        error.response?.data?.message ||
        "No hay stock suficiente para algunas viandas elegidas.";
      toast.error(errorMessage, { duration: 5000 });
      setIsConfirmOpen(false);
    }
  };

  const handleCloseCart = () => {
    setIsModalOpen(false);
    setFieldErrors({});
    setFormError(null);
  };

  return (
    <section className={styles.menuSection}>
      <h2>Viandas disponibles</h2>

      <div className={styles.filterContainer}>
        <DropdownInput
          id="meals-filter"
          label="Filtrar por tipo"
          options={filterOptions}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        />
      </div>

      <div className={styles.mealsGrid}>
        {filteredMeals.map((meal) => (
          <CatalogCard
            key={meal._id}
            meal={meal}
            onClick={() => addToCart(meal)}
          />
        ))}
      </div>

      {cart.length > 0 && (
        <div className={styles.floatingCartContainer}>
          <Button
            text={`Ver Carrito (${totalItems})`}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}

      <CartModal
        isOpen={isModalOpen}
        onClose={handleCloseCart}
        onSave={handleProcessOrder}
        fieldErrors={fieldErrors}
        formError={formError}
      />

      <ConfirmModal
        title="Confirmar Pedido"
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmOrder}
        message={`¿Estás seguro de confirmar tu pedido por un total de $${pendingOrder?.total}?`}
      />

      <OrderSuccessModal
        isOpen={!!successOrderCode}
        onClose={() => setSuccessOrderCode(null)}
        orderCode={successOrderCode}
      />
    </section>
  );
}

export default CatalogPage;
