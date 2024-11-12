import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate';
import { useLocation, useNavigate } from 'react-router-dom';
import { check } from 'prettier';
import { checkCodeRegister } from 'api/apiWithEmail';
import { toast } from 'react-toastify';

const ConfirmEmail = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState(['', '', '', '']); // Зберігаємо значення 4 інпутів
  const navigate = useNavigate();
  const location = useLocation();

  const { email, username, password, confirmPassword } = location.state;

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

  const handleConfirm = async () => {
    const enteredCode = code.join('');
    if (enteredCode.length === 4) {
      const result = await checkCodeRegister(email, enteredCode);

      if (result.success) {
        navigate('/register', {
          state: {
            email,
            username,
            password,
            confirmPassword,
            autoRegister: true,
          },
        });
      } else {
        toast.error(t('invalid_code'));
      }
    } else {
      toast.error(t('invalid_code'));
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
