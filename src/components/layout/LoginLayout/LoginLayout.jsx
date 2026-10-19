import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./LoginLayout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
