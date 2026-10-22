import React from "react";
import { Form, Input, TextArea } from "../../../../components/ui";

function CartForm({ id, formData, onChange, onSubmit }) {
  return (
    <Form id={id} title="Datos" onSubmit={onSubmit}>
      <Input
        id="cart-name"
        name="name"
        label="Nombre"
        value={formData.name}
        onChange={onChange}
        maxLength={50}
        required={true}
      />

      <Input
        id="cart-last-name"
        name="lastName"
        label="Apellido"
        value={formData.lastName}
        onChange={onChange}
        maxLength={50}
        required={true}
      />

      <Input
        id="cart-phone"
        name="phone"
        label="Teléfono"
        type="tel"
        value={formData.phone}
        onChange={onChange}
        maxLength={15}
        required={true}
      />

      <Input
        id="cart-address"
        name="address"
        label="Dirección"
        value={formData.address}
        onChange={onChange}
        maxLength={100}
        required={true}
      />

      <TextArea
        id="cart-notes"
        name="notas"
        label="Notas"
        placeholder="Notas para el pedido (opcional)"
        value={formData.notas}
        onChange={onChange}
        maxLength={250}
        rows={4}
      />
    </Form>
  );
}

export default CartForm;
