import React, { useState } from 'react';
import styles from './PeoplePage.module.css';
import FollowingComponent from '../../components/UI/ForPeoplePage/FollowingComponent';
import FollowersComponent from '../../components/UI/ForPeoplePage/FollowersComponent';
import FriendsComponent from '../../components/UI/ForPeoplePage/FriendsComponent';
import { useTranslation } from 'react-i18next'; // Імпортуємо useTranslation

const PeoplePage = ({ username, onClose }) => {
  const { t } = useTranslation(); // Отримуємо функцію t для перекладів
  const [activeTab, setActiveTab] = useState('following');

  // Списки користувачів для кожної вкладки
  const followingList = [
    { username: 'sofiyalev06', text: t('following') },
    { username: 'annanahalka', text: t('following') },
    { username: 'annanahalka', text: t('friends') },
    { username: 'natagzn1', text: t('friends') },
    { username: 'natagzn3', text: t('friends') },
    { username: 'natagzn4', text: t('friends') },
  ];

  const followersList = [
    { username: 'user1', text: t('followers') },
    { username: 'user2', text: t('followers') },
    { username: 'annanahalka', text: t('friends') },
    { username: 'natagzn1', text: t('friends') },
    { username: 'natagzn3', text: t('friends') },
    { username: 'natagzn4', text: t('friends') },
  ];

  const friendsList = [
    { username: 'annanahalka', text: t('friends') },
    { username: 'natagzn1', text: t('friends') },
    { username: 'natagzn3', text: t('friends') },
    { username: 'natagzn4', text: t('friends') },
  ];

  // Функція для рендерингу компонентів залежно від активної вкладки
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'following':
        return <FollowingComponent users={followingList} />;
      case 'followers':
        return <FollowersComponent users={followersList} />;
      case 'friends':
        return <FriendsComponent users={friendsList} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.peoplePage}>
        <div className={styles.headerContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
          <h1 className={styles.username}>{username}</h1>
        </div>

        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'following' ? styles.active : ''}`}
            onClick={() => setActiveTab('following')}
          >
            {t('following')} ({followingList.length}) {/* Додаємо кількість */}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'followers' ? styles.active : ''}`}
            onClick={() => setActiveTab('followers')}
          >
            {t('followers')} ({followersList.length}) {/* Додаємо кількість */}
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'friends' ? styles.active : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            {t('friends')} ({friendsList.length}) {/* Додаємо кількість */}
          </div>
        </div>

        <div className={styles.tabContent}>{renderActiveTabContent()}</div>
      </div>
    </div>
  );
};

export default PeoplePage;
