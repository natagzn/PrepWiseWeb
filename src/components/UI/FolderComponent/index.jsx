// FolderComponent.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { SaveNot } from '../SaveNot';
import { useTranslation } from 'react-i18next';

export const FolderComponent = (props) => {
  const { folderName, itemsCount, date, isLiked, id } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    // Перевіряємо, чи елемент не є likeIcon перед навігацією
    if (!event.target.closest(`.${styles.likeIcon}`)) {
      navigate(`/lookFolder/${id}`);
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}></div>
          <div className={styles.folderName}>{folderName}</div>
        </div>
        {typeof isLiked !== 'undefined' && (
          <div className={styles.likeIcon}>
            <SaveNot state={isLiked} type="folder" id={id} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.items}>
          {itemsCount} {t('sets')}
        </div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
};
