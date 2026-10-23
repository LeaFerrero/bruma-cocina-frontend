import apiFetch from "../../../services/apiClient";

const registerProduction = (meals) => {
  return apiFetch("/production", {
    method: "POST",
    body: JSON.stringify(meals),
  });
};

export { registerProduction };
