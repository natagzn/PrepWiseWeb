import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

function SetQuickReviewComponent({ questionsAnswers, setId, isAuthor }) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const knownCount = questionsAnswers.filter((q) => q.status === 'know').length;
  const stillLearningCount = questionsAnswers.filter(
    (q) => q.status === 'stilllearning'
  ).length;
  const totalCount = knownCount + stillLearningCount;

  const knownPercentage = totalCount ? (knownCount / totalCount) * 100 : 0;

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questionsAnswers.length);
  };

  const prevQuestion = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + questionsAnswers.length) % questionsAnswers.length
    );
  };

  const handleFlashcards = () => {
    // Використання navigate для перенаправлення на сторінку Flashcards
    navigate('/flashcards', { state: { setId, isAuthor } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderHeader}>{t('quickReviewTitle')}</div>
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

        <div className={styles.progressContainer}>
          <div className={styles.progressBlock}>
            <div className={styles.progressTitle}>{t('progressTitle')}</div>
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
                <div className={styles.known}>
                  {t('known')}: {knownCount}
                </div>
                <div className={styles.stillLearning}>
                  {t('stillLearning')}: <span>{stillLearningCount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.studyButton} onClick={handleFlashcards}>
            <div className={styles.buttonIcon}>
              <img src="icons/flashcards.svg" alt="flashcards" />
            </div>
            <div className={styles.buttonText}>{t('studyFlashcards')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetQuickReviewComponent;
