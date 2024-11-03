import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';

const SupportRequestModal = ({ onClose, onSendSupportRequest }) => {
  const [supportText, setSupportText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSend = async () => {
    if (supportText.trim() === '') {
      const errorM = t(
        'Please provide details for your support request before sending!'
      );
      toast.error(errorM, {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true); // Start loading indicator

    try {
      await onSendSupportRequest(supportText); // Send the support request
      const message = t('Your support request was sent successfully!');
      toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
      });
      onClose();
    } catch (error) {
      const errorMessage = t(
        'There was an error sending your support request. Please try again.'
      );
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Error sending support request:', error);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{t('Support Request')}</h2>
        <p className={styles.instruction}>
          {t(
            'Please describe your issue or question below, and our support team will get back to you as soon as possible.'
          )}
        </p>
        <textarea
          className={styles.input}
          placeholder={t('Type your message here...')}
          value={supportText}
          onChange={(e) => setSupportText(e.target.value)}
        />
        <div className={styles.footer}>
          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={isLoading}
          >
            {isLoading ? t('Sending...') : t('Send')}
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            {t('Cancel')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SupportRequestModal;
