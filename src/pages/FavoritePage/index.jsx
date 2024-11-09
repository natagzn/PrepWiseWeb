import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import { useTranslation } from 'react-i18next';
import FoldersFavorite from '../../components/UI/ForFavorite/FoldersFavorite';
import QuestionSetsForFavorite from '../../components/UI/ForFavorite/QuestionSetsForFavorite';
import ResourcesForFavorite from '../../components/UI/ForFavorite/ResourcesForFavorite';
import { toast } from 'react-toastify';
import { fetchAllFavorite } from 'api/apiFavorite';

const FavoritePage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('questionSets');
  const [favorites, setFavorites] = useState({
    sets: [],
    folders: [],
    resources: [],
  });
  const [loading, setLoading] = useState(true);

  // Завантажуємо дані з fetchAllFavorite при монтуванні компонента
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
  }, [t]);

  // Функція для рендерингу компонентів залежно від активної вкладки
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'questionSets':
        return <QuestionSetsForFavorite sets={favorites.sets} />;
      case 'folders':
        return <FoldersFavorite folders={favorites.folders} />;
      case 'resources':
        return <ResourcesForFavorite resources={favorites.resources} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <HeaderComponent />
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
        {loading ? (
          <div className={styles.spinnerWrapper}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className={styles.tabContent}>{renderActiveTabContent()}</div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
