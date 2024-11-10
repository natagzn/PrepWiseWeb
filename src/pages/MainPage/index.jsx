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
import { getIdsForHomePage } from 'api/apiHome';
import { fetchSetById } from 'api/apiSet';
import { fetchResourceById } from 'api/apiResource';
import { Spinner } from 'react-bootstrap';

const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [questionSets, setQuestionSets] = useState();
  const [resources, setResources] = useState();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const data = await getIdsForHomePage();
        console.log('Fetched IDs:', data);

        // Завантаження даних для кожного набору питань
        const setsData = await Promise.all(
          data.sets.map(async (id) => {
            const setData = await fetchSetById(id);
            setData.id = id;
            return setData.success !== false ? setData : null; // Фільтруємо невдалі запити
          })
        );
        setQuestionSets(setsData.filter((set) => set !== null));

        // Завантаження даних для кожного ресурсу
        const resourcesData = await Promise.all(
          data.resources.map(async (id) => {
            const resourceData = await fetchResourceById(id);
            resourceData.id = id;
            return resourceData.success !== false ? resourceData : null;
          })
        );
        setResources(resourcesData.filter((resource) => resource !== null));
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error(t('Failed to load data. Please try again.'));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [t]);

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
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <HeaderComponent
            showSearch={true}
            showPremium={true}
            showPlus={true}
          />
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
            {questionSets && questionSets.length > 0 ? (
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
                    justifyContent: 'space-around',
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
                        name={set.name}
                        categories={set.categories}
                        author={set.author}
                        createdAt={set.createdAt}
                        level={set.level}
                        isFavourite={set.isFavourite}
                        access={set.access}
                        style={{ width: '500px' }}
                        id={set.id}
                        questions={set.questions}
                        key={set.id}
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
            {resources && resources.length > 0 ? (
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
                    justifyContent: 'space-around',
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
                        isLiked={resource.isLiked}
                        level={resource.level}
                        likes={resource.likes}
                        dislikes={resource.dislikes}
                        report={true}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleResourceScrollRight}
                  className={styles.arrowRight}
                  disabled={
                    currentResourceIndex >= resources.length - visibleItems
                  }
                >
                  &gt;
                </button>
              </div>
            ) : (
              <p className={styles.notFound}>{t('no_resources_message')}</p>
            )}
          </div>
          {/*<button onClick={() => createPayment(1)}>Оплатити 1 грн</button>*/}

          <div className={styles.footer}>
            <FooterComponent />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
