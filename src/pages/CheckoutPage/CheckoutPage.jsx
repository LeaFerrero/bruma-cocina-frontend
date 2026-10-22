import React, { useState } from "react";
import styles from "./CheckoutPage.module.css";
import { DropdownInput, OrderCard } from "../../components/ui";
import { CheckoutOrderModal } from "../../features/checkout";
import orders from "../../data/ordersData";

function Checkout() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Pendiente");

  const uniqueCategories = [...new Set(orders.map((order) => order.status))];
  const filterOptions = [
    { value: "Todas", text: "Todas" },
    ...uniqueCategories.map((cat) => ({ value: cat, text: cat })),
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

  const handleProcessPayment = () => {
    alert("Pago registrado exitosamente");
    handleCloseModal();
  };

  const handleCancelOrder = () => {
    alert("Operación cancelada");
    handleCloseModal();
  };

  return (
    <section className={styles.checkoutSection}>
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
        <CheckoutOrderModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={handleCloseModal}
          onProcessPayment={handleProcessPayment}
          onCancel={handleCancelOrder}
        />
      </div>
    </section>
  );
}

export default Checkout;
