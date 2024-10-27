import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        onClick={() => changeLanguage('en')}
        className={styles.langButton}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ua')}
        className={styles.langButton}
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
