import React from "react";
import styles from "./BasicInput.module.css";

function BasicInput({
  id,
  label,
  type = "text",
  variant = "primary",
  additionalClass = "",
  ...props
}) {
  const variantClass = styles[variant] || "";

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
        className={`${styles.basicInput} ${variantClass} ${additionalClass}`.trim()}
        {...props}
      />
    </div>
  );
}

export default BasicInput;