import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';

const ModalPremium = ({ isOpen, onRequestClose, onConfirm, text }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target.className === styles.overlay) {
      onRequestClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>PrepWise Premium</h2>
        <div className={styles.modalText}>{text}</div>
        <div className={styles.buttonContainer}>
          <motion.button
            onClick={onConfirm}
            className={styles.yes}
            whileHover={{ scale: 1.05, backgroundColor: '#150d3a' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {t('Look')}
          </motion.button>
          <motion.button
            onClick={onRequestClose}
            className={styles.no}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {t('Close')}
          </motion.button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalPremium;
