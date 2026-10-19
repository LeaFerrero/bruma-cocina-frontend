import React from "react";
import { Form, Input, Button, ButtonGroup } from "../../../../components/ui";

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
    <Form onSubmit={onSubmit} error={formError}>
      <Input
        id="login-user"
        name="userName"
        label="Usuario"
        value={loginData.userName}
        onChange={handleChange}
        placeholder="nombre.apellido"
        required
        error={fieldErrors.userName}
      />

      <Input
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
        <Button text="Iniciar sesión" type="submit" />
      </ButtonGroup>
    </Form>
  );
}

export default LoginForm;
