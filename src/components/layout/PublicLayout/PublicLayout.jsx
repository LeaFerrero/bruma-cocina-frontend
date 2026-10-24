import React, { useState } from "react";
import styles from "./PublicLayout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa"; // Importamos el icono

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

  // Cambiá este número por el real de Bruma Cocina (ej: 5491123456789)
  const whatsappNumber = "5491100000000";

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

      <a
        href={`https://wa.me/${whatsappNumber}`}
        className={styles.whatsappFloat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}

export default PublicLayout;
