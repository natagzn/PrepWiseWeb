import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import EditModal from './EditModal';
import { motion } from 'framer-motion';
import InfoPremiumModal from './InfoPremiumModal';
import { useUser } from 'context/UserContext';
import { fetchUserProfile } from 'api/apiUser'; // Імпортуємо функцію для отримання профілю
import { generateAvatar } from 'components/generateAvatar';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { user_id, token } = useUser(); // Отримуємо токен користувача

  const [isModalOpen, setModalOpen] = useState(false);
  const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    description: '',
    location: '',
    avatar: null,
  });

  // Завантажуємо профіль користувача
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUserData(profile);
      } catch (error) {
        console.error('Помилка завантаження профілю:', error);
      }
    };

    loadUserProfile();
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleSave = (updatedData) => {
    setUserData(updatedData);
  };

  const handlePremiumClick = () => {
    setPremiumModalOpen(true);
  };

  const { initials, backgroundColor } = generateAvatar(userData.username);

  return (
    <div>
      <HeaderComponent showSearch={true} showPremium={true} />

      <div className={styles.settingsContainer}>
        <h1 className={styles.title}>{t('settings')}</h1>
        {/* Personal Information Block */}
        <div className={styles.personalInfoBlock}>
          <div className={styles.personalInfoTitle}>
            {t('personal_information')}
          </div>
          <div className={styles.personalInfoContent}>
            <div className={styles.profilePictureBlock}>
              <div className={styles.profileLabel}>{t('avatar')}</div>
              {/* Відображаємо лише згенеровану аватарку */}
              <div
                className={styles.profileImage}
                style={{ backgroundColor }} // Використовуємо генерований колір
              >
                <span className={styles.avatarInitials}>{initials}</span>
              </div>
              <div className={styles.iconEdit}>
                <img
                  src="/icons/edit.svg"
                  onClick={handleClick}
                  alt="Edit icon"
                />
              </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.personalDetails}>
              <table className={styles.detailsTable}>
                <tbody>
                  <tr>
                    <td className={styles.detailLabel}>{t('username')}:</td>
                    <td className={styles.detailValue}>{userData.username}</td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>{t('email')}:</td>
                    <td className={styles.detailValue}>{userData.email}</td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>{t('description')}:</td>
                    <td className={styles.detailValue}>
                      {userData.description}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.detailLabel}>{t('location')}:</td>
                    <td className={styles.detailValue}>{userData.location}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Language Selection Block */}
        <div className={styles.languageBlock}>
          <div className={styles.languageLabel}>{t('language')}:</div>
          <select
            className={styles.languageSelect}
            onChange={handleLanguageChange}
            value={i18n.language}
          >
            <option value="en">English</option>
            <option value="ua">Українська</option>
          </select>
        </div>
        {/* Premium Block */}
        <div className={styles.premiumBlock}>
          <div className={styles.premiumLabel}>PrepWise Premium</div>
          <motion.div
            className={styles.premiumUpgradeButton}
            whileHover={{ scale: 1.05, backgroundColor: '#dbc946' }}
            transition={{ duration: 0.15 }}
            onClick={handlePremiumClick}
          >
            {t('Look')}
          </motion.div>
        </div>
        {/* Log out Block */}
        <div className={styles.logoutBlock}>
          <div className={styles.logoutTitle}>{t('logout')}:</div>
          <motion.div
            className={styles.logoutButton}
            whileHover={{ scale: 1.05, backgroundColor: '#dbc946' }}
            transition={{ duration: 0.15 }}
          >
            {t('logout')}
          </motion.div>
        </div>
        {/* Delete Account Block */}
        <div className={styles.deleteAccountBlock}>
          <div className={styles.deleteLabel}>{t('delete_akk')}:</div>
          <div className={styles.deleteDescription}>{t('delete_desc')}</div>
          <motion.div
            className={styles.deleteButton}
            whileHover={{ scale: 1.05, backgroundColor: '#ec221f' }}
            transition={{ duration: 0.15 }}
          >
            {t('delete_akk')}
          </motion.div>
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        userData={userData}
        onSave={handleSave}
      />
      <InfoPremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
        user_id={user_id}
      />
    </div>
  );
};

export default SettingsPage;
