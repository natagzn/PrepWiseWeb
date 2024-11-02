import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import SupportRequestModal from '../SupportRequestModal';

const menuIcons = {
  people: require('../../assets/AvatarMenu/people.svg').default,
  favorite: require('../../assets/AvatarMenu/favorite.svg').default,
  home: require('../../assets/AvatarMenu/home.svg').default,
  library: require('../../assets/AvatarMenu/library.svg').default,
  notifications: require('../../assets/AvatarMenu/notification.svg').default,
  calendar: require('../../assets/AvatarMenu/calendar.svg').default,
  settings: require('../../assets/AvatarMenu/settings.svg').default,
  support: require('../../assets/AvatarMenu/support.svg').default,
};

const menuLinks = {
  home: '/home',
  favorite: '/favorite',
  settings: '/settings',
  library: '/library',
  notifications: '/notifications',
};

const AvatarMenu = ({ onOpenPeoplePage, onOpenCalendarModal }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
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

  const handleSendSupportRequest = async (supportText) => {
    console.log('Support request sent:', supportText);
  };

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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
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
            {Object.entries(menuIcons).map(([key, src]) => {
              if (key === 'support') {
                return (
                  <motion.div
                    key={key}
                    className={styles.menuItem}
                    onClick={() => setIsSupportModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img className={styles.menuIcon} src={src} alt={key} />
                    {t(key)}
                  </motion.div>
                );
              }
              if (key === 'people') {
                return (
                  <motion.div
                    key={key}
                    className={styles.menuItem}
                    onClick={onOpenPeoplePage}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img className={styles.menuIcon} src={src} alt={key} />
                    {t(key)}
                  </motion.div>
                );
              }
              if (key === 'calendar') {
                return (
                  <motion.div
                    key={key}
                    className={styles.menuItem}
                    onClick={onOpenCalendarModal}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img className={styles.menuIcon} src={src} alt={key} />
                    {t(key)}
                  </motion.div>
                );
              }
              return (
                <Link
                  to={menuLinks[key] || '#'}
                  key={key}
                  className={styles.menuItem}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img className={styles.menuIcon} src={src} alt={key} />
                    {t(key)}
                  </motion.div>
                </Link>
              );
            })}
            <div className={styles.separator} />
            <motion.div
              className={`${styles.menuItem} ${styles.logoutItem}`}
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {t('logout')}
            </motion.div>
          </div>
        </motion.div>
      )}
      {isSupportModalOpen && (
        <SupportRequestModal
          onClose={() => setIsSupportModalOpen(false)}
          onSendSupportRequest={handleSendSupportRequest}
        />
      )}
    </div>
  );
};

export default AvatarMenu;
