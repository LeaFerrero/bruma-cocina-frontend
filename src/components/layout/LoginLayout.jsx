import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/header/Header";
import Footer from "./footer/Footer";
import styles from "./Layout.module.css";

function LoginLayout() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.mainContainer}>
        <Header showHamburger={false} />

        <main className={`${styles.contentNoPadding} ${styles.entryAnimation}`}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default LoginLayout;
