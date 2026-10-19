import { createContext, useState, useEffect } from "react";
import { verifySession } from "../features/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifySession();

        setIsLogged(true);
        setUser(response.data.user);
        setIsLoading(false);
      } catch (error) {
        setIsLogged(false);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

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
      value={{ isLogged, user, loginContext, logoutContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
