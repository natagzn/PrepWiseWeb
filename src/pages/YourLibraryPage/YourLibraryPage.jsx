import React, { useState } from 'react';
import styles from './YourLibraryPage.module.css';
import QuestionSetsComponent from '../../components/UI/ForLibrary/QuestionSetsLibrary/QuestionSetsLibrary';
import FoldersLibrary from '../../components/UI/ForLibrary/FoldersLibrary/FoldersLibrary';
import SharedComponent from '../../components/UI/ForLibrary/SharedComponent/SharedLibrary';
import ResourcesLibrary from '../../components/UI/ForLibrary/ResourcesLibrary/ResourcesLibrary';
import HeaderComponent from '../../components/UI/HeaderComponent/HeaderComponent';
import { useTranslation } from 'react-i18next'; // Імпортуємо useTranslation

const YourLibraryPage = () => {
  const { t } = useTranslation(); // Отримуємо функцію t для перекладів
  const [activeTab, setActiveTab] = useState('questionSets');

  // Функція для рендерингу компонентів залежно від активної вкладки
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'questionSets':
        return <QuestionSetsComponent />;
      case 'folders':
        return <FoldersLibrary />;
      case 'shared':
        return <SharedComponent />;
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
            className={`${styles.tab} ${activeTab === 'shared' ? styles.active : ''}`}
            onClick={() => setActiveTab('shared')}
          >
            {t('shared')} {/* Використовуємо переклад для Shared */}
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

export default YourLibraryPage;
