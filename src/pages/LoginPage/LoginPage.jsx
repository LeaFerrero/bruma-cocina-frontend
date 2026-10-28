import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./LoginPage.module.css";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/";
import { Card } from "../../components/ui";
import { LoginForm, loginSchema } from "../../features/auth";

function LoginPage() {
  const [searchParams] = useSearchParams();
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const { loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      setFormError(
        "Su sesión ha excedido el tiempo límite. Por favor, acceda de nuevo.",
      );
    }
  }, [searchParams]);

  const handleLogin = async (loginData) => {
    setFieldErrors({});
    setFormError(null);

    const validations = loginSchema.safeParse(loginData);

    if (!validations.success) {
      const formattedErrors = {};
      validations.error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        if (!formattedErrors[key]) {
          formattedErrors[key] = issue.message;
        }
      });

      setFieldErrors(formattedErrors);
      return;
    }

    try {
      const response = await loginContext(validations.data);
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
