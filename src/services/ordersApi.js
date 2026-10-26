import apiFetch from "./apiClient";

const getOrders = (orderStatus = null, paymentStatus = null, date = null) => {
  const params = new URLSearchParams();

  if (orderStatus) {
    params.append("orderStatus", orderStatus);
  }

  if (paymentStatus) {
    params.append("paymentStatus", paymentStatus);
  }

  if (date) {
    params.append("date", date);
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/orders?${queryString}` : "/orders";

  return apiFetch(endpoint);
};

const createOrder = (orderData) => {
  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};

const getOrderById = (id) => {
  return apiFetch(`/orders/${id}`);
};

const dispatchOrder = (id) => {
  return apiFetch(`/orders/${id}/dispatch`, {
    method: "PATCH",
  });
};

const cancelOrder = (id) => {
  return apiFetch(`/orders/${id}/cancel`, {
    method: "PATCH",
  });
};

export { createOrder, getOrders, getOrderById, dispatchOrder, cancelOrder };
