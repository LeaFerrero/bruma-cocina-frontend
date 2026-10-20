import React from "react";
import styles from "./TextArea.module.css";

function TextArea({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  maxLength = 250,
  rows = 4,
  error,
}) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={rows}
        className={`${styles.basicTextarea} ${error ? styles.errorInput : ""}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default TextArea;
