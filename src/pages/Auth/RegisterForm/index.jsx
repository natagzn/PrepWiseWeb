import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { sendCodeRegister } from 'api/apiWithEmail';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  // Перевірка email
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Заборона пробілів у username та password
  const handleUsernameChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ''); // Замінюємо пробіли
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ''); // Замінюємо пробіли
    setPassword(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error(t('please_fill_all_fields'));
      return;
    }

    if (!isValidEmail(email)) {
      toast.error(t('invalid_email'));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t('passwords_do_not_match'));
      return;
    }

    if (password.length < 8) {
      toast.error(t('password_too_short'));
      return;
    }

    try {
      // Send verification code to email
      const response = await sendCodeRegister(email);
      if (!response.success) {
        toast.error('Not found user');
        return;
      }

      // Redirect to ConfirmEmail page, passing email
      navigate('/confirmEmail', {
        state: { email, username, password, confirmPassword },
      });
    } catch (error) {
      toast.error(t('registration_failed'));
    }
  };

  useEffect(() => {
    if (location.state?.autoRegister) {
      handleAutoRegister(location.state);
    }
  }, [location.state]);

  const handleAutoRegister = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      toast.success(t('registration_successful'));
      navigate('/login');
    } catch (error) {
      toast.error(t('registration_failed'));
    }
  };

  // Налаштовуємо анімаційні параметри
  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
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
            placeholder={t('username')}
            className={styles.input}
            value={username}
            onChange={handleUsernameChange}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(
                t('username_required_message') || "Це поле є обов'язковим"
              )
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
            type="email"
            placeholder={t('email')}
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(
                t('email_required_message') || "Це поле є обов'язковим"
              )
            }
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </motion.div>

        <motion.div
          className={styles.inputWrapper}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <input
            type="password"
            placeholder={t('password')}
            className={styles.input}
            value={password}
            onChange={handlePasswordChange}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(
                t('password_required_message') || "Це поле є обов'язковим"
              )
            }
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </motion.div>

        <motion.div
          className={styles.inputWrapper}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <input
            type="password"
            placeholder={t('confirm_password')}
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(
                t('confirm_password_required_message') ||
                  "Це поле є обов'язковим"
              )
            }
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </motion.div>

        <motion.button
          className={styles.registerButton}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={handleRegister}
        >
          {t('sign_up')}
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

export default RegisterForm;
