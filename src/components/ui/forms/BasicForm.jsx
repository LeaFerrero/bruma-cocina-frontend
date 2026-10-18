import React from "react";
import styles from "./BasicForm.module.css";

function BasicForm({ title, onSubmit, error, children }) {
  return (
    <form className={styles.formBase} onSubmit={onSubmit}>
      {title && <h3 className={styles.title}>{title}</h3>}

      {error && <div className={styles.formError}>{error}</div>}

      <div className={styles.content}>{children}</div>
    </form>
  );
}

export default BasicForm;
