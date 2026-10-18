import React from "react";
import BasicForm from "../components/ui/forms/BasicForm";
import BasicInput from "../components/ui/inputs/BasicInput";
import BasicButton from "../components/ui/buttons/BasicButton";
import ButtonGroup from "../components/ui/buttons/ButtonGroup";

function LoginForm({
  loginData,
  setLoginData,
  onSubmit,
  formError,
  fieldErrors = {},
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <BasicForm onSubmit={onSubmit} error={formError}>
      <BasicInput
        id="login-user"
        name="userName"
        label="Usuario"
        value={loginData.userName}
        onChange={handleChange}
        placeholder="nombre.apellido"
        required
        error={fieldErrors.userName}
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
        error={fieldErrors.password}
      />

      <ButtonGroup>
        <BasicButton text="Iniciar sesión" type="submit" />
      </ButtonGroup>
    </BasicForm>
  );
}

export default LoginForm;
