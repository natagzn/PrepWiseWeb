import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

const LoginForm = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setUserId, setIsPremium, setIsAdmin } = useUser(); // Використовуємо контекст

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleForgotPassword = () => {
    navigate('/passwordreset');
  };

  const handleLogIn = () => {
    // При успішному логіні встановлюємо значення в контекст
    setUserId(1); // Замініть 1 на реальний user_id після логіну
    setIsPremium(true); // Змінити на значення з сервера
    setIsAdmin(false); // Змінити на значення з сервера

    navigate('/home');
  };

  return (
    <AuthTemplate isLogin={isLogin} toggleAuthMode={toggleAuthMode}>
      <div className={styles.inputContainer}>
        <motion.div
          className={styles.inputWrapper}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder={t('email_or_username')}
            className={styles.input}
          />
        </motion.div>

        <motion.div
          className={styles.inputWrapper}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="password"
            placeholder={t('password')}
            className={styles.input}
          />
        </motion.div>

        <motion.div
          className={styles.forgotPassword}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleForgotPassword}
        >
          {t('forgot_password')}
        </motion.div>

        <motion.button
          className={styles.loginButton}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.6 }}
          onClick={handleLogIn}
        >
          {t('log_in')}
        </motion.button>

        {/* Нижній блок */}
        <div className={styles.orSeparator}>
          <div className={styles.orLine}></div>
          <span className={styles.orText}>{t('or')}</span>
        </div>
        <div className={styles.googleButton}>
          <img src="/icons/google.svg" alt="Google Icon" />
          <span>{t('continue_with_google')}</span>
        </div>
      </div>
    </AuthTemplate>
  );
};

export default LoginForm;
