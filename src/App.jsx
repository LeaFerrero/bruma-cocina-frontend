import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ManagementLayout from "./components/layout/ManagementLayout";
import LoginLayout from "./components/layout/LoginLayout";
import LoginPage from "./pages/LoginPage";
import SuppliesPage from "./pages/SuppliesPage";
import UsersPage from "./pages/UsersPage";
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
