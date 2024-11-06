import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import QuestionSetsComponent from '../../components/UI/ForLibrary/QuestionSetsLibrary';
import FoldersLibrary from '../../components/UI/ForLibrary/FoldersLibrary';

import ResourcesLibrary from '../../components/UI/ForLibrary/ResourcesLibrary/ResourcesLibrary';
import HeaderComponent from '../../components/UI/HeaderComponent';
import { useTranslation } from 'react-i18next';
import SharedSetsLibrary from 'components/UI/ForLibrary/SharedSetsLibrary';
import { fetchCategories, fetchLevels } from 'api/apiService';
import { toast } from 'react-toastify';

const YourLibraryPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('questionSets');

  const [levels, setLevels] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getLevels = async () => {
      try {
        const fetchedLevels = await fetchLevels();
        //console.log(fetchedLevels);
        // Перетворюємо отримані дані у потрібний формат
        const formattedLevels = fetchedLevels.map((level) => level.name);
        setLevels(formattedLevels);
      } catch (error) {
        console.error('Error fetching levels:', error);
        toast.error('Не вдалося завантажити рівні.');
      }
    };

    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        const formattedCategories = response.map((category) => category.name); // Залишаємо лише імена
        setCategories(formattedCategories);
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
          <QuestionSetsComponent levels={levels} categories={categories} />
        );
      case 'folders':
        return <FoldersLibrary />;
      case 'shared':
        return <SharedSetsLibrary />;
      case 'resources':
        return <ResourcesLibrary />;
      default:
        return null;
    }
  };

  return (
    <div>
      <HeaderComponent />
      <div className={styles.libraryPage}>
        <h1 className={styles.header}>{t('your_library')}</h1>{' '}
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
            className={`${styles.tab} ${activeTab === 'shared' ? styles.active : ''}`}
            onClick={() => setActiveTab('shared')}
          >
            {t('shared')}
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

export default YourLibraryPage;
