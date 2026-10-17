import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

function ManagementLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuLinks = [
    { path: "/gestion/insumos", text: "Insumos" },
    { path: "/gestion/usuarios", text: "Usuarios" },
  ];

  return (
    <div className={styles.appContainer}>
      <Sidebar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        links={menuLinks}
        showUser={true}
      />
      <div className={styles.mainContainer}>
        <Header
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          showHamburger={true}
        />

        <main
          key={location.pathname}
          className={`
            ${styles.contentContainer}
            ${styles.entryAnimation}
          `}
        >
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default ManagementLayout;
