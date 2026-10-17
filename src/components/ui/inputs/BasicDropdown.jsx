import React from "react";
import styles from "./BasicInput.module.css";

function BasicDropdown({
  id,
  name,
  value,
  onChange,
  label,
  options,
  placeholder = "Seleccione una opción",
  error,
  additionalClass = "",
  ...props // Atrapa otras cosas como 'disabled' o 'required'
}) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.basicInput} ${error ? styles.inputError : ""} ${additionalClass}`.trim()}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default BasicDropdown;
