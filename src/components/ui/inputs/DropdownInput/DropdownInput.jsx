import React from "react";
import styles from "./DropdownInput.module.css";

function DropdownInput({
  id,
  name,
  value,
  onChange,
  label,
  options,
  placeholder = "Seleccione una opción",
  error,
  additionalClass = "",
  ...props
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

export default DropdownInput;
