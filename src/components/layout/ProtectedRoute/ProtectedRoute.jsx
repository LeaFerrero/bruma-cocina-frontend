import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLogged, isLoading } = useAuth();

  if (isLoading) {
    return <div>Verificando autenticación...</div>;
  }

  if (!isLogged) {
    return <Navigate to="/gestion/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const fallbackRoutes = {
      admin: "/gestion/usuarios",
      cocina: "/gestion/cocina",
      caja: "/gestion/caja",
      stock: "/gestion/insumos",
    };

    const userDefaultRoute = fallbackRoutes[user.role] || "/gestion/login";
    return <Navigate to={userDefaultRoute} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
