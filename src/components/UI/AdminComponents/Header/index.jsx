import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from 'components/UI/LanguageSwitcher';

function HeaderAdmin() {
  const { t } = useTranslation();

  return (
    <div className={styles.headerAdmin}>
      <h2 className={styles.headerTitle}>Admin Panel</h2>
      <nav className={styles.navLinks}>
        <Link to="/admin/categories" className={styles.link}>
          {t('categories')}
        </Link>
        <Link to="/admin/complaints" className={styles.link}>
          {t('complaints')}
        </Link>
        <Link to="/admin/levels" className={styles.link}>
          {t('levels')}
        </Link>
        <Link to="/admin/supports" className={styles.link}>
          {t('supports')}
        </Link>
      </nav>

      <LanguageSwitcher style={{ color: 'white' }} />
    </div>
  );
}

export default HeaderAdmin;
