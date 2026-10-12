import React from "react";
import styles from "./HamburgerButton.module.css";

function HamburgerButton({ toggleMenu, isMenuOpen }) {
  const menuClasses = `${styles.hamburgerMenu} ${isMenuOpen ? styles.active : ""}`;

  return (
    <button onClick={toggleMenu} className={styles.hamburgerButton}>
      <div className={menuClasses}>
        <div className={`${styles.bar} ${styles.barTop}`}></div>
        <div className={`${styles.bar} ${styles.barMid}`}></div>
        <div className={`${styles.bar} ${styles.barBottom}`}></div>
      </div>
    </button>
  );
}

export default HamburgerButton;
