import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import { useTranslation } from 'react-i18next';
import FoldersFavorite from '../../components/UI/ForFavorite/FoldersFavorite';
import QuestionSetsForFavorite from '../../components/UI/ForFavorite/QuestionSetsForFavorite';
import ResourcesForFavorite from '../../components/UI/ForFavorite/ResourcesForFavorite';
import { toast } from 'react-toastify';
import { fetchAllFavorite } from 'api/apiFavorite';
import { fetchCategories, fetchLevels } from 'api/apiService';
import LayoutFooter from 'components/layout/LayoutFooter';

const FavoritePage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('questionSets');
  const [favorites, setFavorites] = useState({
    sets: [],
    folders: [],
    resources: [],
  });
  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState([]);
  const [categories, setCategories] = useState([]);

  /*
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchAllFavorite();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        toast.error(t('Failed to load favorites. Please try again.'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [t]);*/

  useEffect(() => {
    const getLevels = async () => {
      try {
        const response = await fetchLevels();
        const formattedLevels = response.map((level) => level.name);
        //console.log(response);
        setLevels(formattedLevels);
      } catch (error) {
        console.error('Error fetching levels:', error);
        toast.error('Error downloading levels');
      }
    };

    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        const formattedCategories = response.map((category) => category.name);
        setCategories(formattedCategories);
        //console.log(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Error downloading categories');
      }
    };

    getLevels();
    getCategories();
  }, []);

  // Функція для рендерингу компонентів залежно від активної вкладки
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'questionSets':
        return (
          <QuestionSetsForFavorite levels={levels} categories={categories} />
        );
      case 'folders':
        return <FoldersFavorite />;
      case 'resources':
        return <ResourcesForFavorite levels={levels} categories={categories} />;
      default:
        return null;
    }
  };

  return (
    <LayoutFooter showSearch={true} showPlus={true} showPremium={false}>
      <div className={styles.libraryPage}>
        <h1 className={styles.header}>{t('favorite')}</h1>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'questionSets' ? styles.active : ''}`}
            onClick={() => setActiveTab('questionSets')}
          >
            {t('question_sets')}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'folders' ? styles.active : ''}`}
            onClick={() => setActiveTab('folders')}
          >
            {t('folders')}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'resources' ? styles.active : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            {t('resources')}
          </div>
        </div>

        {/* Показуємо спінер під час завантаження */}
        <div className={styles.tabContent}>{renderActiveTabContent()}</div>
      </div>
    </LayoutFooter>
  );
};

export default FavoritePage;
