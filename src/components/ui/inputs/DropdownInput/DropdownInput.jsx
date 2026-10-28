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
  const errorId = error ? `${id}-error` : undefined;

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
        aria-invalid={error ? "true" : "false"}
        aria-describedby={errorId}
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

      {error && (
        <span id={errorId} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}

export default DropdownInput;
