import React, { useState } from "react";
import styles from "./CartModal.module.css";
import { useCart } from "../../../../context/CartContext";
import CartForm from "../CartForm/CartForm";
import CartItem from "../CartItem/CartItem";
import { Modal, Button, ButtonGroup } from "../../../../components/ui";

function CartModal({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart, totalAmount, clearCart } =
    useCart();

  const [formData, clientData] = useState({
    name: "",
    lastName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    clientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAceptar = (e) => {
    e.preventDefault();

    const placedOrder = {
      cliente: formData,
      items: cart.map((item) => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: totalAmount,
      fecha: new Date().toISOString(),
    };

    console.log("Enviando pedido a la base de datos:", placedOrder);
    alert("Pedido enviado con éxito");

    clearCart();
    clientData({ name: "", lastName: "", phone: "", address: "", notes: "" });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Finalizar Pedido">
      <div className={styles.modalLayout}>
        <div className={styles.columnForm}>
          <CartForm
            form="cart-order-form"
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleAceptar}
          />
        </div>

        <div className={styles.columnMeals}>
          <h3 className={styles.columnTitle}>Viandas</h3>

          <div className={styles.cartItemsContainer}>
            {cart.length === 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))
            )}
          </div>

          <div className={styles.subtotalGroup}>
            <label>Subtotal</label>
            <div className={styles.subtotalBox}>${totalAmount}</div>
          </div>

          <ButtonGroup>
            <Button
              type="submit"
              form="cart-order-form"
              disabled={cart.length === 0}
              text="Aceptar"
            />
            <Button
              type="button"
              variant="cancel"
              onClick={onClose}
              text="Cancelar"
            />
          </ButtonGroup>
        </div>
      </div>
    </Modal>
  );
}

export default CartModal;
