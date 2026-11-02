import React, { useState, useEffect } from "react";
import styles from "./ImageCarousel.module.css";
import { BACKEND_URL } from "../../../../config/env";

function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  const currentItem = images[currentIndex];

  const imageUrl = currentItem?.image
    ? `${BACKEND_URL}/uploads/${currentItem.image}`
    : "";

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselSlide}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={styles.carouselOverlay}>
          <h3>{currentItem.title || "Bruma Cocina"}</h3>
          <p>Alta cocina de autor al vacío • 100% Sin TACC</p>
        </div>
      </div>

      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
