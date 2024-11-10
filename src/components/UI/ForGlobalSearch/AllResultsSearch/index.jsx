import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import QuestionSetComponent from 'components/UI/QuestionSetComponent';
import ResourceComponent from 'components/UI/ResourceComponent';
import UserComponentForSearch from 'components/UI/UserComponentForSearch'; // імпорт компоненту
import { useTranslation } from 'react-i18next';

const AllResultsSearch = ({
  isPremium,
  handleViewAll,
  sets,
  resources,
  users,
}) => {
  const { t } = useTranslation();
  const questionSets = sets.slice(0, 3);
  const resourcesShow = resources.slice(0, 3);
  const usersShow = users.slice(0, 3);

  const [visibleItems, setVisibleItems] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1310) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize(); // Встановити початкову кількість видимих елементів
    window.addEventListener('resize', handleResize); // Оновлення при зміні розміру

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollLeft = (setter, currentIndex) => {
    setter(Math.max(0, currentIndex - 1));
  };

  const handleScrollRight = (setter, currentIndex, dataLength) => {
    setter(Math.min(dataLength - visibleItems, currentIndex + 1));
  };

  return (
    <div className={styles.globalSearchBlock}>
      {/* Блок з наборами питань */}
      <div className={styles.blockSearch}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>{t('question_sets')}</h2>
          <div
            className={styles.viewAll}
            onClick={() => handleViewAll('questionSets')}
          >
            {t('View all')}
          </div>
        </div>
        {questionSets.length === 0 ? (
          <div className="noResultsMessage">
            {t('no_question_sets_message_search')}
          </div>
        ) : (
          <div className={styles.carousel}>
            <button
              onClick={() =>
                handleScrollLeft(setCurrentQuestionIndex, currentQuestionIndex)
              }
              className={styles.arrowLeft}
              disabled={currentQuestionIndex === 0}
            >
              &lt;
            </button>
            <div
              className={styles.container}
              style={{
                display: 'flex',
                transform: `translateX(-${currentQuestionIndex * (100 / visibleItems)}%)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {questionSets.map((set) => (
                <div
                  key={set.id}
                  style={{
                    flex: `0 0 ${100 / visibleItems}%`,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <QuestionSetComponent {...set} />
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                handleScrollRight(
                  setCurrentQuestionIndex,
                  currentQuestionIndex,
                  questionSets.length
                )
              }
              className={styles.arrowRight}
              disabled={
                currentQuestionIndex >= questionSets.length - visibleItems
              }
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* Блок з ресурсами */}
      <div className={styles.blockSearch}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>{t('resources')}</h2>
          <div
            className={styles.viewAll}
            onClick={() => handleViewAll('resources')}
          >
            {t('View all')}
          </div>
        </div>
        {resourcesShow.length === 0 ? (
          <div className="noResultsMessage">
            {t('no_resources_message_search')}
          </div>
        ) : (
          <div className={styles.carousel}>
            <button
              onClick={() =>
                handleScrollLeft(setCurrentResourceIndex, currentResourceIndex)
              }
              className={styles.arrowLeft}
              disabled={currentResourceIndex === 0}
            >
              &lt;
            </button>
            <div
              className={styles.container}
              style={{
                display: 'flex',
                transform: `translateX(-${currentResourceIndex * (100 / visibleItems)}%)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {resourcesShow.map((resource) => (
                <div
                  key={resource.id}
                  style={{
                    flex: `0 0 ${100 / visibleItems}%`,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ResourceComponent {...resource} report={true} />
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                handleScrollRight(
                  setCurrentResourceIndex,
                  currentResourceIndex,
                  resourcesShow.length
                )
              }
              className={styles.arrowRight}
              disabled={
                currentResourceIndex >= resourcesShow.length - visibleItems
              }
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      {/* Блок з користувачами */}
      <div className={styles.blockSearch}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>{t('users')}</h2>
          <div
            className={styles.viewAll}
            onClick={() => handleViewAll('users')}
          >
            {t('View all')}
          </div>
        </div>
        {usersShow.length === 0 ? (
          <div className="noResultsMessage">{t('no_users_message_search')}</div>
        ) : (
          <div className={styles.carousel}>
            <button
              onClick={() =>
                handleScrollLeft(setCurrentUserIndex, currentUserIndex)
              }
              className={styles.arrowLeft}
              disabled={currentUserIndex === 0}
            >
              &lt;
            </button>
            <div
              className={styles.container}
              style={{
                display: 'flex',
                transform: `translateX(-${currentUserIndex * (100 / visibleItems)}%)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {usersShow.map((user) => (
                <div
                  key={user.id}
                  style={{
                    flex: `0 0 ${100 / visibleItems}%`,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <UserComponentForSearch {...user} />
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                handleScrollRight(
                  setCurrentUserIndex,
                  currentUserIndex,
                  usersShow.length
                )
              }
              className={styles.arrowRight}
              disabled={currentUserIndex >= users.length - visibleItems}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllResultsSearch;
