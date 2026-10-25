import React from "react";
import styles from "./CartItem.module.css";
import { Button } from "../../../../components/ui";
import toast from "react-hot-toast";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className={styles.cartItem}>
      <span className={styles.itemName}>{item.name}</span>

      <div className={styles.controlsContainer}>
        <Button
          text="-"
          variant="secondary"
          isSquare={true}
          ariaLabel="Disminuir cantidad"
          disabled={item.quantity <= 1}
          onClick={() => onUpdateQuantity(item._id, -1)}
        />

        <div className={styles.quantityBox}>{item.quantity}</div>

        <Button
          text="+"
          variant="secondary"
          isSquare={true}
          ariaLabel="Aumentar cantidad"
          onClick={() => onUpdateQuantity(item._id, 1, item.currentStock)}
        />

        <Button
          text="X"
          variant="danger"
          isSquare={true}
          ariaLabel={`Eliminar ${item.title}`}
          onClick={() => onRemove(item._id)}
        />
      </div>
    </div>
  );
}

export default CartItem;
