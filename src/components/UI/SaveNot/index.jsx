import React, { useState } from 'react';
import styles from './styles.module.css';
import { likeSet, unlikeSet } from 'api/apiLike';
import { likeFolder, unlikeFolder } from 'api/apiLike';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const SaveNot = ({ state, type, id }) => {
  const [isSaved, setIsSaved] = useState(state);
  const { t } = useTranslation();

  const likeSetHandler = async (id) => {
    try {
      const result = await likeSet(id);
      console.log(`Set with id ${id} liked`);
      if (result.message && result.message.includes('successfully')) {
        toast.success(t('Liked!'));
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
      console.log(`Set with id ${id} unliked`);
      if (result.message && result.message.includes('successfully')) {
        toast.success(t('Unliked!'));
      } else {
        toast.error(t('Failed to unlike set'));
      }
    } catch (error) {
      console.error(`Error unliking set with id ${id}:`, error);
      toast.error(t('Error unliking'));
    }
  };

  const likeFolderHandler = async (id) => {
    try {
      const result = await likeFolder(id);
      console.log(`Folder with id ${id} liked`);
      if (result.message && result.message.includes('successfully')) {
        toast.success(t('Liked!'));
      } else {
        toast.error(t('Failed to like folder'));
      }
    } catch (error) {
      console.error(`Error liking folder with id ${id}:`, error);
      toast.error(t('Error liking'));
    }
  };

  const unlikeFolderHandler = async (id) => {
    try {
      const result = await unlikeFolder(id);
      console.log(`Folder with id ${id} unliked`);
      if (result.message && result.message.includes('successfully')) {
        toast.success(t('Unliked!'));
      } else {
        toast.error(t('Failed to unlike folder'));
      }
    } catch (error) {
      console.error(`Error unliking folder with id ${id}:`, error);
      toast.error(t('Error unliking'));
    }
  };

  const handleToggleSave = () => {
    if (isSaved) {
      // Видаляємо лайк
      if (type === 'resource') {
        //unlikeResource(id);
      } else if (type === 'folder') {
        unlikeFolderHandler(id);
      } else if (type === 'set') {
        unlikeSetHandler(id);
      }
    } else {
      // Додаємо лайк
      if (type === 'resource') {
        //likeResource(id);
      } else if (type === 'folder') {
        likeFolderHandler(id);
      } else if (type === 'set') {
        likeSetHandler(id);
      }
    }
    setIsSaved((prev) => !prev);
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
