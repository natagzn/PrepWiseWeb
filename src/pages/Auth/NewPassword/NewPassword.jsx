import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify'; // Імпортуємо ToastContainer і toast
import 'react-toastify/dist/ReactToastify.css'; // Імпортуємо стилі
import styles from './NewPassword.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate/AuthTemplate';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleConfirm = () => {
    if (password === confirmPassword && password.trim() !== '') {
      console.log('Password confirmed');
      navigate('/home');
    } else {
      toast.error(t('passwords_do_not_match'), {
        position: 'top-right', // Позиція повідомлення
        autoClose: 5000, // Автоматичне закриття через 5 секунд
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCancel = () => {
    navigate('/passwordreset');
  };

  return (
    <>
      <AuthTemplate isLogin={true}>
        <div className={styles.formContainer}>
          <div className={styles.title}>{t('enter_new_password')}</div>

          <motion.div
            className={styles.inputWrapper}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            transition={{ duration: 0.5 }}
          >
            <input
              type="password"
              placeholder={t('password')}
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            className={styles.inputWrapper}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <input
              type="password"
              placeholder={t('password_confirmation')}
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.button
            className={styles.confirmButton}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={handleConfirm}
          >
            {t('confirm')}
          </motion.button>

          <motion.button
            className={styles.cancelButton}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            transition={{ duration: 0.5, delay: 0.9 }}
            onClick={handleCancel}
          >
            {t('cancel')}
          </motion.button>
        </div>
      </AuthTemplate>

      {/* Контейнер для відображення сповіщень */}
      <ToastContainer />
    </>
  );
};

export default NewPassword;
