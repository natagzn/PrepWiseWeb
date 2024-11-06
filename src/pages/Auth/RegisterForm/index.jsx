import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

    // Перевіряємо, чи заповнені всі поля
    if (!username || !email || !password || !confirmPassword) {
      toast.error(t('please_fill_all_fields'));
      return;
    }

    // Перевірка на правильність формату email
    if (!isValidEmail(email)) {
      toast.error(t('invalid_email'));
      return;
    }

    // Перевірка паролів
    if (password !== confirmPassword) {
      toast.error(t('passwords_do_not_match'));
      return;
    }

    // Перевірка на мінімальну довжину паролю (опційно)
    if (password.length < 8) {
      toast.error(t('password_too_short'));
      return;
    }

    try {
      // Запит на реєстрацію користувача
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          username,
          email,
          password,
          password_confirmation: confirmPassword,
        }
      );

      // Якщо реєстрація успішна, переходимо на сторінку підтвердження email
      toast.success(t('registration_successful'));
      navigate('/login');
    } catch (error) {
      // Обробка помилок API
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (
          errorData.username &&
          errorData.username[0] === 'unique validation failure'
        ) {
          toast.error(t('username_taken'));
        } else if (
          errorData.email &&
          errorData.email[0] === 'unique validation failure'
        ) {
          toast.error(t('email_taken'));
        } else {
          toast.error(t('registration_failed'));
        }
      } else {
        toast.error(t('registration_failed'));
      }
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
