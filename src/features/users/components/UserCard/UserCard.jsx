import React from "react";
import styles from "./UserCard.module.css";
import { Card, Button, ButtonGroup } from "../../../../components/ui";
import { ROLES, ROLE_NAMES } from "../../utils/roles";
import { useAuth } from "../../../../context/index";

function UserCard({ user, onEdit, onDelete }) {
  const { user: currentUser } = useAuth();
  const isRootAdmin = user.userName === "admin.admin";
  const isSelf = currentUser && user.userName === currentUser.userName;
  const isNotDeletable = isRootAdmin || isSelf;

  let buttonText = "Eliminar";
  if (isRootAdmin) {
    buttonText = "No se puede eliminar";
  } else if (isSelf) {
    buttonText = "Usuario actual";
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
          text={buttonText}
          variant="danger"
          onClick={onDelete}
          disabled={isNotDeletable}
        />
      </ButtonGroup>
    </Card>
  );
}

export default UserCard;
