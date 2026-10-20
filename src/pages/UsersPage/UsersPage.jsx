import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./UsersPage.module.css";
import { Button, AutocompleteInput, ConfirmModal } from "../../components/ui";
import {
  UserCard,
  UserModal,
  getUsers,
  createUser,
  editUser,
  deleteUser,
  createUserSchema,
  updateUserSchema,
} from "../../features/users";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);

  const [userToDelete, setUserToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadUsers();
  }, []);

  const handleOpenCreateModal = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
    setFieldErrors({});
    setFormError(null);
  };

  const handleOpenEditModal = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
    setFieldErrors({});
    setFormError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirmOpen(false);
    setUserToEdit(null);
    setUserToDelete(null);
    setFieldErrors({});
    setFormError(null);
  };

  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setIsConfirmOpen(true);
  };

  const handleSaveUser = async (userData, id) => {
    setFieldErrors({});
    setFormError(null);

    const schemaToUse = id ? updateUserSchema : createUserSchema;
    const validations = schemaToUse.safeParse(userData);

    if (!validations.success) {
      const formattedErrors = {};

      validations.error.issues.forEach((issue) => {
        if (issue.path.length === 0) {
          setFormError(issue.message);
        } else {
          const key = issue.path.join(".");

          if (!formattedErrors[key]) {
            formattedErrors[key] = issue.message;
          }
        }
      });

      setFieldErrors(formattedErrors);
      return;
    }

    const cleanData = validations.data;

    try {
      let response;

      if (id) {
        response = await editUser(id, cleanData);
      } else {
        response = await createUser(cleanData);
      }

      toast.success(response.message);

      const usersResponse = await getUsers();
      setUsers(usersResponse.data);

      handleCloseModal();
    } catch (error) {
      if (error.details) {
        setFieldErrors(error.details);
      } else {
        setFormError(
          error.message || "Ocurrió un error inesperado al guardar el usuario.",
        );
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const response = await deleteUser(userToDelete._id);
      toast.success(response.message);

      const usersResponse = await getUsers();
      setUsers(usersResponse.data);

      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const userNames = users.map((user) => user.userName);

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className={styles.usersSection}>
      <div className={styles.titleContainer}>
        <h2>Usuarios</h2>
        <div>
          <Button
            text="Registrar usuario"
            variant="primary"
            onClick={handleOpenCreateModal}
          />
        </div>
      </div>

      <div className={styles.searchContainer}>
        <AutocompleteInput
          label="Buscar por nombre"
          placeholder="Nombre..."
          options={userNames}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className={styles.usersGrid}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={() => handleOpenEditModal(user)}
              onDelete={() => handleOpenDeleteModal(user)}
            />
          ))
        ) : (
          <p className={styles.emptyMessage}>No se encontraron usuarios.</p>
        )}
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
        fieldErrors={fieldErrors}
        formError={formError}
      />

      <ConfirmModal
        title="Eliminar usuario"
        isOpen={isConfirmOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteUser}
        isDanger={true}
        message={`¿Desea eliminar a "${userToDelete?.userName}"? Esta acción no se puede deshacer.`}
      />
    </section>
  );
}

export default UsersPage;
