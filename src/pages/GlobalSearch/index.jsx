import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import SearchComponent from 'components/UI/SearchComponent';
import { toast } from 'react-toastify';
import AllResultsSearch from 'components/UI/ForGlobalSearch/AllResultsSearch';
import QuestionSetsSearch from 'components/UI/ForGlobalSearch/QuestionSetsSearch';
import FooterComponent from 'components/UI/FooterComponent';
import ResourcesSearch from 'components/UI/ForGlobalSearch/ResourcesSearch';
import ModalPremium from './ModalPremium';
import UsersSearch from 'components/UI/ForGlobalSearch/UsersSeacrh';
import { useUser } from 'context/UserContext';
import { globalSearch } from 'api/apiGlobalSearch';
import { fetchSetById } from 'api/apiSet';
import { fetchResourceById } from 'api/apiResource';
import { getShortUserInfoById } from 'api/apiUser';
import { Spinner } from 'react-bootstrap';
import { fetchCategories, fetchLevels } from 'api/apiService';

const GlobalSearchPage = () => {
  const { t } = useTranslation();
  const { searchBy } = useParams();
  const navigate = useNavigate();
  const { isPremium } = useUser();

  const [activeTab, setActiveTab] = useState('allResults');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sets, setSets] = useState([]);
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Викликаємо fetchLevels із параметром пошуку
      const data = await globalSearch(searchBy);
      const { sets, resources, users } = data;

      // Обробка даних для sets
      const setsData = await Promise.all(
        sets.map(async (id) => {
          const setData = await fetchSetById(id);
          return setData.success !== false ? { ...setData, id } : null;
        })
      );
      setSets(setsData.filter(Boolean));

      // Обробка даних для resources
      const resourcesData = await Promise.all(
        resources.map(async (id) => {
          const resourceData = await fetchResourceById(id);
          return resourceData.success !== false
            ? { ...resourceData, id }
            : null;
        })
      );
      setResources(resourcesData.filter(Boolean));

      // Обробка даних для users
      const usersData = await Promise.all(
        users.map(async (id) => {
          const userData = await getShortUserInfoById(id);
          return userData.success !== false ? { ...userData } : null;
        })
      );
      setUsers(usersData.filter(Boolean));

      // Завантаження рівнів і категорій
      const fetchedLevels = await fetchLevels();
      const formattedLevels = fetchedLevels.map((level) => level.name);
      setLevels(formattedLevels);

      const fetchedCategories = await fetchCategories();
      const formattedCategories = fetchedCategories.map(
        (category) => category.name
      );
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error(t('Failed to load data. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchBy, t]);

  const handleTabClick = (tab) => {
    if (isPremium || tab === 'allResults') {
      setActiveTab(tab);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleViewAll = (type) => {
    if (!isPremium) {
      setIsModalOpen(true);
    } else {
      setActiveTab(type);
    }
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

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <HeaderComponent showSearch={true} showPlus={true} />
      <div className={styles.searchBlock}>
        <SearchComponent
          onClick={(term) => handleSearch(term)}
          placeholder={t('enter_your_request')}
        />
      </div>
      <div className={styles.searchPage}>
        <h1 className={styles.header}>{t('results_for', { searchBy })}</h1>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'allResults' ? styles.active : ''}`}
            onClick={() => handleTabClick('allResults')}
          >
            {t('allResults')}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'questionSets' ? styles.active : ''}`}
            onClick={() => handleTabClick('questionSets')}
          >
            {t('questionSets')}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'resources' ? styles.active : ''}`}
            onClick={() => handleTabClick('resources')}
          >
            {t('resources')}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
            onClick={() => handleTabClick('users')}
          >
            {t('users')}
          </div>
        </div>
        <div className={styles.tabContent}>
          {activeTab === 'allResults' ? (
            <AllResultsSearch
              sets={sets}
              resources={resources}
              users={users}
              handleViewAll={handleViewAll}
            />
          ) : activeTab === 'questionSets' ? (
            <QuestionSetsSearch
              sets={sets}
              levels={levels}
              categories={categories}
            />
          ) : activeTab === 'resources' ? (
            <ResourcesSearch
              resources={resources}
              levels={levels}
              categories={categories}
            />
          ) : activeTab === 'users' ? (
            <UsersSearch usersData={users} />
          ) : null}
        </div>
      </div>
      <div className={styles.footer}>
        <FooterComponent />
      </div>
      <ModalPremium
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={() => navigate('/lookPremium')}
        text={t('premium_message')}
      />
    </div>
  );
};

export default GlobalSearchPage;
