import React from "react";
import styles from "./UserCard.module.css";
import BasicCard from "../components/ui/cards/BasicCard.jsx";
import BasicButton from "../components/ui/buttons/BasicButton.jsx";
import ButtonGroup from "../components/ui/buttons/ButtonGroup.jsx";
import { ROLE_NAMES } from "../utils/roles.js";

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
          {user.lastName}
        </p>
        <p>
          <strong>Rol: </strong>
          {ROLE_NAMES[user.role]}
        </p>
      </div>
      <ButtonGroup>
        <BasicButton text={"Editar"} variant="secondary" onClick={onEdit} />
        <BasicButton text={"Eliminar"} variant="danger" onClick={onDelete} />
      </ButtonGroup>
    </BasicCard>
  );
}

export default UserCard;
