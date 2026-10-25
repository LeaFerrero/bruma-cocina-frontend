import React, { useState } from "react";
import styles from "./ManagementLayout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context";
import { ROLES } from "../../../features/users";

function ManagementLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuLinks = [
    {
      path: "/gestion/cocina",
      text: "Cocina",
      roles: [ROLES.ADMIN, ROLES.COCINA],
    },
    {
      path: "/gestion/produccion",
      text: "Produccion",
      roles: [ROLES.ADMIN, ROLES.COCINA],
    },
    { path: "/gestion/caja", text: "Caja", roles: [ROLES.ADMIN, ROLES.CAJA] },
    {
      path: "/gestion/viandas",
      text: "Viandas",
      roles: [ROLES.ADMIN, ROLES.STOCK],
    },
    {
      path: "/gestion/insumos",
      text: "Insumos",
      roles: [ROLES.ADMIN, ROLES.STOCK],
    },
    { path: "/gestion/usuarios", text: "Usuarios", roles: [ROLES.ADMIN] },
  ];

  const authorizedLinks = menuLinks.filter((link) => {
    if (!link.roles) return true;
    return user && link.roles.includes(user.role);
  });

  const currentLink = authorizedLinks.find(
    (link) => link.path === location.pathname,
  );
  const pageTitle = currentLink ? currentLink.text : "";

  return (
    <div className={styles.appContainer}>
      <Sidebar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        links={authorizedLinks}
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
