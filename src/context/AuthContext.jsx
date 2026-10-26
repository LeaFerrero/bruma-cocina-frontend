import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { verifySession } from "../features/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // checkAuth estabilizado con useCallback
  const checkAuth = useCallback(async () => {
    try {
      const response = await verifySession();
      setIsLogged(true);
      setUser(response.data.user);
    } catch (error) {
      setIsLogged(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 1. Verificación inicial al cargar la app
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 2. Verificación automática cuando el usuario vuelve a la pestaña
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        !window.location.pathname.includes("/login")
      ) {
        checkAuth(); // Si la sesión murió en segundo plano, apiFetch se encarga de la redirección dura
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkAuth]);

  const loginContext = (userData) => {
    setIsLogged(true);
    setUser(userData);
  };

  const logoutContext = () => {
    setIsLogged(false);
    setUser(null);
  };

  if (isLoading) {
    return <div>Verificando sesión...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isLogged, user, loginContext, logoutContext, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
};

export { AuthProvider, AuthContext, useAuth };
