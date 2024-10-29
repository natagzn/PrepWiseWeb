import React, { useState } from 'react';
import styles from './styles.module.css';

function SetQuickReviewComponent({ questionsAnswers }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const knownCount = questionsAnswers.filter((q) => q.status === 'know').length;
  const stillLearningCount = questionsAnswers.filter(
    (q) => q.status === 'stilllearning'
  ).length;
  const totalCount = knownCount + stillLearningCount;

  const knownPercentage = totalCount ? (knownCount / totalCount) * 100 : 0;
  const stillLearningPercentage = totalCount
    ? (stillLearningCount / totalCount) * 100
    : 0;

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questionsAnswers.length);
  };

  const prevQuestion = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + questionsAnswers.length) % questionsAnswers.length
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderHeader}>Quick review of questions</div>
      {/* Перший стовпець - слайдер з картками */}
      <div className={styles.mainContent}>
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            <div className={styles.navigationButton} onClick={prevQuestion}>
              &lt;
            </div>
            <div className={styles.cardText}>
              {questionsAnswers[currentIndex].question}
            </div>
            <div className={styles.navigationButton} onClick={nextQuestion}>
              &gt;
            </div>
          </div>
        </div>

        {/* Другий стовпець - діаграма прогресу та кнопка "Study flashcards" */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBlock}>
            <div className={styles.progressTitle}>Progress learning</div>
            <div className={styles.progressInfo}>
              <div className={styles.circularChart}>
                <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#f1f1f1"
                    strokeWidth="20"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#4CAF50"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${knownPercentage * 5.65} ${564.48}`}
                    transform="rotate(-90 100 100)"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={styles.progressPercent}
                  >
                    {knownPercentage.toFixed(0)}%
                  </text>
                </svg>
              </div>
              <div className={styles.progressDetails}>
                <div className={styles.known}>Known: {knownCount}</div>
                <div className={styles.stillLearning}>
                  Still learning: <span>{stillLearningCount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.studyButton}>
            <div className={styles.buttonIcon}>
              <img src="icons/flashcards.svg" alt="flascards" />
            </div>
            <div className={styles.buttonText}>Study flashcards</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetQuickReviewComponent;
