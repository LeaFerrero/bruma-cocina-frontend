import React from "react";
import styles from "./EditableList.module.css";

function EditableList({ title, isEmpty, emptyMessage, children }) {
  return (
    <div className={styles.editableListContainer}>
      <h4 className={styles.listTitle}>{title}</h4>
      <ul className={styles.itemsList}>
        {isEmpty ? (
          <li className={styles.emptyItemRow}>
            <span>{emptyMessage}</span>
          </li>
        ) : (
          children
        )}
      </ul>
    </div>
  );
}

export default EditableList;
