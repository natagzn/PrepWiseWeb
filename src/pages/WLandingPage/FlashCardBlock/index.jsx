import React from 'react';
import styles from './styles.module.css';
import { motion } from 'framer-motion'; // імпортуємо motionimport { motion } from 'framer-motion'; // імпортуємо motion

const FlashcardBlock = ({ handleOnClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.textWrapper}>
          <div className={styles.header}>
            Memorize anything with free digital flashcards!
          </div>
          <div className={styles.description}>
            Research shows that self-testing using flashcards is more effective
            than re-reading notes. Find ready-made cards created by your
            colleagues or create your own instantly.
          </div>
          <motion.button
            className={styles.button}
            whileHover={{
              scale: 1.05, // Збільшення кнопки при наведенні
              backgroundColor: 'rgba(232, 211, 72, 0.8)', // Зміна кольору фону
            }}
            transition={{ duration: 0.2 }} // Час для ефекту
            onClick={handleOnClick}
          >
            Let’s start
          </motion.button>
        </div>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/img/flashcardLanding.png"
            alt="Placeholder"
          />
        </div>
      </div>
    </div>
  );
};

export default FlashcardBlock;
