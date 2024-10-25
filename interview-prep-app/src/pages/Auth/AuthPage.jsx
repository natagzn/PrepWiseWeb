import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import placeholderImage from './backgroundLogin.png';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/UI/LanguageSwitcher/LanguageSwitcher';
import PasswordReset from './PasswordReset/PasswordReset';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import NewPassword from './NewPassword/NewPassword'; // Import NewPassword component
import googleIcon from './google.svg';

const AuthPage = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false); // State for NewPassword component

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setIsPasswordReset(false);
    setIsNewPassword(false); // Reset NewPassword state
  };

  const handlePasswordReset = () => {
    setIsPasswordReset(true);
  };

  const handleCancelPasswordReset = () => {
    setIsPasswordReset(false);
    setIsNewPassword(false); // Ensure NewPassword is not shown when canceled
  };

  const handleConfirmPasswordReset = () => {
    // Simulate email confirmation success
    const isSuccess = true; // Fake success condition

    if (isSuccess) {
      setIsPasswordReset(false); // Hide PasswordReset
      setIsNewPassword(true); // Show NewPassword component
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={placeholderImage} alt="Placeholder" />
      <div
        className={`${styles.formContainer} ${isLogin ? styles.loginGap : styles.registerGap}`}
      >
        <LanguageSwitcher />
        <div className={styles.logo}>PrepWise</div>
        <div className={styles.welcome}>
          {!isPasswordReset && !isNewPassword
            ? isLogin
              ? t('welcome_back')
              : t('sign_up')
            : isPasswordReset
              ? t('reset_password')
              : t('new_password')}
        </div>

        {/* Conditional rendering for different forms */}
        {isNewPassword ? (
          <NewPassword />
        ) : isPasswordReset ? (
          <PasswordReset
            onCancel={handleCancelPasswordReset}
            onConfirm={handleConfirmPasswordReset}
          />
        ) : isLogin ? (
          <LoginForm onForgotPassword={handlePasswordReset} />
        ) : (
          <RegisterForm />
        )}

        {!isPasswordReset && !isNewPassword && (
          <>
            <div className={styles.orSeparator}>
              <div className={styles.orLine}></div>
              <span className={styles.orText}>{t('or')}</span>
            </div>
            <div className={styles.googleButton}>
              <img
                src={googleIcon}
                alt="Google Icon"
                className={styles.googleIcon}
              />
              <span>{t('continue_with_google')}</span>
            </div>
            <div className={styles.signupPrompt}>
              <span>
                {isLogin ? t('no_account') : t('already_have_account')}
              </span>
              <span className={styles.signupLink} onClick={toggleAuthMode}>
                {isLogin ? t('sign_up') : t('log_in')}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
