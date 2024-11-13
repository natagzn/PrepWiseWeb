import React from 'react';
import styles from './styles.module.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'components/formatDate';

const QuestionSetsComponentForFolders = ({
  name,
  questionCount,
  author,
  isAdded,
  link,
  onToggle,
  date,
  id,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formattedDate = formatDate(date);

  const handleNavigate = () => {
    if (link) {
      navigate(`/lookSet/${id}`);
    }
  };

  return (
    <div
      className={`${styles.container} ${link ? styles.clickable : ''}`} // Додаємо клас "clickable" при наявності link
      onClick={handleNavigate} // Додаємо onClick лише якщо є link
    >
      <div className={styles.iconContainer}>
        <img
          src="/icons/QuestionSetsComponentForFolders/iconSet.svg"
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
      <div className={styles.rightContainer}>
        <div className={styles.date}>{formattedDate}</div>
        {typeof isAdded !== 'undefined' && (
          <motion.div
            className={styles.addedIcon}
            onClick={(e) => {
              e.stopPropagation(); // Запобігаємо переходу при натисканні на кнопку
              onToggle();
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src={
                isAdded
                  ? '/icons/QuestionSetsComponentForFolders/iconAdded.svg'
                  : '/icons/QuestionSetsComponentForFolders/iconAdd.svg'
              }
              alt={isAdded ? 'added' : 'add'}
              className={styles.actionIcon}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionSetsComponentForFolders;
