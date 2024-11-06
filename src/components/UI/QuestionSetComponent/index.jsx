import React from 'react';
import styles from './styles.module.css';
import { SaveNot } from '../SaveNot';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const QuestionSetComponent = ({
  id,
  name,
  level,
  categories,
  author,
  createdAt,
  questions,
  access,
  isFavourite,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // return (
  //     <div className={styles.container}>
  //       {/* Заголовок */}
  //       <div className={styles.header}>
  //         <div className={styles.iconContainer}>
  //           <div className={styles.icon}></div>
  //           <div className={styles.title}>{props.title}</div>
  //         </div>
  //         <div className={styles.savedIcon}>
  //           {/* Відображення статусу public/private */}
  //           {typeof props.visibility !== 'undefined' ? (
  //             <div className={styles.visibilityContainer}>
  //               {props.visibility === 'Public' ? (
  //                 <>
  //                   <img
  //                     src="/icons/QuestionSetComponent/public-icon.svg"
  //                     alt={t('public')}
  //                     className={styles.visibilityIcon}
  //                   />
  //                   <span className={styles.visibilityInfo}>{t('public')}</span>
  //                 </>
  //               ) : (
  //                 <>
  //                   <img
  //                     src="/icons/QuestionSetComponent/private-icon.svg"
  //                     alt={t('private')}
  //                     className={styles.visibilityIcon}
  //                   />
  //                   <span className={styles.visibilityInfo}>{t('private')}</span>
  //                 </>
  //               )}
  //             </div>
  //           ) : (
  //             <span className={styles.visibilityInfo}>{t('not_specified')}</span>
  //           )}
  //         </div>

  //         {/* Іконка лайку, якщо є */}
  //         {typeof props.isLiked !== 'undefined' && (
  //           <div className={styles.likeIcon}>
  //             <SaveNot
  //               state={props.isLiked}
  //               type="set"
  //               id={props.id}
  //               handleUnlikeSet={
  //                 props.handleUnlikeSet ? props.handleUnlikeSet : undefined
  //               }
  //             />
  //           </div>
  //         )}
  //       </div>

  //       {/* Рядок для рівня та кількості запитань */}
  //       <div className={styles.infoRow}>
  //         <div className={styles.level}>
  //           <span className={styles.bold}>{t('level')}:</span>
  //           {'     '}
  //           <span className={styles.category}>{props.level}</span>
  //         </div>
  //         <div className={styles.questionsCount}>
  //           <span>
  //             {props.questionsCount} {t('questions')}
  //           </span>
  //         </div>
  //       </div>

  //       {/* Рядок для категорій */}
  //       <div className={styles.categories}>
  //         <span className={styles.bold}>{t('categories')}:</span>
  //         {props.categories.map((category, index) => (
  //           <span key={index} className={styles.category}>
  //             {category}
  //           </span>
  //         ))}
  //       </div>

  //       {/* Інформація про користувача */}
  //       <div className={styles.footer}>
  //         <div className={styles.userInfo}>
  //           <div className={styles.userIcon}></div>
  //           <div className={styles.username}>{props.username}</div>
  //         </div>
  //         <div className={styles.date}>{props.date}</div>
  //       </div>
  //     </div>
  // );

  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate(`/lookSet/${id}`);
      }}
    >
      {/* Заголовок */}
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}></div>
          <div className={styles.title}>{name}</div>
        </div>
        <div className={styles.savedIcon}>
          {/* Відображення статусу public/private */}
          <div className={styles.visibilityContainer}>
            {access ? (
              <>
                <img
                  src="/icons/QuestionSetComponent/public-icon.svg"
                  alt={t('public')}
                  className={styles.visibilityIcon}
                />
                <span className={styles.visibilityInfo}>{t('public')}</span>
              </>
            ) : (
              <>
                <img
                  src="/icons/QuestionSetComponent/private-icon.svg"
                  alt={t('private')}
                  className={styles.visibilityIcon}
                />
                <span className={styles.visibilityInfo}>{t('private')}</span>
              </>
            )}
          </div>
        </div>

        {/* Іконка лайку, якщо є */}
        {typeof isFavourite !== 'undefined' && (
          <div
            className={styles.likeIcon}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <SaveNot state={isFavourite} type="set" id={id} />
          </div>
        )}
      </div>

      {/* Рядок для рівня та кількості запитань */}
      <div className={styles.infoRow}>
        <div className={styles.level}>
          <span className={styles.bold}>{t('level')}:</span>
          {'     '}
          <span className={styles.category}>{level.name}</span>
        </div>
        <div className={styles.questionsCount}>
          <span>
            {questions.length} {t('questions')}
          </span>
        </div>
      </div>

      {/* Рядок для категорій */}
      <div className={styles.categories}>
        <span className={styles.bold}>{t('categories')}:</span>
        {categories.map((category, index) => (
          <span key={index} className={styles.category}>
            {category.name}
          </span>
        ))}
      </div>

      {/* Інформація про користувача */}
      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <div className={styles.userIcon}></div>
          <div className={styles.username}>{author.username}</div>
        </div>
        <div className={styles.date}>{createdAt.slice(0, 10)}</div>
      </div>
    </div>
  );
};

export default QuestionSetComponent;
