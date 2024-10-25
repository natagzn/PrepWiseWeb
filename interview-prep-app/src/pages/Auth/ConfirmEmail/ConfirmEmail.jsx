import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Імпортуємо motion
import styles from './ConfirmEmail.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate/AuthTemplate';
import { useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState(['', '', '', '']); // Зберігаємо значення 4 інпутів
  const navigate = useNavigate();

  // Функція для оновлення введеного коду
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      // Дозволяємо лише цифри
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      // Переходимо до наступного інпуту після введення цифри
      if (value && index < 3) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleConfirm = () => {
    if (code.join('').length === 4) {
      console.log('Code confirmed:', code.join(''));
      // Перевірка введеного коду або інша логіка
      navigate('/home'); // Наприклад, редирект після успіху
    } else {
      console.log('Invalid code');
    }
  };

  const handleCancel = () => {
    navigate('/register');
  };

  return (
    <AuthTemplate isLogin={false}>
      <div className={styles.formContainer}>
        <div className={styles.title}>{t('confirm_email')}</div>
        <div className={styles.subtitle}>{t('enter_code')}</div>

        <div className={styles.codeInputContainer}>
          {code.map((value, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              className={styles.codeInput}
            />
          ))}
        </div>

        <motion.button
          className={styles.confirmButton}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          onClick={handleConfirm}
        >
          {t('confirm')}
        </motion.button>

        <motion.button
          className={styles.cancelButton}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={handleCancel}
        >
          {t('cancel')}
        </motion.button>
      </div>
    </AuthTemplate>
  );
};

export default ConfirmEmail;
