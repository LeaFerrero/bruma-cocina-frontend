import React from "react";
import { Form, Input, TextArea } from "../../../../components/ui";

function CartForm({ id, clientData, onChange, onSubmit, fieldErrors = {} }) {
  return (
    <Form id={id} title="Datos" onSubmit={onSubmit}>
      <Input
        id="cart-name"
        name="name"
        label="Nombre"
        value={clientData.name}
        onChange={onChange}
        maxLength={50}
        required
        error={fieldErrors.name}
      />

      <Input
        id="cart-last-name"
        name="lastName"
        label="Apellido"
        value={clientData.lastName}
        onChange={onChange}
        maxLength={50}
        required
        error={fieldErrors.lastName}
      />

      <Input
        id="cart-phone"
        name="phone"
        label="Teléfono"
        type="tel"
        value={clientData.phone}
        onChange={onChange}
        maxLength={15}
        required
        error={fieldErrors.phone}
      />

      <Input
        id="cart-address"
        name="address"
        label="Dirección"
        value={clientData.address}
        onChange={onChange}
        maxLength={100}
        requirederror={fieldErrors.address}
      />

      <TextArea
        id="cart-notes"
        name="notas"
        label="Notas"
        placeholder="Notas para el pedido (opcional)"
        value={clientData.notas}
        onChange={onChange}
        maxLength={250}
        rows={7}
        error={fieldErrors.notes}
      />
    </Form>
  );
}

export default CartForm;
