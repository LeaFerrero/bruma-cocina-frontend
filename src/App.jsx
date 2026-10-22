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
  LoginPage,
  KitchenPage,
  ProductionPage,
  CheckoutPage,
  MealsPage,
  SuppliesPage,
  UsersPage,
} from "./pages";

import { useAuth, CartProvider } from "./context";

const PrivateRoute = () => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/gestion/login" replace />;
  }
  return <Outlet />;
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
        </Route>

        <Route path="/gestion">
          <Route element={<LoginLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<ManagementLayout />}>
              <Route index element={<Navigate to="usuarios" replace />} />
              <Route path="cocina" element={<KitchenPage />} />
              <Route path="produccion" element={<ProductionPage />} />
              <Route path="caja" element={<CheckoutPage />} />
              <Route path="viandas" element={<MealsPage />} />
              <Route path="insumos" element={<SuppliesPage />} />
              <Route path="usuarios" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>

        {/* 4. Redirigimos URLs inválidas al catálogo para no espantar clientes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
