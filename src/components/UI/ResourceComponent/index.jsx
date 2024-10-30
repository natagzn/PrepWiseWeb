import React, { useState } from 'react';
import styles from './styles.module.css';
import LikeDislikeToggle from '../LikeDislike/LikeDislikeToggle';
import { useTranslation } from 'react-i18next';
import ReportComponent from '../ReportComponent';

function ResourceComponent(props) {
  const { t } = useTranslation();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Відкриття і закриття модального вікна репорта
  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

  // Забезпечуємо, що categories завжди буде масивом
  const categories = Array.isArray(props.categories) ? props.categories : [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.userIcon}></div>
            <div className={styles.username}>{props.username}</div>
          </div>
          {props.report ? (
            <button onClick={openReportModal} className={styles.iconButton}>
              <img
                src="/icons/ResourceComponent/report.svg"
                alt={t('report')}
                className={styles.icon}
              />
            </button>
          ) : (
            <img
              src="/icons/ResourceComponent/three-dots.svg"
              alt={t('options')}
              className={styles.icon}
            />
          )}
        </div>
        <div className={styles.categoryContainer}>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index} className={styles.categoryText}>
                {category}
              </div>
            ))
          ) : (
            <div className={styles.categoryText}>{t('without_category')}</div>
          )}
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
            <LikeDislikeToggle
              id={props.id}
              isLiked={props.isLiked}
              onRemove={props.onRemove}
            />
          </div>
        </div>
      </div>

      {/* Відображення модального вікна при відкритті */}
      {isReportModalOpen && (
        <ReportComponent type="resource" onClose={closeReportModal} />
      )}
    </div>
  );
}

export default ResourceComponent;
