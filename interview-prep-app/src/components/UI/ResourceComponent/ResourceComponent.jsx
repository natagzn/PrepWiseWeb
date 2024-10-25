import React from 'react';
import styles from './ResourceComponent.module.css';
import LikeDislikeToggle from '../LikeDislike/LikeDislikeToggle';
import ReportIcon from './report.svg'; // Змініть на свій шлях до іконки
import ThreeDotsIcon from './three-dots.svg'; // Додайте іконку для трьох крапок
import { useTranslation } from 'react-i18next'; // Імпортуємо useTranslation

function ResourceComponent(props) {
  const { t } = useTranslation(); // Отримуємо функцію t для перекладів

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.userIcon}></div>
            <div className={styles.username}>{props.username}</div>
          </div>
          {props.report ? (
            <img src={ReportIcon} alt={t('report')} className={styles.icon} />
          ) : (
            <img
              src={ThreeDotsIcon}
              alt={t('options')}
              className={styles.icon}
            />
          )}
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.articleLabel}>{t('category')}:</div>
          <div className={styles.categoryText}>
            {props.category || t('without_category')}
          </div>
        </div>
        <div className={styles.articleInfo}>
          <div className={styles.articleLabel}>{t('article_book')}:</div>
          <div className={styles.articleTitle}>{props.title}</div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionLabel}>{t('description')}:</div>
          <div className={styles.descriptionText}>{props.description}</div>
        </div>
        <div className={styles.dateLikesContainer}>
          <div className={styles.date}>{props.date}</div>
          <div className={styles.likesContainer}>
            <LikeDislikeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceComponent;
