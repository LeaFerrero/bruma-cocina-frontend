import React from "react";
import BasicForm from "../components/ui/forms/BasicForm";
import BasicInput from "../components/ui/inputs/BasicInput";
import BasicButton from "../components/ui/buttons/BasicButton";
import styles from "./LoginForm.module.css";

function LoginForm({ loginData, setLoginData, error, onSubmit, errors = {} }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <BasicForm onSubmit={onSubmit}>
      <BasicInput
        id="login-user"
        name="userName"
        label="Usuario"
        value={loginData.username}
        onChange={handleChange}
        placeholder="nombre.apellido"
        required
        error={errors.userName}
      />

      <BasicInput
        id="login-password"
        name="password"
        label="Contraseña"
        type="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="contraseña"
        required
        error={errors.password}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.buttonContainer}>
        <BasicButton
          text="Iniciar sesión"
          type="submit"
          className={styles.submitButton}
        />
      </div>
    </BasicForm>
  );
}

export default LoginForm;
