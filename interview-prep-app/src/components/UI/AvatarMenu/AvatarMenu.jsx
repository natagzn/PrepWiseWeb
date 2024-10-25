import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Імпортуємо motion
import styles from './AvatarMenu.module.css';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const menuIcons = {
  people: require('./people.svg').default,
  favorite: require('./favorite.svg').default,
  home: require('./home.svg').default,
  library: require('./library.svg').default,
  notifications: require('./notification.svg').default,
  achievements: require('./achievment.svg').default,
  settings: require('./settings.svg').default,
};

const menuLinks = {
  home: '/home',
  favorite: '/favorite',
  settings: '/settings',
  library: '/library',
  notifications: '/notifications',
  achievements: '/achievements',
};

const AvatarMenu = ({ onOpenPeoplePage }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.avatarContainer}>
      <img
        className={styles.avatar}
        src="https://via.placeholder.com/65x65"
        alt="Avatar"
        onClick={toggleMenu}
      />
      {isOpen && (
        <motion.div
          className={styles.menuPanel}
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }} // Початкове положення
          animate={{ opacity: 1, y: 0 }} // Анімація при відкритті
          exit={{ opacity: 0, y: -10 }} // Анімація при закритті
          transition={{ duration: 0.2 }} // Час анімації
        >
          <div className={styles.menu}>
            <div className={styles.userInfo}>
              <img
                className={styles.userIcon}
                src="https://via.placeholder.com/50x50"
                alt="User Icon"
              />
              <div className={styles.userDetails}>
                <div className={styles.username}>sofiyalev06</div>
                <div className={styles.email}>sofiyalev06@email.com</div>
              </div>
            </div>
            <div className={styles.separator} />
            {Object.entries(menuIcons).map(([key, src]) =>
              key === 'people' ? (
                <motion.div
                  key={key}
                  className={styles.menuItem}
                  onClick={onOpenPeoplePage}
                  whileHover={{ scale: 1.05 }} // Збільшення при наведенні
                  transition={{ duration: 0.2 }} // Час анімації
                >
                  <img className={styles.menuIcon} src={src} alt={key} />
                  {t(key)}
                </motion.div>
              ) : (
                <Link to={menuLinks[key]} key={key} className={styles.menuItem}>
                  <motion.div
                    whileHover={{ scale: 1.05 }} // Збільшення при наведенні
                    transition={{ duration: 0.2 }} // Час анімації
                  >
                    <img className={styles.menuIcon} src={src} alt={key} />
                    {t(key)}
                  </motion.div>
                </Link>
              )
            )}
            <div className={styles.separator} />
            <motion.div
              className={`${styles.menuItem} ${styles.logoutItem}`}
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }} // Збільшення при наведенні
              transition={{ duration: 0.2 }} // Час анімації
            >
              {t('logout')}
            </motion.div>
            <motion.div
              className={`${styles.menuItem} ${styles.feedbackItem}`}
              whileHover={{ scale: 1.05 }} // Збільшення при наведенні
              transition={{ duration: 0.2 }} // Час анімації
            >
              {t('feedback', 'Help and feedback')}
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AvatarMenu;
