import React, { useContext, useState } from "react";
import styles from "./LoginPage.module.css";
import LoginForm from "../auth/LoginForm";
import BasicCard from "../components/ui/cards/BasicCard";
import { login } from "../api/loginApi";
import { loginSchema } from "../utils/validations/loginValidation";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const validations = loginSchema.safeParse(loginData);
    if (!validations.success) {
      const fieldErrors = validations.error.flatten().fieldErrors;
      const formattedErrors = {};
      for (const key in fieldErrors) {
        formattedErrors[key] = fieldErrors[key][0];
      }

      setFormErrors(formattedErrors);
      return;
    }

    setFormErrors({});

    try {
      const response = await login(loginData);
      loginContext(response.user);
      toast.success("Sesion iniciada con exito");
      navigate("/gestion", { replace: true });
    } catch (error) {
      if (error.backendData && error.backendData.message) {
        toast.error(error.backendData.message);
      } else {
        toast.error(`Ocurrio un error ${error.message}`);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <BasicCard title="Login" headingLevel="h2">
          <LoginForm
            loginData={loginData}
            setLoginData={setLoginData}
            onSubmit={handleLogin}
            errors={formErrors}
          />
        </BasicCard>
      </div>
    </div>
  );
}

export default LoginPage;
