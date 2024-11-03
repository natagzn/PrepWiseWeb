import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const LanguageSwitcher = ({ style }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        onClick={() => changeLanguage('en')}
        className={styles.langButton}
        style={{ ...style }}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ua')}
        className={styles.langButton}
        style={{ ...style }}
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
