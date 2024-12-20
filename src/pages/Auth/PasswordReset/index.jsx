import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const { t } = useTranslation();
  const [isLogin] = useState(false);
  const navigate = useNavigate();

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const hadleConfirm = () => {
    console.log('good');
    if (true) {
      navigate('/newpassword');
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <AuthTemplate isLogin={true}>
      {/* Основний контент форми */}
      <div className={styles.formContainer}>
        <div className={styles.title}>{t('reset_password')}</div>

        {/* Анімований інпут для email */}
        <motion.div
          className={styles.inputWrapper}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5 }}
        >
          <input
            type="email"
            placeholder={t('email')}
            className={styles.input}
            required
          />
        </motion.div>

        {/* Анімована кнопка підтвердження */}
        <motion.button
          className={styles.confirmButton}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={hadleConfirm}
        >
          {t('email_confirmation')}
        </motion.button>

        {/* Кнопка "Cancel", яка викликає функцію onCancel */}
        <motion.button
          className={styles.cancelButton}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleCancel}
        >
          {t('cancel')}
        </motion.button>
      </div>
    </AuthTemplate>
  );
};

export default PasswordReset;
