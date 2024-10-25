import React from 'react';
import styles from './FolderComponent.module.css'; // Імпорт стилів
import { SaveNot } from '../SaveNot/SaveNot';

export const FolderComponent = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}></div>
          <div className={styles.folderName}>{props.folderName}</div>
        </div>
        {typeof props.isLiked !== 'undefined' && (
          <div className={styles.likeIcon}>
            <SaveNot state={props.isLiked} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.items}>{props.itemsCount} items</div>
        <div className={styles.date}>{props.date}</div>
      </div>
    </div>
  );
};
