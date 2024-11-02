import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const UserComponentForSearch = ({
  id,
  username,
  profilePicture,
  resourcesCount,
  setsCount,
}) => {
  const navigate = useNavigate();

  const handleClickView = () => {
    navigate(`/profileUser/${id}`);
  };

  return (
    <div className={styles.userContainer}>
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatar}
            src={profilePicture}
            alt={`${username}'s avatar`}
          />
          <div className={styles.username}>{username}</div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.actionsContainer}>
          <motion.button
            className={styles.viewProfileButton}
            onClick={handleClickView}
            whileHover={{ scale: 1.05, backgroundColor: '#150d3a' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            View profile
          </motion.button>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>{resourcesCount} resources</div>
            <div className={styles.statItem}>{setsCount} question sets</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponentForSearch;
