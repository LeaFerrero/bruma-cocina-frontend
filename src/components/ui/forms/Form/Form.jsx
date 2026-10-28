import React from "react";
import styles from "./Form.module.css";

function Form({ id, title, onSubmit, error, children }) {
  return (
    <form id={id} className={styles.formBase} onSubmit={onSubmit} noValidate>
      {title && <h3 className={styles.title}>{title}</h3>}

      {error && (
        <div className={styles.formError} role="alert">
          {error}
        </div>
      )}

      <div className={styles.formChildren}>{children}</div>
    </form>
  );
}

export default Form;
