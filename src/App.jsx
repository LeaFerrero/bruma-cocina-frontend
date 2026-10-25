import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  PublicLayout,
  LoginLayout,
  ManagementLayout,
} from "./components/layout";

import {
  CatalogPage,
  AboutUsPage,
  LoginPage,
  KitchenPage,
  ProductionPage,
  CheckoutPage,
  MealsPage,
  SuppliesPage,
  UsersPage,
} from "./pages";

import { useAuth, CartProvider } from "./context";
import { ROLES } from "./features/users";

const PrivateRoute = () => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/gestion/login" replace />;
  }
  return <Outlet />;
};

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

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        containerStyle={{
          zIndex: 9999999,
        }}
        toastOptions={{ className: "toast-alert", duration: 5000 }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <CartProvider>
              <PublicLayout />
            </CartProvider>
          }
        >
          <Route index element={<CatalogPage />} />
          <Route path="nosotros" element={<AboutUsPage />} />
        </Route>

        <Route path="/gestion">
          <Route element={<LoginLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<ManagementLayout />}>
              <Route index element={<RoleBasedRedirect />} />
              <Route path="cocina" element={<KitchenPage />} />
              <Route path="produccion" element={<ProductionPage />} />
              <Route path="caja" element={<CheckoutPage />} />
              <Route path="viandas" element={<MealsPage />} />
              <Route path="insumos" element={<SuppliesPage />} />
              <Route path="usuarios" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
