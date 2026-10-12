import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../../assets/img/logo-mark.webp";

function Sidebar({ isMenuOpen, toggleMenu }) {
  const sidebarClasses = `${styles.sidebar} ${isMenuOpen ? styles.active : ""}`;

  return (
    <div className={sidebarClasses}>
      <img src={logo} alt="Logo Bruma Cocina" className={styles.logo} />
      <ul>
        ´<p>Usuarios</p>
      </ul>
    </div>
  );
}

export default Sidebar;
