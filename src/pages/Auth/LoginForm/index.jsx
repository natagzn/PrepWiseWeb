import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { toast } from 'react-toastify';
import { loginUser } from 'api/apiUser';
import { Spinner } from 'react-bootstrap'; // Додаємо компонент Spinner

const LoginForm = () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/auth/login`;
  const profileUrl = `${process.env.REACT_APP_API_URL}/profile`;
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Стан для відображення спінера
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Включаємо спінер
    document.documentElement.scrollTop = 0; // Прокручуємо сторінку на початок

    try {
      const token = await loginUser(email, password);
      await fetchUserProfileAndSetState(token);
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('Невірний логін або пароль. Будь ласка, спробуйте ще раз.');
    } finally {
      setLoading(false); // Вимикаємо спінер після завершення запиту
    }
  };

  const fetchUserProfileAndSetState = async (token) => {
    try {
      const profileData = await fetchUserProfileAndSetState(token);
      console.log(profileData);
      setUserId(profileData.user_id);
      setIsPremium(profileData.subscription_type !== null);
      setIsAdmin(profileData.role === 'admin');
    } catch (error) {
      console.error('Помилка отримання профілю:', error);
    }
  };

  return (
    <AuthTemplate isLogin={isLogin} toggleAuthMode={toggleAuthMode}>
      <form onSubmit={handleLogin} className={styles.inputContainer}>
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
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(t('email_required_message_log'))
            }
            onInput={(e) => e.target.setCustomValidity('')}
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
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(t('password_required_message_log'))
            }
            onInput={(e) => e.target.setCustomValidity('')}
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
          type="submit"
          disabled={loading} // Вимикає кнопку під час обробки запиту
        >
          {loading ? (
            <Spinner size="sm" /> // Показуємо спінер
          ) : (
            t('log_in') // Показуємо текст кнопки
          )}
        </motion.button>

        {/* Нижній блок 
        <div className={styles.orSeparator}>
          <div className={styles.orLine}></div>
          <span className={styles.orText}>{t('or')}</span>
        </div>
        <div className={styles.googleButton}>
          <img src="/icons/google.svg" alt="Google Icon" />
          <span>{t('continue_with_google')}</span>
        </div>*/}
      </form>
    </AuthTemplate>
  );
};

export default LoginForm;
