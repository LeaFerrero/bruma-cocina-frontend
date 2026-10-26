import React from "react";
import styles from "./DateInput.module.css";

function DateInput({ id = "date-filter", label = "Fecha", value, onChange }) {
  return (
    <div className={styles.dateContainer}>
      <label htmlFor={id} className={styles.dateLabel}>
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={onChange}
        className={styles.dateInput}
      />
    </div>
  );
}

export default DateInput;
