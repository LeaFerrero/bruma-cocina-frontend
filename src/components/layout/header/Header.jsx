import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import HamburgerButton from "../../ui/buttons/HamburgerButton";

function Header({ toggleMenu, isMenuOpen, showHamburger = true }) {
  const location = useLocation();

  const routeNames = {
    "/gestion/usuarios": "Usuarios",
    "/gestion/login": "Login",
  };

  const sectionName = routeNames[location.pathname];

  return (
    <div className={styles.header}>
      {showHamburger && (
        <HamburgerButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      )}

      <div className={styles.titles}>
        <h1>Bruma Cocina</h1>

        <div className={styles.sectionGroup}>
          {sectionName && (
            <>
              <span className={styles.separator}>|</span>
              <span className={styles.routeSubtitle}>{sectionName}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
