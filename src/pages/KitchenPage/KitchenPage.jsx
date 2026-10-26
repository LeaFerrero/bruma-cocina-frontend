import React, { useState, useEffect } from "react";
import styles from "./KitchenPage.module.css";
import {
  DateInput,
  DropdownInput,
  OrderCard,
  AutocompleteInput,
  ConfirmModal,
} from "../../components/ui";
import { KitchenOrderModal } from "../../features/kitchen";
import {
  getOrders,
  dispatchOrder,
  cancelOrder,
} from "../../services/ordersApi";
import toast from "react-hot-toast";

const getTodayString = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

const filterOptions = [
  { value: "Todas", label: "Todas" },
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "DESPACHADO", label: "Despachado" },
  { value: "CANCELADO", label: "Cancelado" },
];

function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("PENDIENTE");
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
  }, [selectedFilter, selectedDate]);

  const orderCodes = orders.map((order) => order.orderCode);

  const filteredOrders = orders.filter((order) =>
    order.orderCode?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleOpenCancelModal = () => {
    setIsConfirmOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsConfirmOpen(false);
  };

  const handleDispatchOrder = async () => {
    if (!selectedOrder) return;

    try {
      const response = await dispatchOrder(selectedOrder._id);
      toast.success(response.message);

      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      const response = await cancelOrder(selectedOrder._id);
      toast.success(response.message);

      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className={styles.kitchenSection}>
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
            options={filterOptions}
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
              <OrderCard
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

      <KitchenOrderModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={handleCloseModal}
        onDispatch={handleDispatchOrder}
        onCancel={handleOpenCancelModal}
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
      />
    </section>
  );
}

export default Kitchen;
