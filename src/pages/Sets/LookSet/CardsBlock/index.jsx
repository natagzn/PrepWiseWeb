import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import QuestionAnswerComponent from 'components/UI/QuestionAnswerComponent';
import SortComponent from 'components/UI/SortComponent';

const CardBlock = ({ questionsAnswers, isAuthor }) => {
  const { t } = useTranslation();
  const [sortedQuestions, setSortedQuestions] = useState(questionsAnswers);
  const [selectedSort, setSelectedSort] = useState('original');

  const sortingOptions = [
    { label: t('sortingOptions.original'), value: 'original' },
    { label: t('sortingOptions.alphabetical'), value: 'alphabetical' },
  ];

  if (isAuthor) {
    sortingOptions.push({
      label: t('sortingOptions.yourStats'),
      value: 'yourStats',
    });
  }

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    let sortedArray = [...questionsAnswers];

    if (sortOption === 'alphabetical') {
      sortedArray.sort((a, b) => a.content.localeCompare(b.content));
    } else if (sortOption === 'yourStats') {
      const stillLearning = questionsAnswers.filter((q) => q.status === false);
      const alreadyKnow = questionsAnswers.filter((q) => q.status === true);
      sortedArray = [...stillLearning, ...alreadyKnow];
    }

    setSortedQuestions(
      sortOption === 'original' ? questionsAnswers : sortedArray
    );
  };

  const stillLearningQuestions = sortedQuestions.filter(
    (q) => q.status === false
  );
  const alreadyKnowQuestions = sortedQuestions.filter((q) => q.status === true);

  return (
    <div>
      <div className={styles.header}>
        <span>{t('questionsCount', { count: questionsAnswers.length })}</span>
        <div className={styles.sortDiv}>
          <SortComponent
            sortingOptions={sortingOptions}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {selectedSort === 'yourStats' ? (
        <div>
          {/* Перевірка на відсутність Still learning */}
          {stillLearningQuestions.length === 0 ? (
            <p className={styles.categoryMessage}>{t('noLearningYet')}</p>
          ) : (
            <div className={styles.categoryBlock}>
              <h3
                className={`${styles.categoryTitle} ${styles.stillLearningTitle}`}
              >
                {t('stillLearningTitle', {
                  count: stillLearningQuestions.length,
                })}
              </h3>
              <p className={styles.categoryMessage}>
                {t('learningEncouragement')}
              </p>
              <div className={styles.cardBlockContainer}>
                {console.log('qa', stillLearningQuestions)}
                {stillLearningQuestions.map((item) => (
                  <QuestionAnswerComponent
                    id={item.id}
                    key={item.id}
                    question={item.content}
                    answer={item.answer}
                    status={item.status}
                    help={isAuthor}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Перевірка на відсутність Already know */}
          {alreadyKnowQuestions.length === 0 ? (
            <p className={styles.categoryMessage}>{t('notKnown')}</p>
          ) : (
            <div className={styles.categoryBlock}>
              <h3
                className={`${styles.categoryTitle} ${styles.alreadyKnowTitle}`}
              >
                {t('alreadyKnowTitle', { count: alreadyKnowQuestions.length })}
              </h3>
              <p className={styles.categoryMessage}>{t('knowingPerfectly')}</p>
              <div className={styles.cardBlockContainer}>
                {alreadyKnowQuestions.map((item) => (
                  <QuestionAnswerComponent
                    id={item.id}
                    key={item.id}
                    question={item.content}
                    answer={item.answer}
                    status={item.status}
                    help={isAuthor}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.cardBlockContainer}>
          {sortedQuestions.map((item) => (
            <QuestionAnswerComponent
              id={item.id}
              key={item.id}
              question={item.content}
              answer={item.answer}
              status={item.status}
              help={isAuthor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardBlock;
