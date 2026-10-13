import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/usuarios" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
