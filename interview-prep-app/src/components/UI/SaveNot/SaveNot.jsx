import React, { useState } from 'react';
import filledHeart from './property-1-saved.svg'; // Шлях до заповненого серця
import outlinedHeart from './property-1-not-saved.svg'; // Шлях до контурного серця
import styles from './SaveNot.module.css'; // Імпорт стилів з CSS модуля

export const SaveNot = ({ state }) => {
  const [isSaved, setIsSaved] = useState(state); // Стан для збереження

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev); // Перемикає стан збереження
  };

  return (
    <div className={styles['save-not']} onClick={handleToggleSave}>
      <img
        src={isSaved ? filledHeart : outlinedHeart} // Вибір зображення на основі стану
        alt="Save"
        className={styles['heart-icon']} // Додано клас для стилізації
      />
    </div>
  );
};
