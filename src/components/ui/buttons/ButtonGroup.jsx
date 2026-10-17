import React from "react";
import styles from "./ButtonGroup.module.css";

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
