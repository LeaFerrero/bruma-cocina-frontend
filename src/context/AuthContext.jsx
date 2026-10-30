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
import AppError from "../utils/AppError";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await verifySession();
      const userData = response?.user || response?.data?.user;

      if (!userData) {
        throw new AppError(
          "Sesión inválida o expirada",
          401,
          "fail",
          null,
          "UNAUTHORIZED",
        );
      }

      setIsLogged(true);
      setUser(userData);
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
    try {
      const response = await apiLogin(credentials);

      const userData = response?.user || response?.data?.user;

      if (!userData) {
        throw new AppError(
          "Usuario y/o contraseña incorrectos",
          401,
          "fail",
          null,
          "INVALID_CREDENTIALS",
        );
      }

      setIsLogged(true);
      setUser(userData);
      return response;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        error.response?.data?.message || "Usuario y/o contraseña incorrectos",
        error.response?.status || 401,
        "fail",
        error.response?.data?.details || null,
        error.response?.data?.errorCode || "LOGIN_FAILED",
      );
    }
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
    throw new AppError(
      "useAuth debe ser usado dentro de un AuthProvider",
      500,
      "error",
      null,
      "AUTH_CONTEXT_ERROR",
    );
  }
  return context;
};

export { AuthProvider, AuthContext, useAuth };
