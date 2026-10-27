import React, { useState, useEffect } from "react";
import styles from "./LandingPage.module.css";
import { getMealImages } from "../../features/meals";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Card, Button, ImageCarousel } from "../../components/ui";

export function LandingPage() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMealImages = async () => {
      try {
        setIsLoading(true);
        const response = await getMealImages();
        setCarouselImages(response.data || []);
      } catch (error) {
        toast.error("Error al cargar las imágenes de portada");
      } finally {
        setIsLoading(false);
      }
    };

    loadMealImages();
  }, []);

  return (
    <div className={styles.landingContainer}>
      <section className={styles.heroSection}>
        {!isLoading && <ImageCarousel images={carouselImages} />}
      </section>

      <section className={styles.aboutSummarySection}>
        <Card title="La Experiencia Bruma" headingLevel="h2">
          <div className={styles.summaryContainer}>
            {/* 1. Extracto de la historia */}
            <p className={styles.heroText}>
              Nacidos en Palermo Hollywood, somos una Dark Kitchen de vanguardia
              que fusiona la alta cocina con tecnología de envasado al vacío.
              Llevamos la experiencia de restaurante a tu mesa en solo{" "}
              <strong>8 a 10 minutos</strong>.
            </p>

            {/* 2. Destacados rápidos con el componente Card */}
            <div className={styles.highlightsGrid}>
              <Card
                title="100% Sin TACC"
                headingLevel="h4"
                className={styles.highlightCard}
              >
                <p>Carta adaptada de forma segura para ser apta celíacos.</p>
              </Card>

              <Card
                title="Cocina al Vacío"
                headingLevel="h4"
                className={styles.highlightCard}
              >
                <p>
                  Preservamos sabores, texturas y calidad de autor sin
                  conservantes.
                </p>
              </Card>

              <Card
                title="Listo en Minutos"
                headingLevel="h4"
                className={styles.highlightCard}
              >
                <p>Pensado para simplificar tu rutina comiendo rico y sano.</p>
              </Card>
            </div>

            {/* 3. Call To Actions: Menú y Sobre Nosotros */}
            <div className={styles.ctaContainer}>
              <Link to="/menu" className={styles.menuButtonLink}>
                <Button text="Ver Menú" />
              </Link>
              <Link to="/nosotros" className={styles.aboutLink}>
                Conocé más sobre nuestra historia y valores →
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default LandingPage;
