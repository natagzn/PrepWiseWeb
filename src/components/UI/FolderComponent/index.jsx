// FolderComponent.js

import React from 'react';
import styles from './styles.module.css';
import { SaveNot } from '../SaveNot';

export const FolderComponent = (props) => {
  const { folderName, itemsCount, date, isLiked, handleLikeFolder } = props;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}></div>
          <div className={styles.folderName}>{folderName}</div>
        </div>
        {typeof isLiked !== 'undefined' && (
          <div className={styles.likeIcon}>
            <SaveNot
              state={isLiked}
              type="folder"
              id={props.id}
              handleLikeFolder={handleLikeFolder ? handleLikeFolder : undefined}
            />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.items}>{itemsCount} items</div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
};
