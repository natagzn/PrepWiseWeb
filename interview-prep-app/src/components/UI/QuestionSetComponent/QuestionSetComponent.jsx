import React from 'react';
import styles from './QuestionSetComponent.module.css'; // Замініть на ваш шлях до стилів
import { SaveNot } from '../SaveNot/SaveNot';

// Іконки для видимості
import PublicIcon from './public-icon.svg'; // Змініть на свій шлях до іконки
import PrivateIcon from './private-icon.svg'; // Змініть на свій шлях до іконки
import { useTranslation } from 'react-i18next'; // Імпортуємо useTranslation

const QuestionSetComponent = (props) => {
  const { t } = useTranslation(); // Отримуємо функцію t для перекладів

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}></div>
          <div className={styles.title}>{props.title}</div>
        </div>
        <div className={styles.savedIcon}>
          {/* Відображення статусу public/private */}
          {typeof props.visibility !== 'undefined' ? (
            <div className={styles.visibilityContainer}>
              {props.visibility === 'Public' ? (
                <>
                  <img
                    src={PublicIcon}
                    alt={t('public')}
                    className={styles.visibilityIcon}
                  />
                  <span className={styles.visibilityInfo}>{t('public')}</span>
                </>
              ) : (
                <>
                  <img
                    src={PrivateIcon}
                    alt={t('private')}
                    className={styles.visibilityIcon}
                  />
                  <span className={styles.visibilityInfo}>{t('private')}</span>
                </>
              )}
            </div>
          ) : (
            <span className={styles.visibilityInfo}>{t('not_specified')}</span> // або нічого не відображати
          )}
        </div>

        {/* Іконка лайку, якщо є */}
        {typeof props.isLiked !== 'undefined' && (
          <div className={styles.likeIcon}>
            <SaveNot state={props.isLiked} />
          </div>
        )}
      </div>

      {/* Рядок для рівня та кількості запитань */}
      <div className={styles.infoRow}>
        <div className={styles.level}>
          <span className={styles.bold}>{t('level')}:</span>
          {'     '}
          <span className={styles.category}>{props.level}</span>
        </div>
        <div className={styles.questionsCount}>
          <span>
            {props.questionsCount} {t('questions')}
          </span>
        </div>
      </div>

      {/* Рядок для категорій */}
      <div className={styles.categories}>
        <span className={styles.bold}>{t('categories')}:</span>
        {props.categories.map((category, index) => (
          <span key={index} className={styles.category}>
            {category}
          </span>
        ))}
      </div>

      {/* Інформація про користувача */}
      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <div className={styles.userIcon}></div>
          <div className={styles.username}>{props.username}</div>
        </div>
        <div className={styles.date}>{props.date}</div>
      </div>
    </div>
  );
};

export default QuestionSetComponent;
