import React, { useState } from 'react';
import styles from './FavoritePage.module.css';
import QuestionSetsComponent from '../../components/UI/ForLibrary/QuestionSetsLibrary/QuestionSetsLibrary';
import FoldersLibrary from '../../components/UI/ForLibrary/FoldersLibrary/FoldersLibrary';
import ResourcesLibrary from '../../components/UI/ForLibrary/ResourcesLibrary/ResourcesLibrary';
import HeaderComponent from '../../components/UI/HeaderComponent/HeaderComponent';
import { useTranslation } from 'react-i18next'; // Імпортуємо useTranslation
import FoldersFavorite from '../../components/UI/ForFavorite/FoldersFavorite/FoldersFavorite';
import QuestionSetsForFavorite from '../../components/UI/ForFavorite/QuestionSetsForFavorite/QuestionSetsForFavorite';
import ResourcesForFavorite from '../../components/UI/ForFavorite/ResourcesForFavorite/ResourcesForFavorite';

const FavoritePage = () => {
  const { t } = useTranslation(); // Отримуємо функцію t для перекладів
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
        {/* Додаємо переклад заголовка */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'questionSets' ? styles.active : ''}`}
            onClick={() => setActiveTab('questionSets')}
          >
            {t('question_sets')}{' '}
            {/* Використовуємо переклад для Question Sets */}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'folders' ? styles.active : ''}`}
            onClick={() => setActiveTab('folders')}
          >
            {t('folders')} {/* Використовуємо переклад для Folders */}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'resources' ? styles.active : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            {t('resources')} {/* Використовуємо переклад для Resources */}
          </div>
        </div>
        <div className={styles.tabContent}>{renderActiveTabContent()}</div>
      </div>
    </div>
  );
};

export default FavoritePage;
