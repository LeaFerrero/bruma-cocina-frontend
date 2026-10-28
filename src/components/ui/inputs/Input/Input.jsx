import React from "react";
import styles from "./Input.module.css";

function Input({
  id,
  label,
  type = "text",
  additionalClass = "",
  error,
  ...props
}) {
  const errorClass = error ? styles.inputError : "";
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`${styles.input} ${errorClass} ${additionalClass}`.trim()}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <span id={errorId} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
