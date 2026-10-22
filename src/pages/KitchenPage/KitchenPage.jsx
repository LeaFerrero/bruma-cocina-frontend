import React, { useState } from "react";
import styles from "./KitchenPage.module.css";
import { DropdownInput, OrderCard } from "../../components/ui";
import { KitchenOrderModal } from "../../features/kitchen";
import orders from "../../data/ordersData";

function Kitchen() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Pendiente");

  const uniqueCategories = [...new Set(orders.map((order) => order.status))];
  const filterOptions = [
    { value: "Todas", label: "Todas" },
    ...uniqueCategories.map((cat) => ({ value: cat, label: cat })),
  ];

  const filteredOrders =
    selectedFilter === "Todas"
      ? orders
      : orders.filter((order) => order.status === selectedFilter);

  const handleDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleDispatchOrder = () => {
    alert("Pedido despachado");
    handleCloseModal();
  };

  const handleCancelOrder = () => {
    alert("Pedido cancelado");
    handleCloseModal();
  };

  return (
    <section className={styles.kitchenSection}>
      <h2>Comandas</h2>

      <div className={styles.filterContainer}>
        <DropdownInput
          id="order-filter"
          label="Filtrar por estado"
          options={filterOptions}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        />
      </div>
      <div className={styles.ordersGrid}>
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            onDetails={() => handleDetails(order)}
          />
        ))}
      </div>

      <div>
        <KitchenOrderModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={handleCloseModal}
          onDispatch={handleDispatchOrder}
          onCancel={handleCancelOrder}
        />
      </div>
    </section>
  );
}

export default Kitchen;
