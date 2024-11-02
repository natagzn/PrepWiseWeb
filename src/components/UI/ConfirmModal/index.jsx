import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, text }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    // Закриваємо модальне вікно при натисканні на фон
    if (event.target.className === styles.overlay) {
      onRequestClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h3>{text}</h3>
        <div className={styles.buttonContainer}>
          <button onClick={onConfirm} className={styles.yes}>
            {t('yes')}
          </button>
          <button onClick={onRequestClose} className={styles.no}>
            {t('no')}
          </button>
        </div>
      </div>
    </div>,
    document.body // Вставляємо модальне вікно в body
  );
};

export default ConfirmationModal;
