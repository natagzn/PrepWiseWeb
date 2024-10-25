import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Імпортуємо motion
import styles from './RegisterForm.module.css';
import { useTranslation } from 'react-i18next';
import AuthTemplate from '../../../components/layout/AuthTemplate/AuthTemplate';
import googleIcon from '../google.svg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Правильний імпорт
import 'react-toastify/dist/ReactToastify.css'; // Імпортуємо стилі Toast

const RegisterForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Отримуємо функцію t для перекладу
  const [isLogin, setIsLogin] = useState(false); // Тут реєстрація, тому isLogin = false
  const [username, setUsername] = useState(''); // Стан для ім'я користувача
  const [email, setEmail] = useState(''); // Стан для email
  const [password, setPassword] = useState(''); // Стан для пароля
  const [confirmPassword, setConfirmPassword] = useState(''); // Стан для підтвердження пароля

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode); // Функція для перемикання між режимами
  };

  const handleRegister = () => {
    // Перевіряємо, чи заповнені всі поля
    if (!username || !email || !password || !confirmPassword) {
      toast.error(t('please_fill_all_fields')); // Виводимо повідомлення, якщо не заповнено
      return;
    }

    // Перевірка паролів
    if (password !== confirmPassword) {
      toast.error(t('passwords_do_not_match')); // Виводимо повідомлення, якщо паролі не співпадають
      return;
    }

    // Якщо все гаразд, переходимо на сторінку підтвердження email
    navigate('/confirmEmail');
  };

  // Налаштовуємо анімаційні параметри
  const inputVariants = {
    hidden: { opacity: 0, y: -20 }, // Початковий стан (невидимий)
    visible: { opacity: 1, y: 0 }, // Кінцевий стан (видимий)
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
            placeholder={t('username')} // Використовуємо t для перекладу
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Оновлюємо значення ім'я
          />
        </motion.div>

        <motion.div
          className={styles.inputWrapper}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.2 }} // Затримка для другого поля
        >
          <input
            type="email"
            placeholder={t('email')} // Використовуємо t для перекладу
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Оновлюємо значення email
          />
        </motion.div>

        <motion.div
          className={styles.inputWrapper}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.4 }} // Затримка для третього поля
        >
          <input
            type="password"
            placeholder={t('password')} // Використовуємо t для перекладу
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Оновлюємо значення пароля
          />
        </motion.div>

        <motion.div
          className={styles.inputWrapper}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.6 }} // Затримка для четвертого поля
        >
          <input
            type="password"
            placeholder={t('confirm_password')} // Використовуємо t для перекладу
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Оновлюємо значення підтвердження пароля
          />
        </motion.div>

        <motion.button
          className={styles.registerButton}
          initial="hidden"
          animate="visible"
          variants={inputVariants}
          transition={{ duration: 0.5, delay: 0.8 }} // Затримка для кнопки
          onClick={handleRegister} // Викликаємо функцію реєстрації
        >
          {t('sign_up')} {/* Використовуємо t для перекладу */}
        </motion.button>

        {/* Нижній блок */}
        <div className={styles.orSeparator}>
          <div className={styles.orLine}></div>
          <span className={styles.orText}>{t('or')}</span>
        </div>
        <div className={styles.googleButton}>
          <img src={googleIcon} alt="Google Icon" />
          <span>{t('continue_with_google')}</span>
        </div>
      </div>

      {/* Додаємо ToastContainer для відображення Toast-повідомлень */}
      <ToastContainer />
    </AuthTemplate>
  );
};

export default RegisterForm;
