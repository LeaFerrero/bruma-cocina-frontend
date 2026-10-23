import React from "react";
import { FaFire, FaClock, FaSeedling, FaRocket } from "react-icons/fa";
import styles from "./AboutUsPage.module.css";
import { Card } from "../../components/ui";

function SobreNosotros() {
  return (
    <section className={styles.aboutUsSection}>
      <Card title="Nuestra Esencia" headingLevel="h2">
        <div className={styles.aboutUsContainer}>
          <div className={styles.heroSection}>
            <p className={styles.heroText}>
              En <strong>Bruma Cocina</strong> transformamos el concepto del
              delivery en una experiencia de restaurante de autor desde la
              comodidad de tu hogar u oficina.
            </p>
          </div>

          <section className={styles.storySection}>
            <h3 className={styles.subtitle}>
              De Palermo al futuro del Delivery
            </h3>
            <p>
              Nacidos en Palermo Hollywood, evolucionamos de un servicio por
              encargo a una Dark Kitchen de vanguardia. Fusionamos la alta
              cocina con tecnología de envasado al vacío para que disfrutes
              platos gourmet impecables, listos en solo{" "}
              <strong>8 a 10 minutos</strong>.
            </p>
          </section>

          <section className={styles.missionVisionGrid}>
            <article className={styles.infoBlock}>
              <h3 className={styles.blockTitle}>Nuestra Misión</h3>
              <div className={styles.blockContent}>
                <p>
                  Simplificarte la rutina con platos sabrosos, prácticos y
                  equilibrados. Buscamos que comer rico siempre sea tu mejor
                  pausa del día.
                </p>
              </div>
            </article>

            <article className={styles.infoBlock}>
              <h3 className={styles.blockTitle}>Nuestra Visión</h3>
              <div className={styles.blockContent}>
                <p>
                  Liderar el concepto de gastronomía nativa digital en CABA,
                  siendo la opción predilecta por nuestra calidad y constante
                  innovación.
                </p>
              </div>
            </article>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.subtitle}>Nuestros Valores</h2>
            <div className={styles.valuesGrid}>
              <article className={styles.infoBlock}>
                <h4 className={styles.blockTitle}>Ingredientes Frescos</h4>
                <div className={styles.blockContent}>
                  <p>
                    Nos mueve la pasión por la materia prima de primera calidad
                    y el respeto por el producto.
                  </p>
                </div>
              </article>

              <article className={styles.infoBlock}>
                <h4 className={styles.blockTitle}>Empatía con tu día</h4>
                <div className={styles.blockContent}>
                  <p>
                    Entendemos tu rutina. Creamos soluciones para que no pierdas
                    tiempo sin resignar sabor.
                  </p>
                </div>
              </article>

              <article className={styles.infoBlock}>
                <h4 className={styles.blockTitle}>Compromiso Inclusivo</h4>
                <div className={styles.blockContent}>
                  <p>
                    Casi toda nuestra carta está adaptada de forma segura para
                    ser <strong>100% Sin TACC</strong>. Disfrutar de la alta
                    cocina debe ser para todos.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </Card>
    </section>
  );
}

export default SobreNosotros;
