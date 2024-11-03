import React from 'react';
import globalStyles from '../styles.module.css';
import localStyles from './styles.module.css';

import { useTranslation } from 'react-i18next';
import { SaveNot } from 'components/UI/SaveNot';

const QuestionSetShare = (props) => {
  const { t } = useTranslation();

  return (
    <div className={`${globalStyles.container} ${localStyles.container}`}>
      <div className={globalStyles.header}>
        <div className={globalStyles.iconContainer}>
          <div className={globalStyles.icon}></div>
          <div className={` ${globalStyles.title} ${localStyles.title}`}>
            {props.title}
          </div>
        </div>
        <div className={` ${globalStyles.savedIcon} ${localStyles.savedIcon}`}>
          {typeof props.shared !== 'undefined' ? (
            <div className={globalStyles.visibilityContainer}>
              {props.shared === 'edit' ? (
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

        {typeof props.isLiked !== 'undefined' && (
          <div className={globalStyles.likeIcon}>
            <SaveNot
              state={props.isLiked}
              type="set"
              id={props.id}
              handleUnlikeSet={
                props.handleUnlikeSet ? props.handleUnlikeSet : undefined
              }
            />
          </div>
        )}
      </div>

      <div className={globalStyles.infoRow}>
        <div className={globalStyles.level}>
          <span className={globalStyles.bold}>{t('level')}:</span>
          {'     '}
          <span className={globalStyles.category}>{props.level}</span>
        </div>
        <div className={globalStyles.questionsCount}>
          <span>
            {props.questionsCount} {t('questions')}
          </span>
        </div>
      </div>

      <div className={globalStyles.categories}>
        <span className={globalStyles.bold}>{t('categories')}:</span>
        {props.categories.map((category, index) => (
          <span key={index} className={globalStyles.category}>
            {category}
          </span>
        ))}
      </div>

      <div className={`${globalStyles.footer} ${localStyles.footer}`}>
        <div className={` ${localStyles.usersInfo}`}>
          <div className={localStyles.username}>
            Author: {props.usernameAuthor}
          </div>
          <div className={` ${localStyles.username} ${localStyles.coauthors}`}>
            Co-authors ({props.coauthors.length}):{' '}
            {props.coauthors.map((coauthor, index) => (
              <span key={index}>
                {coauthor}
                {index < props.coauthors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
        <div className={globalStyles.date}>{props.date}</div>
      </div>
    </div>
  );
};

export default QuestionSetShare;
