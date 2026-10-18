import React, { useState } from "react";
import styles from "./AutocompleteInput.module.css";
import BasicInput from "./BasicInput";

function AutocompleteInput({
  options,
  value,
  onChange,
  placeholder,
  label,
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className={styles.container}>
      <BasicInput
        label={label}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        error={error}
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul className={styles.dropdownList}>
          {filteredOptions.map((option) => (
            <li
              key={option}
              className={styles.dropdownItem}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteInput;
