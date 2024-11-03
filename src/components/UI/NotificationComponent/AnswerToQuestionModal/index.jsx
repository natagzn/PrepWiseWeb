import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';

const AnswerToQuestionModal = ({
  questionId,
  questionFrom,
  onClose,
  onSend,
}) => {
  const fetchQuestionById = (questionId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const questionsDB = {
          1: 'What is Modular Programming?',
          2: 'How does async/await work in JavaScript?',
          3: 'Explain the concept of closures in JavaScript.',
        };
        resolve(questionsDB[questionId] || 'Question not found.');
      }, 500);
    });
  };

  const [questionTitle, setQuestionTitle] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { t } = useTranslation();

  useEffect(() => {
    fetchQuestionById(questionId).then((question) => {
      setQuestionTitle(question);
    });
  }, [questionId]);

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
      await onSend(answerText); // Ensure to await onSend if it's an async function
      const message = t('Your answer was sent successfully!');
      toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
      });
      onClose();
    } catch (error) {
      const errorMessage = t(
        'There was an error sending your answer. Please try again.'
      );
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
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
        <p className={styles.question}>{questionTitle}</p>
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
