import React from "react";
import styles from "./BasicTextarea.module.css";

function BasicTextarea({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  maxLength = 250,
  rows = 4,
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
        className={styles.basicTextarea}
      />
    </div>
  );
}

export default BasicTextarea;
