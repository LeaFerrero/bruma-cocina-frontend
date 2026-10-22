import React, { useState } from "react";
import styles from "./CatalogPage.module.css";
import { useCart } from "../../context/CartContext";
import { CatalogCard } from "../../features/catalog";
import { CartModal } from "../../features/cart";
import { DropdownInput, Button } from "../../components/ui";
import meals from "../../data/mealsData";

function CatalogPage() {
  const { cart, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Todas");

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
            onClick={() => setIsCartOpen(true)}
          />
        </div>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </section>
  );
}

export default CatalogPage;
