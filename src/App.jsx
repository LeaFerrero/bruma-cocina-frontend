import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ManagementLayout, LoginLayout } from "./components/layout";
import { LoginPage, MealsPage, SuppliesPage, UsersPage } from "./pages";

import { AuthContext } from "./context/AuthContext";

const PrivateRoute = () => {
  const { isLogged } = useContext(AuthContext);

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
        <Route path="/gestion">
          <Route element={<LoginLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<ManagementLayout />}>
              <Route index element={<Navigate to="usuarios" replace />} />
              <Route path="viandas" element={<MealsPage />} />
              <Route path="insumos" element={<SuppliesPage />} />
              <Route path="usuarios" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/gestion" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
