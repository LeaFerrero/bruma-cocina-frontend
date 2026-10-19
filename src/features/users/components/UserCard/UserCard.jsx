import React from "react";
import styles from "./UserCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";
import { ROLE_NAMES } from "../../utils/roles";

function UserCard({ user, onEdit, onDelete }) {
  return (
    <Card title={user.userName} interactive>
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
        <Button text={"Editar"} variant="secondary" onClick={onEdit} />
        <Button text={"Eliminar"} variant="danger" onClick={onDelete} />
      </ButtonGroup>
    </Card>
  );
}

export default UserCard;
