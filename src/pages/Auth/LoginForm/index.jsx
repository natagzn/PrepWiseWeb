import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

const LoginForm = () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/auth/login`;
  const profileUrl = `${process.env.REACT_APP_API_URL}/profile`;
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserId, setIsPremium, setIsAdmin } = useUser();

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

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const token = data.token.token;
      localStorage.setItem('token', token);

      await fetchUserProfile(token);

      navigate('/home');
    } catch (error) {
      console.error('Помилка підключення до API:', error);
      setError('Невірний логін або пароль. Будь ласка, спробуйте ще раз.');
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      console.log(`Bearer ${token}`);
      const response = await fetch(profileUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`, // Додаємо префікс "Bearer"
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const profileData = await response.json();
      setUserId(profileData.user_id);
      setIsPremium(profileData.subscription_type !== null);
      setIsAdmin(profileData.role === 'admin');
    } catch (error) {
      console.error('Помилка отримання профілю:', error);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>

        {error && <div className={styles.errorMessage}>{error}</div>}

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
          onClick={handleLogin}
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
