import React, { useState } from 'react';
import filledHeart from './property-1-saved.svg'; // Шлях до заповненого серця
import outlinedHeart from './property-1-not-saved.svg'; // Шлях до контурного серця
import styles from './SaveNot.module.css'; // Імпорт стилів з CSS модуля

export const SaveNot = ({
  state,
  type,
  id,
  handleLikeFolder,
  handleUnlikeSet,
}) => {
  const [isSaved, setIsSaved] = useState(state); // Стан для збереження

  // Функції для додавання та видалення лайку
  const likeResource = (id) => console.log(`Liked resource with id ${id}`);
  const unlikeResource = (id) => console.log(`Unliked resource with id ${id}`);

  const likeFolder = (id) => console.log(`Liked folder with id ${id}`);
  const unlikeFolder = (id) => console.log(`Unliked folder with id ${id}`);

  const likeSet = (id) => console.log(`Liked set with id ${id}`);
  const unlikeSet = (id) => console.log(`Unliked set with id ${id}`);

  // Функція обробки лайку/дизлайку
  const handleToggleSave = () => {
    if (isSaved) {
      // Якщо елемент вже збережено, видаляємо лайк
      if (type === 'resource') {
        unlikeResource(id);
      } else if (type === 'folder') {
        unlikeFolder(id);
        handleLikeFolder && handleLikeFolder(id);
      } else if (type === 'set') {
        unlikeSet(id);
        handleUnlikeSet && handleUnlikeSet(id);
      }
    } else {
      // Якщо елемент ще не збережено, додаємо лайк
      if (type === 'resource') {
        likeResource(id);
      } else if (type === 'folder') {
        likeFolder(id);
      } else if (type === 'set') {
        likeSet(id);
      }
    }
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
