import React, { useState } from "react";
import { Form, Input, Button, ButtonGroup } from "../../../../components/ui";

function LoginForm({ onSubmit, formError, fieldErrors = {} }) {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loginData);
  };

  return (
    <Form onSubmit={handleSubmit} error={formError}>
      <Input
        id="login-user"
        name="userName"
        label="Usuario"
        value={loginData.userName}
        onChange={handleChange}
        placeholder="nombre.apellido"
        required
        error={fieldErrors.userName}
        minLength={5}
        maxLength={50}
      />

      <Input
        id="login-password"
        name="password"
        label="Contraseña"
        type="password"
        value={loginData.password}
        onChange={handleChange}
        required
        error={fieldErrors.password}
        minLength={8}
        maxLength={16}
      />

      <ButtonGroup>
        <Button text="Iniciar sesión" type="submit" />
      </ButtonGroup>
    </Form>
  );
}

export default LoginForm;
