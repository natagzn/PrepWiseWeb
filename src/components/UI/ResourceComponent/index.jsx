import React, { useState } from 'react';
import styles from './styles.module.css';
import LikeDislikeToggle from '../LikeDislike/LikeDislikeToggle';
import { useTranslation } from 'react-i18next';
import ReportComponent from '../ReportComponent';
import ResourceMenu from './ResourceMenu';

function ResourceComponent(props) {
  const { t } = useTranslation();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

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
            <div className={styles.icon}>
              <ResourceMenu id={props.id} onRemove={props.onRemove} />
            </div>
          )}
        </div>
        <div className={styles.categoryContainer}>
          {props.category ? (
            <div className={styles.categoryText}>{props.category}</div>
          ) : (
            <div className={styles.categoryText}>{t('without_category')}</div>
          )}
          {props.level ? (
            <div className={styles.categoryText}>{props.level}</div>
          ) : (
            <div className={styles.categoryText}>{t('without_level')}</div>
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
              likes={props.likes}
              dislikes={props.dislikes}
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
