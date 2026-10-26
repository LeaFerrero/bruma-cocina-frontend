import React, { useState } from "react";
import styles from "./CartModal.module.css";
import { useCart } from "../../../../context/CartContext";
import CartForm from "../CartForm/CartForm";
import CartItem from "../CartItem/CartItem";
import { Modal, Button, ButtonGroup } from "../../../../components/ui";

function CartModal({
  isOpen,
  onClose,
  onSave,
  fieldErrors = {},
  formError = null,
}) {
  const { cart, updateQuantity, removeFromCart, totalAmount, clearCart } =
    useCart();

  const [clientData, setClientData] = useState({
    name: "",
    lastName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleCancelOrder = () => {
    clearCart();
    setClientData({
      name: "",
      lastName: "",
      phone: "",
      address: "",
      notes: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pedido">
      <div className={styles.modalLayout}>
        <div className={styles.columnForm}>
          <CartForm
            id="cart-order-form"
            onSave={onSave}
            fieldErrors={fieldErrors}
            initialData={clientData}
            onClientDataChange={setClientData}
          />
        </div>

        <div className={styles.columnMeals}>
          <h3 className={styles.columnTitle}>Viandas</h3>

          <div className={styles.cartItemsContainer}>
            {cart.length === 0 ? (
              <p>El carrito esta vacio.</p>
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

          {formError && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{formError}</p>
          )}

          <ButtonGroup>
            <Button
              type="submit"
              form="cart-order-form"
              disabled={cart.length === 0}
              text="Confirmar pedido"
            />
            <Button
              type="button"
              variant="cancel"
              onClick={handleCancelOrder}
              text="Cancelar"
            />
          </ButtonGroup>
        </div>
      </div>
    </Modal>
  );
}

export default CartModal;
