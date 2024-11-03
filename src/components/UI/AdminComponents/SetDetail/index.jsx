import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';

const SetDetails = () => {
  const { questionSetId } = useParams(); // Отримуємо ID набору запитань
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Фіктивні дані для набору запитань
  const questionSet = {
    questionSet_id: questionSetId,
    user_id: 'user_1',
    name: 'Приклад набору запитань',
    category_id: 'category_1',
    access: true,
    data: '2024-11-01',
    level_id: 1,
  };

  // Фіктивні дані для запитань у наборі
  const questions = [
    {
      question_id: 1,
      content: 'Що таке React?',
      answer: 'Бібліотека для побудови інтерфейсів.',
    },
    {
      question_id: 2,
      content: 'Що таке компонент?',
      answer: 'Основна одиниця UI в React.',
    },
    {
      question_id: 3,
      content: 'Що таке props?',
      answer: 'Властивості, які передаються компонентам.',
    },
    {
      question_id: 4,
      content: 'Що таке props4?',
      answer: 'Властивості, які4s передаються компонентам.',
    },
    {
      question_id: 5,
      content: 'Що 5таке props4?',
      answer: 'Власт5ивості, які4s передаються компонентам.',
    },
  ];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Логіка для видалення набору запитань
    console.log(`Набір запитань з ID ${questionSetId} видалено`);
    setIsDeleteModalOpen(false);
    handleCancel();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.leftBlock}>
          <h2>{questionSet.name}</h2>
          <p>
            {t('user')}: {questionSet.user_id}
          </p>
          <p>
            {t('category')}: {questionSet.category_id}
          </p>
          <p>
            {t('access')}: {questionSet.access ? t('public') : t('private')}
          </p>
          <p>
            {t('Date')}: {questionSet.data}
          </p>
          <p>
            {t('level')}: {questionSet.level_id}
          </p>
          <button onClick={handleDelete} className={styles.button}>
            {t('delete')}
          </button>
          <button onClick={handleCancel} className={styles.button}>
            {t('cancel')}
          </button>
        </div>

        <div className={styles.rightBlock}>
          <h3>{t('questions_in_set')}</h3>
          <ul className={styles.questionList}>
            {questions.map((question) => (
              <li key={question.question_id} className={styles.questionItem}>
                <p>
                  <strong>{question.content}</strong>
                </p>
                <p>
                  {t('answer')}: {question.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Модальне вікно для підтвердження видалення */}
      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{t('are_you_sure_delete_set')}</p>
            <div>
              <button
                className="btn btn-danger mx-1"
                onClick={handleDeleteConfirm}
              >
                {t('delete')}
              </button>
              <button
                className="btn btn-secondary mx-1"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetDetails;
