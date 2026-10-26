import React, { useState } from "react";
import styles from "./ImageInput.module.css";

export function ImageInput({ label, onChange, error, value }) {
  const [preview, setPreview] = useState(value || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange(file);
    }
  };

  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.dropzone}>
        {preview ? (
          <img
            src={preview}
            alt="Vista previa"
            className={styles.previewImage}
          />
        ) : (
          <span className={styles.placeholder}>Sin imagen seleccionada</span>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default ImageInput;
