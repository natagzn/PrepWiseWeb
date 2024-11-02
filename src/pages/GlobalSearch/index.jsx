import React, { useState } from 'react';
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

const GlobalSearchPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('allResults');
  const [isPremium, setIsPremium] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { searchBy } = useParams();
  const navigate = useNavigate();

  const handleViewAll = (type) => {
    if (!isPremium) {
      setIsModalOpen(true);
    } else {
      setActiveTab(type);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'allResults':
        return (
          <AllResultsSearch
            isPremium={isPremium}
            handleViewAll={handleViewAll}
          />
        );
      case 'questionSets':
        return <QuestionSetsSearch />;
      case 'resources':
        return <ResourcesSearch />;
      case 'users':
        return <UsersSearch />;
      default:
        return null;
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

  const handleTabClick = (tab) => {
    if (isPremium || tab === 'allResults') {
      setActiveTab(tab);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPremiumPage = () => {
    navigate('/lookPremium');
    closeModal();
  };

  return (
    <div>
      <HeaderComponent showSearch={true} showPlus={true} />
      <div className={styles.searchBlock}>
        <SearchComponent
          onClick={handleSearch}
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
        <div className={styles.tabContent}>{renderActiveTabContent()}</div>
      </div>
      <div className={styles.footer}>
        <FooterComponent />
      </div>

      {/* Модальне вікно для преміум повідомлення */}
      <ModalPremium
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={goToPremiumPage}
        text={t('premium_message')}
      />
    </div>
  );
};

export default GlobalSearchPage;
