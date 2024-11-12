import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { getAnswersFromFriendByQuestionId } from 'api/apiHelp';
import { Spinner } from 'react-bootstrap';

const AnswerCard = ({ username, date, answer }) => (
  <div className={styles.answerCard}>
    <div className={styles.userInfo}>
      <div className={styles.userInfoColumn}>
        <div className={styles.username}>{username}</div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
    <div className={styles.answerText}>{answer}</div>
  </div>
);

const AnswersModal = ({ questionId, onClose }) => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const month = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchAnswers = async () => {
      setIsLoading(true);
      const result = await getAnswersFromFriendByQuestionId(questionId);
      if (result.success) {
        const formattedAnswers = result.data.map((answer) => ({
          ...answer,
          date: formatDate(answer.date),
        }));
        setAnswers(formattedAnswers);
      } else {
        console.error('Failed to fetch answers:', result.message);
      }
      setIsLoading(false);
    };

    fetchAnswers();
  }, [questionId]);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('Answers')}</h2>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
      </div>
      <div className={styles.answersList}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner animation="border" />
          </div>
        ) : answers.length > 0 ? (
          answers.map((answer, index) => (
            <AnswerCard
              key={index}
              username={answer.username}
              date={answer.date}
              answer={answer.content}
            />
          ))
        ) : (
          <div className={styles.noAnswersMessage}>{t('No answers yet')}</div>
        )}
      </div>
    </div>
  );
};

export default AnswersModal;
