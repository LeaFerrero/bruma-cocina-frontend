import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  PublicLayout,
  LoginLayout,
  ManagementLayout,
  ProtectedRoute,
  RoleBasedRedirect,
} from "./components/layout";

import {
  LandingPage,
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
          <Route index element={<LandingPage />} />
          <Route path="menu" element={<CatalogPage />} />
          <Route path="nosotros" element={<AboutUsPage />} />
        </Route>

        <Route path="/gestion">
          <Route element={<LoginLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          {/* El layout general sigue envolviendo a la sección de gestión */}
          <Route element={<ManagementLayout />}>
            <Route index element={<RoleBasedRedirect />} />

            {/* Cocina y Producción: Admin y Cocina */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.COCINA]} />
              }
            >
              <Route path="cocina" element={<KitchenPage />} />
              <Route path="produccion" element={<ProductionPage />} />
            </Route>

            {/* Caja: Admin y Caja */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.CAJA]} />
              }
            >
              <Route path="caja" element={<CheckoutPage />} />
            </Route>

            {/* Viandas e Insumos: Admin y Stock */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.STOCK]} />
              }
            >
              <Route path="viandas" element={<MealsPage />} />
              <Route path="insumos" element={<SuppliesPage />} />
            </Route>

            {/* Usuarios: Exclusivo Admin */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
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
