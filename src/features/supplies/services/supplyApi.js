import apiFetch from "../../../services/apiClient";

const getSupplies = () => {
  return apiFetch("/supplies");
};

const getSupplyById = (id) => {
  return apiFetch(`/supplies/${id}`);
};

const createSupply = (supplyData) => {
  return apiFetch("/supplies", {
    method: "POST",
    body: JSON.stringify(supplyData),
  });
};

const editSupply = (id, supplyData) => {
  return apiFetch(`/supplies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(supplyData),
  });
};

const deleteSupply = (id) => {
  return apiFetch(`/supplies/${id}`, {
    method: "DELETE",
  });
};

const addStock = (items) => {
  return apiFetch("/supplies/", {
    method: "PATCH",
    body: JSON.stringify({ items }),
  });
};

export {
  getSupplies,
  getSupplyById,
  createSupply,
  editSupply,
  deleteSupply,
  addStock,
};
