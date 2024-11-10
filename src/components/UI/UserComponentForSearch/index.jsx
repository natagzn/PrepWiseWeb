import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { generateAvatar } from 'components/generateAvatar';
import { useTranslation } from 'react-i18next';

const UserComponentForSearch = ({
  id,
  username,
  profilePicture,
  resourcesCount,
  setsCount,
}) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleClickView = () => {
    navigate(`/profileUser/${id}`);
  };

  const avatar = generateAvatar(username);

  return (
    <div className={styles.userContainer}>
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <div
            className={styles.avatar}
            style={{ backgroundColor: avatar.backgroundColor }}
          >
            {avatar.initials}
          </div>
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
            {t('View profile')}
          </motion.button>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              {resourcesCount} {t('resources_p')}
            </div>
            <div className={styles.statItem}>
              {setsCount} {t('question sets')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponentForSearch;
