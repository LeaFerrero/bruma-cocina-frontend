import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} from "../api/userApi";
import UserCard from "../users/UserCard";
import BasicButton from "../components/ui/buttons/BasicButton";
import ManageUserModal from "../users/ManageUserModal";
import styles from "./UsersPage.module.css";
import AutocompleteInput from "../components/ui/inputs/AutocompleteInput";
import ConfirmModal from "../components/ui/modals/ConfirmModal";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [userToDelete, setUserToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        if (error.backendData && error.backendData.message) {
          toast.error(error.backendData.message);
        } else {
          toast.error(`Ocurrio un error ${error.message}`);
        }
      }
    };
    loadUsers();
  }, []);

  const handleOpenCreateModal = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleOpenEditModal = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
    setFormErrors({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConfirmOpen(false);
    setUserToEdit(null);
    setUserToDelete(null);
    setFormErrors({});
  };

  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setIsConfirmOpen(true);
  };

  const handleSaveUser = async (formData, id) => {
    try {
      setFormErrors({});
      if (id) {
        await editUser(id, formData);
      } else {
        const newUser = { ...formData };
        await createUser(newUser);
      }
      toast.success(
        id ? "Usuario actualizado" : "Usuario creado correctamente",
      );
      const users = await getUsers();
      setUsers(users);
      handleCloseModal();
    } catch (error) {
      if (error.backendData && error.backendData.message) {
        setFormErrors(error.backendData.message);
      } else {
        toast.error(`Ocurrio un error ${error.message}`);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete._id);
      const users = await getUsers();
      setUsers(users);
      toast.success("Usuario eliminado correctamente");
      handleCloseModal();
    } catch (error) {
      if (error.backendData && error.backendData.message) {
        toast.error(error.backendData.message);
      } else {
        toast.error(`Ocurrio un error ${error.message}`);
      }
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
          <BasicButton
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
        {filteredUsers.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onEdit={() => handleOpenEditModal(user)}
            onDelete={() => handleOpenDeleteModal(user)}
          />
        ))}
      </div>

      <ManageUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
        errors={formErrors}
      />

      <ConfirmModal
        title="Eliminar usuario"
        isOpen={isConfirmOpen}
        onClose={() => handleCloseModal()}
        onConfirm={handleDeleteUser}
        isDanger={true}
        message={`¿Estás seguro de que querés eliminar a "${userToDelete?.userName}"? Esta acción no se puede deshacer.`}
      />
    </section>
  );
}

export default UsersPage;
