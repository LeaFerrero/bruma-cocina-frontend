import React from "react";
import styles from "./FormActions.module.css";

function FormActions({ children }) {
  return (
    <div className={styles.actionsContainer}>
      {children}
    </div>
  );
}

export default FormActions;