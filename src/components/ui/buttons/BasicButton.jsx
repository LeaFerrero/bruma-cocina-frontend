// BasicButton.jsx
import React from "react";
import styles from "./BasicButton.module.css";

/**
 * @param {Object} props
 * @param {"primary" | "secondary" | "cancel" | "danger"} [props.variant="primary"] - Define el color del botón.
 * @param {boolean} [props.isSquare=false] - Si es true, anula el padding y lo hace un cuadrado perfecto de 2.5rem.
 */
function BasicButton({
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

export default BasicButton;
