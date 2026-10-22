import React, { useState } from "react";
import styles from "./ManagementLayout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

function ManagementLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuLinks = [
    { path: "/gestion/cocina", text: "Cocina" },
    { path: "/gestion/produccion", text: "Produccion" },
    { path: "/gestion/caja", text: "Caja" },
    { path: "/gestion/viandas", text: "Viandas" },
    { path: "/gestion/insumos", text: "Insumos" },
    { path: "/gestion/usuarios", text: "Usuarios" },
  ];

  const currentLink = menuLinks.find((link) => link.path === location.pathname);

  const pageTitle = currentLink ? currentLink.text : "";

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
          title={pageTitle}
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
