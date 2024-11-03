import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { SaveNot } from 'components/UI/SaveNot';
import SetMenu from '../SetMenu';

const SetInfoComponent = (props) => {
  const {
    title,
    author,
    questionCount,
    level,
    categories,
    visibility,
    isLiked,
    id,
  } = props;

  const { t } = useTranslation();
  const date = '2024-10-10';

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.optionsContainer}>
            <div className={styles.likeIcon}>
              <SaveNot state={isLiked} type="set" id={props.id} />
            </div>
            <div className={styles.visibilityContainer}>
              {visibility ? (
                <>
                  <img
                    src={
                      visibility === 'Public'
                        ? '/icons/public.svg'
                        : '/icons/private.svg'
                    }
                    alt={visibility}
                    className={styles.visibilityIcon}
                  />
                  <span className={styles.visibilityInfo}>{visibility}</span>
                </>
              ) : (
                <span className={styles.visibilityInfo}>
                  {t('not_specified')}
                </span>
              )}
            </div>
            <div className={styles.optionsIcon}>
              <SetMenu />
            </div>
          </div>
        </div>

        <div className={styles.authorRow}>
          <span>{author}</span>
          <span className={styles.separator}>|</span>
          <span>
            {questionCount} {t('questions')}
          </span>
          <span className={styles.separator}>|</span>
          <span>{date}</span>
        </div>

        <div className={styles.level}>
          <span className={styles.bold}>{t('level')}:</span>{' '}
          <span className={styles.category}>{level}</span>
        </div>

        <div className={styles.categories}>
          <span className={styles.bold}>{t('categories')}:</span>
          {categories.map((category, index) => (
            <span key={index} className={styles.category}>
              {category}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SetInfoComponent;
