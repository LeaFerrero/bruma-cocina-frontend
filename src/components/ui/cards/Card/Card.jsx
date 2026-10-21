import React from "react";
import styles from "./Card.module.css";

const Card = ({
  title,
  headingLevel = "h3",
  variant = "default",
  children,
  interactive = false,
}) => {
  const cardClasses = [
    styles.cardContainer,
    styles[variant],
    interactive ? styles.interactive : "",
  ]
    .filter(Boolean)
    .join(" ");

  const TitleTag = headingLevel;

  return (
    <article className={cardClasses}>
      <div>
        {title && <TitleTag className={styles.title}>{title}</TitleTag>}
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </article>
  );
};

export default Card;
