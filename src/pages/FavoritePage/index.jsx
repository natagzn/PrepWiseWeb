import React, { useState } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import { useTranslation } from 'react-i18next';
import FoldersFavorite from '../../components/UI/ForFavorite/FoldersFavorite';
import QuestionSetsForFavorite from '../../components/UI/ForFavorite/QuestionSetsForFavorite';
import ResourcesForFavorite from '../../components/UI/ForFavorite/ResourcesForFavorite';

const FavoritePage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('questionSets');

  // Функція для рендерингу компонентів залежно від активної вкладки
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'questionSets':
        return <QuestionSetsForFavorite />;
      case 'folders':
        return <FoldersFavorite />;
      case 'resources':
        return <ResourcesForFavorite />;
      default:
        return null;
    }
  };

  return (
    <div>
      <HeaderComponent />
      <div className={styles.libraryPage}>
        <h1 className={styles.header}>{t('favorite')}</h1>{' '}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'questionSets' ? styles.active : ''}`}
            onClick={() => setActiveTab('questionSets')}
          >
            {t('question_sets')}{' '}
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
        <div className={styles.tabContent}>{renderActiveTabContent()}</div>
      </div>
    </div>
  );
};

export default FavoritePage;
