import React from 'react';
import styles from './LikeDislike.module.css';

function LikeButton({ liked, onClick, count, likedIcon, notLikedIcon }) {
  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      <img
        src={liked ? likedIcon : notLikedIcon}
        alt="like-icon"
        className={styles.icon}
      />
      <span className={styles.count}>{count}</span>
    </div>
  );
}

export default LikeButton;
