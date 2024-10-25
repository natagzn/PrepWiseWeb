import React from 'react';
import styles from './LikeDislike.module.css';

function DislikeButton({
  disliked,
  onClick,
  count,
  dislikedIcon,
  notDislikedIcon,
}) {
  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      <img
        src={disliked ? dislikedIcon : notDislikedIcon}
        alt="dislike-icon"
        className={styles.icon}
      />
      <span className={styles.count}>{count}</span>
    </div>
  );
}

export default DislikeButton;
