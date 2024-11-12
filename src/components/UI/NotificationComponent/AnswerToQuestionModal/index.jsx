import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';
import { sendAnswerOnQuestion } from 'api/apiHelp';

const AnswerToQuestionModal = ({
  questionId,
  questionFrom,
  questionContent,
  onClose,
}) => {
  const [answerText, setAnswerText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { t } = useTranslation();

  const handleSend = async () => {
    if (answerText.trim() === '') {
      const errorM = t('Please type your answer before sending!');
      toast.error(errorM, {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true); // Start loading indicator

    try {
      const result = await sendAnswerOnQuestion(questionId, answerText);
      if (result.success) {
        const message = t('Your answer was sent successfully!');
        toast.success(message);
        onClose();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      const errorMessage = t(
        'There was an error sending your answer. Please try again.'
      );
      toast.error(errorMessage);
      console.error('Error sending answer:', error);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.from}>
          {`${t('Question from')} ${questionFrom}`}
        </h2>
        <p className={styles.question}>{questionContent}</p>
        <p className={styles.answerLabel}>{t('Your answer')}</p>
        <textarea
          className={styles.answerInput}
          placeholder={t('Type your answer here...')}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        />
        <div className={styles.footer}>
          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? t('Sending...') : t('Send')}
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            {t('Cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerToQuestionModal;
