import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/index";
import { ROLES } from "../../../features/users/index";

const RoleBasedRedirect = () => {
  const { user } = useAuth();

  if (!user || !user.role) return null;

  const roleRoutes = {
    [ROLES.ADMIN]: "/gestion/usuarios",
    [ROLES.COCINA]: "/gestion/cocina",
    [ROLES.CAJA]: "/gestion/caja",
    [ROLES.STOCK]: "/gestion/insumos",
  };

  const targetRoute = roleRoutes[user.role];

  if (!targetRoute) {
    return <Navigate to="/gestion/login" replace />;
  }

  return <Navigate to={targetRoute} replace />;
};

export default RoleBasedRedirect;
