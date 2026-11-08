import React from "react";
import styles from "./Button.module.css";

function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  isSquare = false,
  additionalClass = "",
  disabled = false,
  form,
  ariaLabel,
}) {
  const variantClass = styles[variant] || "";
  const squareClass = isSquare ? styles.square : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      form={form}
      aria-label={ariaLabel}
      className={`${styles.basicButton} ${variantClass} ${squareClass} ${additionalClass}`.trim()}
    >
      {text}
    </button>
  );
}

export default Button;
