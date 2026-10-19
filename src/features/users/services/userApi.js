import apiFetch from "../../../services/apiClient";

const getUsers = () => {
  return apiFetch("/users");
};

const getUserById = (id) => {
  return apiFetch(`/users/${id}`);
};

const createUser = (userData) => {
  return apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

const editUser = (id, userData) => {
  return apiFetch(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

const deleteUser = (id) => {
  return apiFetch(`/users/${id}`, {
    method: "DELETE",
  });
};

export { getUsers, getUserById, createUser, editUser, deleteUser };
