import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import HeaderComponent from 'components/UI/HeaderComponent';
import FooterComponent from 'components/UI/FooterComponent';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutFooter from 'components/layout/LayoutFooter';

function ResultFlashcards() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    setId,
    stillLearningCount = 0,
    knowCount = 0,
    viewOrStudy,
    countAll = 0,
    setTitle,
    initialFlashcards,
  } = location.state || {};

  console.log('uiii', initialFlashcards);

  const setName = setTitle;
  const totalCount = stillLearningCount + knowCount;
  const knowPercentage =
    viewOrStudy === 'study'
      ? totalCount > 0
        ? (knowCount / totalCount) * 100
        : 0
      : 100;

  const phrases = {
    low: [
      t('phrases.low.0'),
      t('phrases.low.1'),
      t('phrases.low.2'),
      t('phrases.low.3'),
      t('phrases.low.4'),
    ],
    medium: [
      t('phrases.medium.0'),
      t('phrases.medium.1'),
      t('phrases.medium.2'),
      t('phrases.medium.3'),
      t('phrases.medium.4'),
      t('phrases.medium.5'),
      t('phrases.medium.6'),
      t('phrases.medium.7'),
      t('phrases.medium.8'),
      t('phrases.medium.9'),
    ],
    high: [
      t('phrases.high.0'),
      t('phrases.high.1'),
      t('phrases.high.2'),
      t('phrases.high.3'),
      t('phrases.high.4'),
      t('phrases.high.5'),
      t('phrases.high.6'),
    ],
  };

  const getRandomComment = (percentage) => {
    if (percentage < 30) {
      return phrases.low[Math.floor(Math.random() * phrases.low.length)];
    } else if (percentage >= 30 && percentage < 80) {
      return phrases.medium[Math.floor(Math.random() * phrases.medium.length)];
    } else {
      return phrases.high[Math.floor(Math.random() * phrases.high.length)];
    }
  };

  const comment = getRandomComment(knowPercentage);

  const handleRestart = () => {
    if (viewOrStudy === 'study' && stillLearningCount === 0) {
      toast.info(t('result flashcards - know all'), { autoClose: 5000 });
      return;
    }
    navigate(`/flashcards`, {
      state: {
        viewOrStudy: viewOrStudy,
        setId: setId,
        initialFlashcards: initialFlashcards,
        setTitle: setTitle,
      },
    });
  };

  const handleReturnToSet = () => {
    navigate(`/lookSet/${setId}`);
  };

  return (
    <LayoutFooter showPlus={true} showSearch={true}>
      <div className={styles.contentWrapper}>
        <div className={styles.infoBlock}>
          <h2 className={styles.setTitle}>{setName}</h2>
          <div className={styles.questionCount}>
            {totalCount !== 0
              ? `${totalCount} / ${totalCount}`
              : `${countAll} / ${countAll}`}
          </div>
        </div>
        <div className={styles.comment}>{comment}</div>
        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <div className={styles.commentColumn}>{t('progressHeader')}</div>
            <div className={styles.progressInfo}>
              <div className={styles.circularChart}>
                <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#FF9900"
                    strokeWidth="20"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#31A659"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${knowPercentage * 5.65} ${564.48}`}
                    transform="rotate(-90 100 100)"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={styles.progressPercent}
                    fill="#000000"
                  >
                    {knowPercentage.toFixed(0)}%
                  </text>
                </svg>
              </div>
              <div className={styles.progressDetails}>
                <div className={styles.know}>
                  <span className={styles.label}>
                    {viewOrStudy === 'study'
                      ? t('knowLabel')
                      : t('completedLabel')}
                  </span>
                  <span className={styles.count}>
                    {countAll !== 0 ? countAll : knowCount}
                  </span>
                </div>
                {viewOrStudy === 'study' && (
                  <div className={styles.stillLearning}>
                    <span className={styles.label}>
                      {t('stillLearningLabel')}
                    </span>
                    <span className={styles.count}>{stillLearningCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.commentColumn}>{t('nextStepsHeader')}</div>
            <div className={styles.buttonContainer}>
              <button
                className={`${styles.button} ${styles.restart}`}
                onClick={handleRestart}
              >
                {t('restartButton')}
              </button>
              <button
                className={`${styles.button} ${styles.return}`}
                onClick={handleReturnToSet}
              >
                {t('returnButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutFooter>
  );
}

export default ResultFlashcards;
