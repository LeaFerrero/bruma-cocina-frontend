import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ProtectedRoute = () => {
  const { isLogged, isLoading } = useAuth();

  if (isLoading) {
    return <div>Verificando autenticación...</div>;
  }

  return isLogged ? <Outlet /> : <Navigate to="/gestion/login" replace />;
};

export default ProtectedRoute;
