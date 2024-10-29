import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import HeaderComponent from 'components/UI/HeaderComponent';
import FooterComponent from 'components/UI/FooterComponent';

function ResultFlashcards() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setId, stillLearningCount = 0, knowCount = 0 } = location.state || {};

  const setName = `Set Name for ID: ${setId}`;
  const totalCount = stillLearningCount + knowCount;
  const knowPercentage = totalCount > 0 ? (knowCount / totalCount) * 100 : 0;

  const handleRestart = () => {
    navigate(`/flashcards`);
  };

  const handleReturnToSet = () => {
    navigate(`/lookSet`);
  };

  return (
    <div className={styles.resultContainer}>
      <HeaderComponent />
      <div className={styles.contentWrapper}>
        <div className={styles.infoBlock}>
          <h2 className={styles.setTitle}>{setName}</h2>
          <div
            className={styles.questionCount}
          >{`${totalCount} / ${totalCount}`}</div>
        </div>
        <div className={styles.comment}>
          You're crushing it! Don't stop now.
        </div>
        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <div className={styles.commentColumn}>How you're doing:</div>
            <div className={styles.progressInfo}>
              <div className={styles.circularChart}>
                <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#c36c02"
                    strokeWidth="20"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#265828"
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
                    fill="rgba(90, 90, 90, 1)" // Використання rgba для кольору
                  >
                    {knowPercentage.toFixed(0)}%
                  </text>
                </svg>
              </div>
              <div className={styles.progressDetails}>
                <div className={styles.know}>
                  <span className={styles.label}>Know</span>
                  <span className={styles.count}>{knowCount}</span>
                </div>
                <div className={styles.stillLearning}>
                  <span className={styles.label}>Still learning</span>
                  <span className={styles.count}>{stillLearningCount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.commentColumn}>Next steps:</div>
            <div className={styles.buttonContainer}>
              <button
                className={`${styles.button} ${styles.restart}`}
                onClick={handleRestart}
              >
                Restart Flashcards
              </button>
              <button
                className={`${styles.button} ${styles.return}`}
                onClick={handleReturnToSet}
              >
                Return to Set
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default ResultFlashcards;
