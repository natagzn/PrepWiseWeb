import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const PeopleComponent = ({ username, text, avatar, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profileUser/${id}`);
  };

  return (
    <div className={styles.peopleContainer} onClick={handleClick}>
      <div className={styles.userInfo}>
        <div
          className={styles.avatar}
          style={{ backgroundColor: avatar.backgroundColor }}
        >
          {avatar.initials}
        </div>
        <div className={styles.username}>{username}</div>
      </div>
      <div className={styles.followButton}>
        <div className={styles.followText}>{text}</div>
      </div>
    </div>
  );
};

export default PeopleComponent;
