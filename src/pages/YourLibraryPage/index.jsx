import React, { useState } from 'react';
import styles from './styles.module.css';
import QuestionSetsComponent from '../../components/UI/ForLibrary/QuestionSetsLibrary';
import FoldersLibrary from '../../components/UI/ForLibrary/FoldersLibrary';

import ResourcesLibrary from '../../components/UI/ForLibrary/ResourcesLibrary/ResourcesLibrary';
import HeaderComponent from '../../components/UI/HeaderComponent';
import { useTranslation } from 'react-i18next';
import SharedSetsLibrary from 'components/UI/ForLibrary/SharedSetsLibrary';

const YourLibraryPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('questionSets');

  // Функція для рендерингу компонентів залежно від активної вкладки
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'questionSets':
        return <QuestionSetsComponent />;
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
