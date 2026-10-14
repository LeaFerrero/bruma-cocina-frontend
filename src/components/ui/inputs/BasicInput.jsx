import React from "react";
import styles from "./BasicInput.module.css";

function BasicInput({
  id,
  label,
  type = "text",
  additionalClass = "",
  error,
  ...props
}) {
  const errorClass = error ? styles.inputError : "";

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`${styles.basicInput} ${errorClass} ${additionalClass}`.trim()}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default BasicInput;
