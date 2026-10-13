import React, { useState } from "react";
import usersData from "../data/usersData";
import UserCard from "../components/users/UserCard";
import BasicButton from "../components/ui/buttons/BasicButton";
import ManageUserModal from "../components/users/ManageUserModal";
import styles from "./UsersPage.module.css";
import AutocompleteInput from "../components/ui/inputs/AutocompleteInput";

function UsersPage() {
  const [users, setUsers] = useState(usersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSaveUser = (formData, id) => {
    if (id) {
      setUsers(users.map((u) => (u.id === id ? { ...u, ...formData } : u)));
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
      };
      setUsers([...users, newUser]);
    }
  };

  const deleteUser = (user) => {
    setUsers(users.filter((u) => u.id !== user.id));
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
            key={user.id}
            user={user}
            onEdit={() => handleOpenEditModal(user)}
            onDelete={() => deleteUser(user)}
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
