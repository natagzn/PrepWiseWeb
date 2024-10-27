import React from 'react';
import styles from './PeopleComponent.module.css';

const PeopleComponent = ({ username, text }) => {
  return (
    <div className={styles.peopleContainer}>
      <div className={styles.userInfo}>
        <img
          className={styles.avatar}
          src="https://via.placeholder.com/47x47"
          alt="User Avatar"
        />
        <div className={styles.username}>{username}</div>
      </div>
      <div className={styles.followButton}>
        <div className={styles.followText}>{text}</div>
      </div>
    </div>
  );
};

export default PeopleComponent;
