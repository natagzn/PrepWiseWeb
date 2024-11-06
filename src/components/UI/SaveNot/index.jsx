import React, { useState } from 'react';
import styles from './styles.module.css';
import { likeSet, unlikeSet } from 'api/apiLike';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const SaveNot = ({ state, type, id }) => {
  const [isSaved, setIsSaved] = useState(state);
  const { t } = useTranslation();
  // Функції для додавання та видалення лайку
  const likeResource = (id) => console.log(`Liked resource with id ${id}`);
  const unlikeResource = (id) => console.log(`Unliked resource with id ${id}`);

  const likeFolder = (id) => console.log(`Liked folder with id ${id}`);
  const unlikeFolder = (id) => console.log(`Unliked folder with id ${id}`);

  const likeSetHandler = async (id) => {
    try {
      const result = await likeSet(id);

      // Виведення id в консоль
      console.log(`Set with id ${id} liked`);

      // Якщо результат містить певне повідомлення про успіх
      if (result.message && result.message.includes('successfully')) {
        toast.success(t('Liked!')); // Лаконічне повідомлення
      } else {
        toast.error(t('Failed to like set'));
      }
    } catch (error) {
      console.error(`Error liking set with id ${id}:`, error);
      toast.error(t('Error liking'));
    }
  };

  const unlikeSetHandler = async (id) => {
    try {
      const result = await unlikeSet(id);

      // Виведення id в консоль
      console.log(`Set with id ${id} unliked`);

      // Якщо результат містить певне повідомлення про успіх
      if (result.message && result.message.includes('successfully')) {
        toast.success(t('Unliked!')); // Лаконічне повідомлення
      } else {
        toast.error(t('Failed to unlike set'));
      }
    } catch (error) {
      console.error(`Error unliking set with id ${id}:`, error);
      toast.error(t('Error unliking'));
    }
  };

  // Функція обробки лайку/дизлайку
  const handleToggleSave = () => {
    if (isSaved) {
      // Якщо елемент вже збережено, видаляємо лайк
      if (type === 'resource') {
        unlikeResource(id);
      } else if (type === 'folder') {
        unlikeFolder(id);
      } else if (type === 'set') {
        unlikeSetHandler(id);
      }
    } else {
      // Якщо елемент ще не збережено, додаємо лайк
      if (type === 'resource') {
        likeResource(id);
      } else if (type === 'folder') {
        likeFolder(id);
      } else if (type === 'set') {
        likeSetHandler(id);
      }
    }
    setIsSaved((prev) => !prev); // Перемикає стан збереження
  };

  return (
    <div className={styles['save-not']} onClick={handleToggleSave}>
      <img
        src={
          isSaved
            ? '/icons/SaveNot/property-1-saved.svg'
            : '/icons/SaveNot/property-1-not-saved.svg'
        }
        alt="Save"
        className={styles['heart-icon']}
      />
    </div>
  );
};
