import React, { useState } from "react";
import BasicInput from "./BasicInput";
import styles from "./AutocompleteInput.module.css";

function AutocompleteInput({ options, value, onChange, placeholder, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <BasicInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
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
