import apiFetch from "../../../services/apiClient";

const getMeals = () => {
  return apiFetch("/meals");
};

const getMealById = (id) => {
  return apiFetch(`/meals/${id}`);
};

const createMeal = (mealData) => {
  return apiFetch("/meals", {
    method: "POST",
    body: mealData,
  });
};

const editMeal = (id, mealData) => {
  return apiFetch(`/meals/${id}`, {
    method: "PATCH",
    body: mealData,
  });
};

const deleteMeal = (id) => {
  return apiFetch(`/meals/${id}`, {
    method: "DELETE",
  });
};

export { getMeals, getMealById, createMeal, editMeal, deleteMeal };
