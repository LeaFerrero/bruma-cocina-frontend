import React from "react";
import BasicCard from "../ui/cards/BasicCard.jsx";
import BasicButton from "../ui/buttons/BasicButton.jsx";
import styles from "./UserCard.module.css";

function UserCard({ user, onEdit, onDelete }) {
  return (
    <BasicCard title={user.userName} interactive>
      <div className={styles.cardDetail}>
        <p>
          <strong>Nombre: </strong>
          {user.name}
        </p>
        <p>
          <strong>Apellido: </strong>
          {user.lastname}
        </p>
        <p>
          <strong>Rol: </strong>
          {user.rol}
        </p>
      </div>
      <div className={styles.buttonsContainer}>
        <BasicButton text={"Editar"} variant="secondary" onClick={onEdit} />
        <BasicButton text={"Eliminar"} variant="danger" onClick={onDelete} />
      </div>
    </BasicCard>
  );
}

export default UserCard;
