import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  verifySession,
} from "../features/auth/services/loginapi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        !window.location.pathname.includes("/login")
      ) {
        checkAuth();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkAuth]);

  const loginContext = async (credentials) => {
    const response = await apiLogin(credentials);
    setIsLogged(true);
    setUser(response.data.user);
    return response;
  };

  const logoutContext = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLogged(false);
      setUser(null);
      window.location.href = "/gestion/login";
    }
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
