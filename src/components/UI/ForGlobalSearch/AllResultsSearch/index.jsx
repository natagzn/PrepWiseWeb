import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import QuestionSetComponent from 'components/UI/QuestionSetComponent';
import ResourceComponent from 'components/UI/ResourceComponent';
import UserComponentForSearch from 'components/UI/UserComponentForSearch'; // імпорт компоненту
import { useTranslation } from 'react-i18next';

const AllResultsSearch = ({ isPremium, handleViewAll }) => {
  const { t } = useTranslation();

  // Приклад даних для наборів питань
  const questionSets = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    questionsCount: 10,
    categories: ['Category 1', 'Category 2'],
    username: 'User ' + (index + 1),
    date: '2024-10-19',
    level: 'Easy',
    isLiked: index % 2 === 0,
    visibility: 'Public',
    title: 'Name of set ' + index,
  }));

  // Приклад даних для ресурсів
  const resources = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    title: `Resource Title ${index + 1}`,
    category: `Category ${index + 1}`,
    username: `User ${index + 1}`,
    date: '2024-10-19',
    description: 'Lorem ipsum dolor sit amet.',
    isLiked: index % 2 === 0,
  }));

  // Приклад даних для користувачів
  const users = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    username: `User ${index + 1}`,
    setsCount: index * 2 + 1, // наприклад, кількість сетів
    resourcesCount: index + 1, // кількість ресурсів
    profileImage: 'https://via.placeholder.com/65', // зображення користувача
  }));

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
        {resources.length === 0 ? (
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
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  style={{
                    flex: `0 0 ${100 / visibleItems}%`,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ResourceComponent {...resource} />
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                handleScrollRight(
                  setCurrentResourceIndex,
                  currentResourceIndex,
                  resources.length
                )
              }
              className={styles.arrowRight}
              disabled={currentResourceIndex >= resources.length - visibleItems}
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
        {users.length === 0 ? (
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
              {users.map((user) => (
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
                  users.length
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
