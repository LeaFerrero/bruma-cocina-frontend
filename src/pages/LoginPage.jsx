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
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setFieldErrors({});
    setFormError(null);

    const validations = loginSchema.safeParse(loginData);

    if (!validations.success) {
      const formattedErrors = {};

      validations.error.issues.forEach((issue) => {
        if (issue.path.length === 0) {
          setFormError(issue.message);
        } else {
          const key = issue.path.join(".");

          if (!formattedErrors[key]) {
            formattedErrors[key] = issue.message;
          }
        }
      });

      setFieldErrors(formattedErrors);
      return;
    }

    try {
      const response = await login(validations.data);

      loginContext(response.data.user);

      toast.success(response.message);

      navigate("/gestion", { replace: true });
    } catch (error) {
      if (error.details) {
        setFieldErrors(error.details);
      } else {
        setFormError(
          error.message || "Ocurrió un error inesperado al intentar ingresar.",
        );
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
            formError={formError}
            fieldErrors={fieldErrors}
          />
        </BasicCard>
      </div>
    </div>
  );
}

export default LoginPage;
