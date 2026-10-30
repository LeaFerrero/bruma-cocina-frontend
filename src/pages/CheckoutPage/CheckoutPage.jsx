import React, { useState, useEffect } from "react";
import styles from "./CheckoutPage.module.css";
import {
  DateInput,
  AutocompleteInput,
  DropdownInput,
  ConfirmModal,
} from "../../components/ui";
import { getOrders, cancelOrder } from "../../services/ordersApi";
import {
  CheckoutOrderModal,
  CheckoutOrderCard,
  createPayment,
} from "../../features/checkout";
import { getBusinessDate } from "../../utils/dates";
import { socket } from "../../services/socket";
import toast from "react-hot-toast";
import { ORDER_STATUS, ORDER_STATUS_OPTIONS } from "../../features/kitchen";

function Checkout() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(ORDER_STATUS.PENDIENTE);
  const [selectedDate, setSelectedDate] = useState(getBusinessDate());
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);

        const statusToSend = selectedFilter === "Todas" ? null : selectedFilter;

        const response = await getOrders(statusToSend, null, selectedDate);

        const dataToSave = response.data || response;
        setOrders(Array.isArray(dataToSave) ? dataToSave : []);
      } catch (error) {
        console.error("Error al cargar las comandas:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();

    socket.on("order-created", () => {
      loadOrders();
    });

    socket.on("order-updated", () => {
      loadOrders();
    });

    return () => {
      socket.off("order-created");
      socket.off("order-updated");
    };
  }, [selectedFilter, selectedDate]);

  const orderCodes = orders.map((order) => order.orderCode);

  const filteredOrders = orders.filter((order) =>
    order.orderCode?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDetails = (order) => {
    setError(null);
    setSelectedOrder(order);
  };

  const handleOpenCancelModal = () => {
    setError(null);
    setIsConfirmOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsConfirmOpen(false);
    setError(null);
  };

  const handleProcessPayment = async (paymentData) => {
    try {
      const response = await createPayment(paymentData);
      toast.success(response.message);
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      const response = await cancelOrder(selectedOrder._id);
      toast.success(response.message);

      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className={styles.checkoutSection}>
      <h2>Comandas</h2>
      <div className={styles.filtersToolbar}>
        <div className={styles.filterContainer}>
          <DateInput
            id="date-filter"
            label="Filtrar por fecha"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className={styles.filterContainer}>
          <DropdownInput
            id="order-filter"
            label="Filtrar por estado"
            options={ORDER_STATUS_OPTIONS}
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          />
        </div>

        <div className={styles.filterContainer}>
          <AutocompleteInput
            label="Buscar por código"
            placeholder="Código..."
            options={orderCodes}
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
      </div>
      {isLoading ? (
        <p className={styles.statusMessage}>Cargando datos...</p>
      ) : (
        <div className={styles.ordersGrid}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <CheckoutOrderCard
                key={order._id}
                order={order}
                onDetails={() => handleDetails(order)}
              />
            ))
          ) : (
            <p className={styles.statusMessage}>No se encontraron comandas.</p>
          )}
        </div>
      )}

      <CheckoutOrderModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={handleCloseModal}
        onProcessPayment={handleProcessPayment}
        onCancel={handleOpenCancelModal}
        formError={error}
      />

      <ConfirmModal
        title="Cancelar comanda"
        isOpen={isConfirmOpen}
        onClose={handleCloseModal}
        onConfirm={handleCancelOrder}
        isDanger={true}
        confirmText="Sí, cancelar"
        cancelText="Volver"
        message={`¿Desea cancelar la comanda "${selectedOrder?.orderCode || ""}"? Esta acción no se puede deshacer.`}
        error={error}
      />
    </section>
  );
}

export default Checkout;
