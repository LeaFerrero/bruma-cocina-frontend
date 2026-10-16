const API_URL = import.meta.env.VITE_API_URL;

const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
      ...options,
      headers: {
        "Content-type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Ocurrió un error en el servidor";
      const error = new Error(errorMessage);
      error.backendData = data;

      console.error(`[Error del Backend en ${endpoint}]:`, data);

      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error capturado en apiFetch:", error.message);
    throw error;
  }
};

export default apiFetch;
