import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SettingsPage.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent/HeaderComponent';
import editIcon from './edit.svg';
import EditModal from './EditModal/EditModal';
import LanguageSwitcher from '../../components/UI/LanguageSwitcher/LanguageSwitcher';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const { t, i18n } = useTranslation(); // Destructure 't' for translations

  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: 'sofiyalev06',
    email: 'sofiyalev06@gmail.com',
    description: 'I’m student aaaaaaaa . . .',
    location: 'Ukraine',
    avatar: null,
  });

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage); // Зберігаємо вибір мови
  };

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleSave = (updatedData) => {
    setUserData(updatedData);
    // Here you can also add your API call to save the updated data
  };

  return (
    <div>
      <HeaderComponent showSearch={true} showPremium={true} />

      <div className={styles.settingsContainer}>
        <h1 className={styles.title}>{t('settings')}</h1>{' '}
        {/* Personal Information Block */}
        <div className={styles.personalInfoBlock}>
          <div className={styles.personalInfoTitle}>
            {t('personal_information')} {/* Correct translation usage */}
          </div>
          <div className={styles.personalInfoContent}>
            <div className={styles.profilePictureBlock}>
              <div className={styles.profileLabel}>{t('avatar')}</div>
              {userData.avatar ? (
                <img
                  className={styles.profileImage}
                  src={userData.avatar}
                  alt="Profile"
                />
              ) : (
                <img
                  className={styles.profileImage}
                  src="https://via.placeholder.com/120x120"
                  alt="Profile"
                />
              )}
              <div className={styles.iconEdit}>
                <img src={editIcon} onClick={handleClick} alt="Edit icon" />{' '}
                {/* Add alt attribute */}
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
            value={i18n.language} // Keep the selected language in sync
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
            whileHover={{ scale: 1.05, backgroundColor: '#dbc946' }} // Анімація при наведенні
            transition={{ duration: 0.15 }}
          >
            Upgrade
          </motion.div>
        </div>
        {/* Log out Block */}
        <div className={styles.logoutBlock}>
          <div className={styles.logoutTitle}>{t('logout')}:</div>
          <motion.div
            className={styles.logoutButton}
            whileHover={{ scale: 1.05, backgroundColor: '#dbc946' }} // Анімація при наведенні
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
            whileHover={{ scale: 1.05, backgroundColor: '#ec221f' }} // Зміна кольору для кнопки видалення
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
    </div>
  );
};

export default SettingsPage;
