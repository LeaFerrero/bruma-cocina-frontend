import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { logout } from "../../../features/auth";
import { NavItem } from "../../ui";
import { ROLE_NAMES } from "../../../features/users";
import logo from "../../../assets/img/logo-mark.webp";

function Sidebar({ isMenuOpen, toggleMenu, links = [], showUser = false }) {
  const sidebarClasses = `${styles.sidebar} ${isMenuOpen ? styles.active : ""}`;
  const { user, logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      logoutContext();
      navigate("/gestion/login", { replace: true });
    }
  };

  return (
    <div className={sidebarClasses}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo Bruma Cocina" className={styles.logo} />
      </div>

      <ul className={styles.navMenu}>
        {links.map((link) => (
          <li key={link.path}>
            <NavItem to={link.path} text={link.text} onClick={toggleMenu} />
          </li>
        ))}
      </ul>

      {showUser && (
        <div className={styles.userSection}>
          <span className={styles.userName}>
            <strong>Usuario:</strong> {user.userName}
          </span>
          <span className={styles.userName}>
            <strong>Rol:</strong> {ROLE_NAMES[user.role]}
          </span>
          <span className={styles.logoutLink} onClick={handleLogout}>
            Cerrar sesión
          </span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
