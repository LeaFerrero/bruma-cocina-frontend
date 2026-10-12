import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <div className={styles.appContainer}>
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className={styles.mainContainer}>
        <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

        <main
          key={location.pathname}
          className={`
            ${isLoginPage ? styles.contentNoPadding : styles.contentContainer}
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

export default Layout;
