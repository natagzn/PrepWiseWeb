import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './NewFollowersModal.module.css';
import closeIcon from './close.svg';
import { useTranslation } from 'react-i18next';

export default function NewFollowersModal({ onClose }) {
  const { t } = useTranslation();
  const [followers, setFollowers] = useState([
    { id: 1, username: 'username1', following: false },
    { id: 2, username: 'username2', following: false },
    { id: 3, username: 'username3', following: true },
    { id: 4, username: 'username1', following: false },
    { id: 5, username: 'username2', following: false },
    { id: 6, username: 'username3', following: true },
    { id: 7, username: 'username1', following: false },
    { id: 8, username: 'username2', following: false },
    { id: 9, username: 'username3', following: true },
  ]);

  const toggleFollow = (id) => {
    setFollowers(
      followers.map((follower) =>
        follower.id === id
          ? { ...follower, following: !follower.following }
          : follower
      )
    );
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="close icon" />
          </div>
          <div className={styles.modalTitle}>{t('new_followers')}</div>
        </div>
        <div className={styles.followersList}>
          {followers.map((follower) => (
            <div key={follower.id} className={styles.followerItem}>
              <img
                className={styles.avatar}
                src="https://via.placeholder.com/47x47"
                alt={`${follower.username} avatar`}
              />
              <div className={styles.followerInfo}>
                <div className={styles.username}>{follower.username}</div>
                <div className={styles.requestTime}>
                  {t('followed_from')} ...
                </div>
              </div>
              <motion.button
                className={styles.followButton}
                onClick={() => toggleFollow(follower.id)}
                whileHover={{ scale: 1.1 }} // Анімація при наведенні
                whileTap={{ scale: 0.95 }} // Анімація при натисканні
                style={{
                  backgroundColor: follower.following
                    ? 'rgba(29, 19, 82, 1)'
                    : '#144250',
                }} // Змінюємо колір залежно від статусу
              >
                {follower.following ? 'Friends' : 'Follow back'}
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
