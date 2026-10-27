import apiFetch from "../../../services/apiClient";

const getMeals = () => {
  return apiFetch("/meals");
};

const getMealImages = () => {
  return apiFetch("/meals/images");
};

const getMealById = (id) => {
  return apiFetch(`/meals/${id}`);
};

const createMeal = (mealData) => {
  return apiFetch("/meals", {
    method: "POST",
    body: JSON.stringify(mealData),
  });
};

const editMeal = (id, mealData) => {
  return apiFetch(`/meals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(mealData),
  });
};

const deleteMeal = (id) => {
  return apiFetch(`/meals/${id}`, {
    method: "DELETE",
  });
};

export {
  getMeals,
  getMealImages,
  getMealById,
  createMeal,
  editMeal,
  deleteMeal,
};
