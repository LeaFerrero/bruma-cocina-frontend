import React, { useState } from "react";
import styles from "./PublicLayout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuLinks = [
    { path: "/", text: "Menú" },
    { path: "/nosotros", text: "Sobre Nosotros" },
  ];

  const currentLink = menuLinks.find((link) => link.path === location.pathname);

  const pageTitle = currentLink ? currentLink.text : "";

  return (
    <div className={styles.appContainer}>
      <Sidebar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        links={menuLinks}
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

export default PublicLayout;
