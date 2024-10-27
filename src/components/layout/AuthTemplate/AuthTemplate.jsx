import React from 'react';
import { useNavigate } from 'react-router-dom'; // Імпорт useNavigate
import styles from './AuthTemplate.module.css';
import placeholderImage from '../../../pages/Auth/backgroundLogin.png';
import LanguageSwitcher from '../../UI/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const AuthTemplate = ({ children, isLogin }) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Використовуємо navigate для редіректу

  // Функція для переходу на потрібну сторінку
  const handleAuthNavigation = () => {
    if (isLogin) {
      navigate('/register'); // Якщо на логін сторінці - переходимо на реєстрацію
    } else {
      navigate('/login'); // Якщо на реєстрації - переходимо на логін
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={placeholderImage} alt="Placeholder" />
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <LanguageSwitcher />
          <div className={styles.logo}>PrepWise</div>
        </div>

        {/* Основний контент */}
        {children}

        {/* Відображаємо нижній блок тільки, якщо переданий isLogin */}
        {typeof isLogin !== 'undefined' && (
          <div className={styles.signupPrompt}>
            <span>{isLogin ? t('no_account') : t('already_have_account')}</span>
            <span className={styles.signupLink} onClick={handleAuthNavigation}>
              {isLogin ? t('sign_up') : t('log_in')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTemplate;
