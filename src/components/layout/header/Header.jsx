import React from "react";
import styles from "./Header.module.css";
import { HamburgerButton } from "../../ui";

function Header({ toggleMenu, isMenuOpen, showHamburger = true, title }) {
  return (
    <div className={styles.header}>
      {showHamburger && (
        <HamburgerButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      )}

      <div className={styles.titles}>
        <h1>Bruma Cocina</h1>

        <div className={styles.sectionGroup}>
          {title && (
            <>
              <span className={styles.separator}>|</span>
              <span className={styles.routeSubtitle}>{title}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
