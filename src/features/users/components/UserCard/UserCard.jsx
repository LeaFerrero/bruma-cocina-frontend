import React from "react";
import styles from "./UserCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";
import { ROLES, ROLE_NAMES } from "../../utils/roles";

function UserCard({ user, onEdit, onDelete }) {
  const isAdmin = user.role === ROLES.ADMIN;

  let tooltipMessage = "";

  if (isAdmin) {
    tooltipMessage = "No está permitido eliminar cuentas de Administrador";
  }

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

        <Button
          text={isAdmin ? "No se puede eliminar" : "Eliminar"}
          variant="danger"
          onClick={onDelete}
          disabled={isAdmin}
        />
      </ButtonGroup>
    </Card>
  );
}

export default UserCard;
