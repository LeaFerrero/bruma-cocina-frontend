import React from "react";
import { Link } from "react-router-dom";
import styles from "./AboutUsPage.module.css";
import { Card, Button } from "../../components/ui";

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

          <section className={styles.missionVisionSection}>
            <h3 className={styles.subtitle}>Propósito y Propuesta</h3>
            <p className={styles.sectionDescription}>
              Lo que nos motiva día a día y hacia dónde proyectamos nuestro
              modelo de gastronomía digital.
            </p>

            <div className={styles.missionVisionGrid}>
              <Card
                title="Nuestra Misión"
                headingLevel="h4"
                className={styles.highlightCard}
              >
                <div className={styles.blockContent}>
                  <p>
                    Simplificarte la rutina con platos sabrosos, prácticos y
                    equilibrados. Buscamos que comer rico siempre sea tu mejor
                    pausa del día.
                  </p>
                </div>
              </Card>

              <Card
                title="Nuestra Visión"
                headingLevel="h4"
                className={styles.highlightCard}
              >
                <div className={styles.blockContent}>
                  <p>
                    Liderar el concepto de gastronomía nativa digital en CABA,
                    siendo la opción predilecta por nuestra calidad y constante
                    innovación.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          <section className={styles.valuesSection}>
            <h3 className={styles.subtitle}>Nuestros Valores</h3>
            <p className={styles.sectionDescription}>
              Los pilares fundamentales sobre los que preparamos cada una de
              nuestras recetas.
            </p>

            <div className={styles.valuesGrid}>
              <Card
                title="Ingredientes Frescos"
                headingLevel="h4"
                className={styles.highlightCard}
              >
                <div className={styles.blockContent}>
                  <p>
                    Nos mueve la pasión por la materia prima de primera calidad
                    y el respeto por el producto.
                  </p>
                </div>
              </Card>

              <Card
                title="Empatía con tu día"
                headingLevel="h4"
                className={styles.highlightCard}
              >
                <div className={styles.blockContent}>
                  <p>
                    Entendemos tu rutina. Creamos soluciones para que no pierdas
                    tiempo sin resignar sabor.
                  </p>
                </div>
              </Card>

              <Card
                title="Compromiso Inclusivo"
                headingLevel="h4"
                className={styles.highlightCard}
              >
                <div className={styles.blockContent}>
                  <p>
                    Casi toda nuestra carta está adaptada de forma segura para
                    ser <strong>100% Sin TACC</strong>. Disfrutar de la alta
                    cocina debe ser para todos.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          <div className={styles.ctaContainer}>
            <Link to="/menu" className={styles.menuButtonLink}>
              <Button text="Ver Menú" />
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default SobreNosotros;
