import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import SearchComponent from '../../components/UI/SearchComponent';
import QuestionSetComponent from '../../components/UI/QuestionSetComponent';
import ResourceComponent from '../../components/UI/ResourceComponent';
import { useTranslation } from 'react-i18next';
import FooterComponent from 'components/UI/FooterComponent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import createPayment from 'context/createPayment';

const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const questionSets = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    questions: ['22222', '1211313', '2312323123'],
    categories: [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ],
    author: { username: 'User ' + (index + 1) },
    createdAt: '2024-10-19',
    level: { id: 1, name: 'Middle' },
    isFavourite: index % 2 === 0,
    access: true,
    name: 'Name of set ' + index,
  }));

  const resourceTitles = [
    'Book1 Author A.A.',
    'Book2 Author B.B.',
    'Article3 C.C.',
    'Book4 Author D.D.',
    'Book5 Author E.E.',
  ];

  const categories = ['Development', 'Design', 'Marketing', 'Science', 'Arts'];

  const resources = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    title: resourceTitles[index % resourceTitles.length],
    category: categories[index % categories.length],
    username: 'user' + index,
    date: '2024-10-19',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isLiked: index % 2 === 0,
  }));

  const [visibleItems, setVisibleItems] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);

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

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleQuestionScrollLeft = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.max(0, prevIndex - visibleItems)
    );
  };

  const handleQuestionScrollRight = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(questionSets.length - visibleItems, prevIndex + visibleItems)
    );
  };

  const handleResourceScrollLeft = () => {
    setCurrentResourceIndex((prevIndex) =>
      Math.max(0, prevIndex - visibleItems)
    );
  };

  const handleResourceScrollRight = () => {
    setCurrentResourceIndex((prevIndex) =>
      Math.min(resources.length - visibleItems, prevIndex + visibleItems)
    );
  };

  const handleSearch = (searchTerm) => {
    const invalidCharacters = /[\/\\.#?]/; // Регулярний вираз для символів "/", "\", ".", "#" і "?"

    if (searchTerm.trim() === '') {
      toast.error(t('enter_your_request'));
    } else if (invalidCharacters.test(searchTerm)) {
      toast.error(t('special_characters_not_allowed'));
    } else {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className={styles.mainPage}>
      <HeaderComponent showSearch={true} showPremium={true} showPlus={true} />
      <div className={styles.search}>
        <SearchComponent
          placeholder={t('enter_your_request')}
          onClick={handleSearch}
        />
      </div>

      <h2 className={styles.recommendationTitle}>
        {t('recommended_from_your_following')}
      </h2>

      {/*Сети*/}
      <div className={styles.questionSets}>
        <h2 className={styles.title}>{t('question_sets')}</h2>

        {questionSets.length > 0 ? (
          <div className={styles.carousel}>
            <button
              onClick={handleQuestionScrollLeft}
              className={styles.arrowLeft}
              disabled={currentQuestionIndex === 0}
            >
              &lt;
            </button>
            <div
              className={styles.questionSetContainer}
              style={{
                display: 'flex',
                transform: `translateX(-${currentQuestionIndex * (100 / visibleItems)}%)`,
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
                  <QuestionSetComponent
                    id={set.id}
                    name={set.name}
                    level={set.level}
                    categories={set.categories}
                    author={set.author}
                    createdAt={set.createdAt}
                    questions={set.questions}
                    access={set.access}
                    isFavourite={set.isFavourite}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleQuestionScrollRight}
              className={styles.arrowRight}
              disabled={
                currentQuestionIndex >= questionSets.length - visibleItems
              }
            >
              &gt;
            </button>
          </div>
        ) : (
          <p className={styles.notFound}>{t('no_question_sets_message')}</p>
        )}
      </div>

      {/*Ресурси*/}
      <div className={styles.resources}>
        <h2 className={styles.title}>{t('resources')}</h2>

        {resources.length > 0 ? (
          <div className={styles.carousel}>
            <button
              onClick={handleResourceScrollLeft}
              className={styles.arrowLeft}
              disabled={currentResourceIndex === 0}
            >
              &lt;
            </button>
            <div
              className={styles.resourceContainer}
              style={{
                display: 'flex',
                transform: `translateX(-${currentResourceIndex * (100 / visibleItems)}%)`,
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
                  <ResourceComponent
                    key={resource.id}
                    id={resource.id}
                    title={resource.title}
                    category={resource.category}
                    username={resource.username}
                    date={resource.date}
                    description={resource.description}
                    report={true}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleResourceScrollRight}
              className={styles.arrowRight}
              disabled={currentResourceIndex >= resources.length - visibleItems}
            >
              &gt;
            </button>
          </div>
        ) : (
          <p className={styles.notFound}>{t('no_resources_message')}</p>
        )}
      </div>
      <button onClick={() => createPayment(1)}>Оплатити 1 грн</button>

      <div className={styles.footer}>
        <FooterComponent />
      </div>
    </div>
  );
};

export default MainPage;
