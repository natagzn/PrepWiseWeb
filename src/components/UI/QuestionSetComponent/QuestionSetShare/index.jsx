import React from 'react';
import globalStyles from '../styles.module.css';
import localStyles from './styles.module.css';

import { useTranslation } from 'react-i18next';
import { SaveNot } from 'components/UI/SaveNot';
import { formatDate } from 'components/formatDate';
import { useNavigate } from 'react-router-dom';

const QuestionSetShare = ({
  name,
  categories,
  author,
  createdAt,
  level,
  isFavourite,
  access,
  id,
  questions,
  usernameAuthor,
  coauthors,
  editPermission,
  shared,
}) => {
  const { t } = useTranslation();

  console.log(
    'QSS',
    name,
    categories,
    author,
    createdAt,
    level,
    isFavourite,
    access,
    id,
    questions,
    usernameAuthor,
    coauthors,
    editPermission,
    shared
  );

  const navigate = useNavigate();
  //const date = formatDate(createdAt.slice(0, 10));
  const date =
    createdAt && typeof createdAt === 'string' ? createdAt.slice(0, 10) : '';

  const handleClick = (e) => {
    // Перевіряємо, чи не було кліку на SaveNot
    if (!e.target.closest('.saveNot')) {
      navigate(`/lookSet/${id}`);
    }
  };

  return (
    <div
      className={`${globalStyles.container} ${localStyles.container}`}
      onClick={handleClick}
    >
      <div className={globalStyles.header}>
        <div className={globalStyles.iconContainer}>
          <div className={globalStyles.icon}></div>
          <div className={` ${globalStyles.title} ${localStyles.title}`}>
            {name}
          </div>
        </div>
        <div className={` ${globalStyles.savedIcon} ${localStyles.savedIcon}`}>
          {typeof shared !== 'undefined' ? (
            <div className={globalStyles.visibilityContainer}>
              {editPermission === true ? (
                <>
                  <img
                    src="/icons/shareForPeople.svg"
                    alt={t('sharedForEdit')}
                    className={globalStyles.visibilityIcon}
                  />
                  <span className={globalStyles.visibilityInfo}>
                    {t('Shared/edit')}
                  </span>
                </>
              ) : (
                <>
                  <img
                    src="/icons/shareForPeople.svg"
                    alt={t('sharedForView')}
                    className={globalStyles.visibilityIcon}
                  />
                  <span className={globalStyles.visibilityInfo}>
                    {t('Shared/view')}
                  </span>
                </>
              )}
            </div>
          ) : (
            <>
              <img
                src="/icons/shareForPeople.svg"
                alt={t('sharing')}
                className={globalStyles.visibilityIcon}
              />
              <span className={globalStyles.visibilityInfo}>
                {t('Sharing')}
              </span>
            </>
          )}
        </div>

        {typeof isFavourite !== 'undefined' && (
          <div className={globalStyles.likeIcon}>
            <SaveNot state={isFavourite} type="set" id={id} />
          </div>
        )}
      </div>

      <div className={globalStyles.infoRow}>
        <div className={globalStyles.level}>
          <span className={globalStyles.bold}>{t('level')}:</span>
          {'     '}
          <span className={globalStyles.category}>{level.name}</span>
        </div>
        <div className={globalStyles.questionsCount}>
          <span>
            {questions.length} {t('questions')}
          </span>
        </div>
      </div>

      <div className={globalStyles.categories}>
        <span className={globalStyles.bold}>{t('categories')}:</span>
        {categories.map((category, index) => (
          <span key={index} className={globalStyles.category}>
            {category.name}
          </span>
        ))}
      </div>

      <div className={`${globalStyles.footer} ${localStyles.footer}`}>
        <div className={` ${localStyles.usersInfo}`}>
          <div className={localStyles.username}>Author: {author.username}</div>
          <div className={` ${localStyles.username} ${localStyles.coauthors}`}>
            Co-authors ({coauthors.length}):{' '}
            {coauthors.map((coauthor, index) => (
              <span key={index}>
                {coauthor.username}
                {index < coauthors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
        <div className={globalStyles.date}>{date}</div>
      </div>
    </div>
  );
};

export default QuestionSetShare;
