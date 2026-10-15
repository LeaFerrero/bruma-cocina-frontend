import apiFetch from "./apiClient";

const login = (loginData) => {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
};

const logout = () => {
  return apiFetch("/logout", {
    method: "POST",
  });
};

export { login, logout };
