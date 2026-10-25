import apiFetch from "../../../services/apiClient";

const createOrder = (orderData) => {
  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};

export { createOrder };
