import React, { useEffect, useState } from "react";
import {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} from "../api/userApi";
import UserCard from "../components/users/UserCard";
import BasicButton from "../components/ui/buttons/BasicButton";
import ManageUserModal from "../components/users/ManageUserModal";
import styles from "./UsersPage.module.css";
import AutocompleteInput from "../components/ui/inputs/AutocompleteInput";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        alert("Error al cargar los usuarios: " + error.message);
      }
    };
    loadUsers();
  }, []);

  const handleOpenCreateModal = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  const handleSaveUser = async (formData, id) => {
    try {
      if (id) {
        await editUser(id, formData);
      } else {
        const newUser = { ...formData };
        await createUser(newUser);
      }
      const users = await getUsers();
      setUsers(users);
      handleCloseModal();
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      alert("Error al eliiminar: " + error.message);
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
            onDelete={() => handleDeleteUser(user._id)}
          />
        ))}
      </div>

      <ManageUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
      />
    </section>
  );
}

export default UsersPage;
