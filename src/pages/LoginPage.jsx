import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import LoginForm from "../auth/LoginForm";
import BasicCard from "../components/ui/cards/BasicCard";
import { login } from "../api/loginApi";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.userName || !loginData.password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    setError("");

    try {
      const response = await login(loginData);

      console.log("¡Sesión iniciada con éxito!", response);
    } catch (err) {
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <BasicCard title="Login" headingLevel="h2">
          <LoginForm
            loginData={loginData}
            setLoginData={setLoginData}
            error={error}
            onSubmit={handleLogin}
          />
        </BasicCard>
      </div>
    </div>
  );
}

export default LoginPage;
