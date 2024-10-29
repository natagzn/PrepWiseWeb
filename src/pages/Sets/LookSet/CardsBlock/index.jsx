import React, { useState } from 'react';
import styles from './styles.module.css';
import QuestionAnswerComponent from 'components/UI/QuestionAnswerComponent';
import SortComponent from 'components/UI/SortComponent';

const sortingOptions = [
  { label: 'Original', value: 'original' },
  { label: 'Alphabetical', value: 'alphabetical' },
  { label: 'Your stats', value: 'yourStats' },
];

const CardBlock = ({ questionsAnswers }) => {
  const [sortedQuestions, setSortedQuestions] = useState(questionsAnswers);
  const [selectedSort, setSelectedSort] = useState('original');

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    let sortedArray = [...questionsAnswers];

    if (sortOption === 'alphabetical') {
      sortedArray.sort((a, b) => a.question.localeCompare(b.question));
    } else if (sortOption === 'yourStats') {
      const stillLearning = questionsAnswers.filter(
        (q) => q.status === 'stilllearning'
      );
      const alreadyKnow = questionsAnswers.filter((q) => q.status === 'know');
      sortedArray = [...stillLearning, ...alreadyKnow];
    }

    setSortedQuestions(
      sortOption === 'original' ? questionsAnswers : sortedArray
    );
  };

  const stillLearningQuestions = sortedQuestions.filter(
    (q) => q.status === 'stilllearning'
  );
  const alreadyKnowQuestions = sortedQuestions.filter(
    (q) => q.status === 'know'
  );

  return (
    <div>
      <div className={styles.header}>
        <span>Questions({questionsAnswers.length})</span>
        <div className={styles.sortDiv}>
          <SortComponent
            sortingOptions={sortingOptions}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {selectedSort === 'yourStats' ? (
        <div>
          {/* Блок Still learning */}
          <div className={styles.categoryBlock}>
            <h3
              className={`${styles.categoryTitle} ${styles.stillLearningTitle}`}
            >
              Still learning ({stillLearningQuestions.length})
            </h3>
            <p className={styles.categoryMessage}>
              You've started learning these terms. Keep it up!
            </p>
            <div className={styles.cardBlockContainer}>
              {stillLearningQuestions.map((item) => (
                <QuestionAnswerComponent
                  id={item.id}
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  status={item.status}
                />
              ))}
            </div>
          </div>

          {/* Блок Already know */}
          <div className={styles.categoryBlock}>
            <h3
              className={`${styles.categoryTitle} ${styles.alreadyKnowTitle}`}
            >
              Already know ({alreadyKnowQuestions.length})
            </h3>
            <p className={styles.categoryMessage}>
              You know these questions perfectly!
            </p>
            <div className={styles.cardBlockContainer}>
              {alreadyKnowQuestions.map((item) => (
                <QuestionAnswerComponent
                  id={item.id}
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  status={item.status}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.cardBlockContainer}>
          {sortedQuestions.map((item) => (
            <QuestionAnswerComponent
              id={item.id}
              key={item.id}
              question={item.question}
              answer={item.answer}
              status={item.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardBlock;
