import React, { useState } from "react";
import { Form, Input, TextArea } from "../../../../components/ui";
import { useCart } from "../../../../context/CartContext";

export function CartForm({
  id,
  onSave,
  fieldErrors = {},
  initialData,
  onClientDataChange,
}) {
  const { cart, totalAmount } = useCart();

  const [clientData, setClientData] = useState(
    initialData || {
      name: "",
      lastName: "",
      phone: "",
      address: "",
      notes: "",
    },
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...clientData, [name]: value };

    setClientData(updatedData);

    if (onClientDataChange) {
      onClientDataChange(updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMeals = cart.map((meal) => ({
      _id: meal._id,
      name: meal.name,
      quantity: meal.quantity,
      price: meal.price,
    }));

    const placedOrder = {
      ...clientData,
      meals: formattedMeals,
      total: totalAmount,
    };

    onSave(placedOrder);
  };

  return (
    <Form id={id} title="Datos del cliente" onSubmit={handleSubmit}>
      <Input
        id="cart-name"
        name="name"
        label="Nombre"
        value={clientData.name}
        onChange={handleInputChange}
        maxLength={50}
        required
        error={fieldErrors.name}
      />

      <Input
        id="cart-last-name"
        name="lastName"
        label="Apellido"
        value={clientData.lastName}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
        maxLength={15}
        required
        error={fieldErrors.phone}
      />

      <Input
        id="cart-address"
        name="address"
        label="Dirección"
        value={clientData.address}
        onChange={handleInputChange}
        maxLength={100}
        required
        error={fieldErrors.address}
      />

      <TextArea
        id="cart-notes"
        name="notes"
        label="Notas"
        placeholder="Notas para el pedido (opcional)"
        value={clientData.notes}
        onChange={handleInputChange}
        maxLength={250}
        rows={8}
        error={fieldErrors.notes}
      />
    </Form>
  );
}

export default CartForm;
