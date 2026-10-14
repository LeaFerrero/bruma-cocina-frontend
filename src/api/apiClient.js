const API_URL = import.meta.env.VITE_API_URL;

const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Ocurrió un error en el servidor";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default apiFetch;
