import React from "react";
import styles from "./ButtonGroup.module.css";

/**
 * Agrupa y alinea botones manteniendo el espaciado estándar del sistema de diseño.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos a renderizar.
 * @param {'column' | 'row'} [props.layout='column'] - Dirección del flujo.
 * @param {string} [props.additionalClass=''] - Clases CSS extra.
 * @returns {JSX.Element}
 */
function ButtonGroup({ children, layout = "column", additionalClass = "" }) {
  return (
    <div
      className={`${styles.buttonsContainer} ${styles[layout]} ${additionalClass}`.trim()}
    >
      {children}
    </div>
  );
}

export default ButtonGroup;
