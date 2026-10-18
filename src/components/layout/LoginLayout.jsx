import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Sidebar from "./sidebar/Sidebar";
import Header from "../layout/header/Header";
import Footer from "./footer/Footer";

function LoginLayout() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header showHamburger={false} title="Login" />

        <main className={`${styles.contentNoPadding} ${styles.entryAnimation}`}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default LoginLayout;
