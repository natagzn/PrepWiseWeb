import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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

  const handleRegister = () => {
    // Перевіряємо, чи заповнені всі поля
    if (!username || !email || !password || !confirmPassword) {
      toast.error(t('please_fill_all_fields'));
      return;
    }

    // Перевірка паролів
    if (password !== confirmPassword) {
      toast.error(t('passwords_do_not_match'));
      return;
    }

    // Якщо все гаразд, переходимо на сторінку підтвердження email
    navigate('/confirmEmail');
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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
