import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { Card } from "../../components/ui";
import { LoginForm, login, loginSchema } from "../../features/auth";

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
        <Card title="Login" headingLevel="h2">
          <LoginForm
            loginData={loginData}
            setLoginData={setLoginData}
            onSubmit={handleLogin}
            formError={formError}
            fieldErrors={fieldErrors}
          />
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
