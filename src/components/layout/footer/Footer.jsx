import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandColumn}>
          <h4 className={styles.brandName}>Bruma Cocina</h4>
          <p className={styles.brandDescription}>
            Dark Kitchen - Gastronomía de Autor. Llevamos la mejor experiencia
            culinaria directo a la puerta de tu casa.
          </p>
        </div>

        <div className={styles.linksColumn}>
          <h5 className={styles.columnTitle}>Explorar</h5>
          <ul className={styles.linkList}>
            <li>
              <Link to="/">Inicio</Link>{" "}
            </li>
            <li>
              <Link to="/menu">Menú</Link>
            </li>
            <li>
              <Link to="/nosotros">Sobre Nosotros</Link>
            </li>
          </ul>
        </div>

        <div className={styles.socialColumn}>
          <h5 className={styles.columnTitle}>Contacto</h5>
          <p className={styles.contactInfo}>Buenos Aires, Argentina</p>
          <div className={styles.socialLinks}>
            <a
              href="https://www.instagram.com/bruma.cocina_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@bruma_cocina"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok size={20} />
            </a>
            <a
              href="mailto:contacto@brumacocina.com"
              aria-label="Enviar correo"
              className={styles.socialIcon}
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
