import React from 'react';
import styles from './styles.module.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const QuestionSetsComponentForFolders = ({
  name,
  questionCount,
  author,
  isAdded,
  link,
  onToggle,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <img
          src="/icons/iconSet.svg"
          alt="iconSet"
          className={styles.setIcon}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.setName}>{name}</div>
        <div className={styles.infoContainer}>
          <div className={styles.questionCount}>
            {questionCount} {t('questions')}
          </div>
        </div>
      </div>
      <motion.div
        className={styles.addedIcon}
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {typeof isAdded !== 'undefined' && (
          <img
            src={
              isAdded
                ? '/icons/QuestionSetsComponentForFolders/iconAdded.svg'
                : '/icons/QuestionSetsComponentForFolders/iconAdd.svg'
            }
            alt={isAdded ? 'added' : 'add'}
            className={styles.actionIcon}
          />
        )}
      </motion.div>
    </div>
  );
};

export default QuestionSetsComponentForFolders;
