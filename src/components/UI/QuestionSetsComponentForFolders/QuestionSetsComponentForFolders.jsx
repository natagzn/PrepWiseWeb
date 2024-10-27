import React from 'react';
import styles from './QuestionSetsComponentForFolders.module.css';
import iconSet from './iconSet.svg';
import iconAdd from './iconAdd.svg';
import iconAdded from './iconAdded.svg';
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
        <img src={iconSet} alt="iconSet" className={styles.setIcon} />
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
            src={isAdded ? iconAdded : iconAdd}
            alt={isAdded ? 'added' : 'add'}
            className={styles.actionIcon}
          />
        )}
      </motion.div>
    </div>
  );
};

export default QuestionSetsComponentForFolders;
