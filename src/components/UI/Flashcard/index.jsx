import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const Flashcard = ({ flashcard, flip }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Скидання перевертання при зміні картки
  useEffect(() => {
    setIsFlipped(false);
  }, [flashcard.question_id]);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
      onClick={handleCardClick}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          {flip ? (
            <p className={styles.answer}>{flashcard.answer}</p>
          ) : (
            <p className={styles.question}>{flashcard.content}</p>
          )}
        </div>
        <div className={styles.cardBack}>
          {flip ? (
            <p className={styles.content}>{flashcard.content}</p>
          ) : (
            <p className={styles.question}>{flashcard.answer}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
