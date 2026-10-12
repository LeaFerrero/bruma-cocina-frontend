import React from "react";
import styles from "./BasicForm.module.css";

function BasicForm({ title, onSubmit, children }) {
  return (
    <form className={styles.formBase} onSubmit={onSubmit}>
      {title && <h3 className={styles.title}>{title}</h3>}

      {/* Acá adentro van a vivir los inputs y botones de cada formulario específico */}
      <div className={styles.content}>{children}</div>
    </form>
  );
}

export default BasicForm;
