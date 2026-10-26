import React, { useState, useEffect } from "react";
import styles from "./CatalogPage.module.css";
import { useCart } from "../../context/CartContext";
import { CatalogCard } from "../../features/catalog";
import { CartModal, OrderSuccessModal } from "../../features/cart";
import { DropdownInput, Button, ConfirmModal } from "../../components/ui";
import { orderSchema } from "../../features/cart/utils/cartValidation";
import { getMeals } from "../../features/meals";
import { createOrder } from "../../services/ordersApi";
import { socket } from "../../services/socket";
import toast from "react-hot-toast";

function CatalogPage() {
  const { cart, addToCart, clearCart } = useCart();

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Todas");

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [successOrderCode, setSuccessOrderCode] = useState(null);

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

  const uniqueCategories = [
    ...new Map(
      meals
        .flatMap((meal) =>
          Array.isArray(meal.category) ? meal.category : [meal.category],
        )
        .map((cat) => {
          const trimmed = cat.trim();
          return [trimmed.toLowerCase(), trimmed];
        }),
    ).values(),
  ].sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));

  const filterOptions = [
    { value: "Todas", label: "Todas" },
    ...uniqueCategories.map((cat) => ({ value: cat, label: cat })),
  ];

  const filteredMeals =
    selectedFilter === "Todas"
      ? meals
      : meals.filter((meal) =>
          Array.isArray(meal.category)
            ? meal.category.includes(selectedFilter)
            : meal.category === selectedFilter,
        );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleProcessOrder = (placedOrder) => {
    setFieldErrors({});
    setFormError(null);

    const validations = orderSchema.safeParse(placedOrder);

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

    const calculatedTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setOrderTotal(calculatedTotal);

    setPendingOrder(validations.data);
    setIsModalOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await createOrder(pendingOrder);

      clearCart();
      setIsConfirmOpen(false);
      setPendingOrder(null);

      setSuccessOrderCode(response.data.orderCode);
    } catch (error) {
      setIsConfirmOpen(false);
      setIsModalOpen(true);

      if (error.details) {
        error.details.forEach((detail) => {
          toast.error(detail, { duration: Infinity });
        });
      } else {
        const fallbackMessage =
          error.message || "Ocurrió un error inesperado al guardar.";
        toast.error(fallbackMessage);
      }
    }
  };

  const handleCloseCart = () => {
    setIsModalOpen(false);
    setFieldErrors({});
    setFormError(null);
    toast.dismiss();
  };

  if (isLoading) {
    return (
      <section className={styles.menuSection}>
        <h2>Viandas disponibles</h2>
        <div className={styles.loadingContainer}>
          <p>Cargando viandas...</p>
        </div>
      </section>
    );
  }

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
        onClose={() => {
          setIsConfirmOpen(false);
          setIsModalOpen(true);
        }}
        onConfirm={handleConfirmOrder}
        message={`¿Quiere confirmar su pedido por un total de $${orderTotal}?`}
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
