import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import FollowingComponent from '../../components/UI/ForPeoplePage/FollowingComponent';
import FollowersComponent from '../../components/UI/ForPeoplePage/FollowersComponent';
import FriendsComponent from '../../components/UI/ForPeoplePage/FriendsComponent';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import { getFollowing, getFriends, getSubscribers } from 'api/apiPeople';
import { getShortUserInfoById } from 'api/apiUser';
import { generateAvatar } from 'components/generateAvatar';

const PeoplePage = ({ username, onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('following');
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const modalRef = useRef(null); // Створення посилання на контейнер модального вікна

  useEffect(() => {
    // Закриття модального вікна при натисканні поза ним
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Закриваємо модальне вікно
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Додаємо слухача події на клік
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Видаляємо слухача при демонтажі компонента
    };
  }, [onClose]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const [followingIds, friendsIds, subscribersIds] = await Promise.all([
          getFollowing(),
          getFriends(),
          getSubscribers(),
        ]);

        const fetchUserInfo = async (userIds) => {
          const userPromises = userIds.map(async (id) => {
            const userInfo = await getShortUserInfoById(id);
            return {
              ...userInfo,
              avatar: generateAvatar(userInfo.username), // Генеруємо аватар
            };
          });
          return await Promise.all(userPromises);
        };

        const [followingData, friendsData, followersData] = await Promise.all([
          fetchUserInfo(followingIds),
          fetchUserInfo(friendsIds),
          fetchUserInfo(subscribersIds),
        ]);

        const updatedFollowingData = followingData.map((user) => ({
          ...user,
          text: friendsIds.includes(user.id) ? t('friends') : t('following'),
        }));

        const updatedFollowersData = followersData.map((user) => ({
          ...user,
          text: friendsIds.includes(user.id) ? t('friends') : t('follower'),
        }));

        const updatedFriendsData = friendsData.map((user) => ({
          ...user,
          text: t('friends'),
        }));

        setFollowingList(updatedFollowingData);
        setFriendsList(updatedFriendsData);
        setFollowersList(updatedFollowersData);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
      <div ref={modalRef} className={styles.peoplePage}>
        <div className={styles.headerContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
          <h1 className={styles.username}>{username}</h1>
        </div>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner animation="border" role="status"></Spinner>
          </div>
        ) : (
          <>
            <div className={styles.tabs}>
              <div
                className={`${styles.tab} ${activeTab === 'following' ? styles.active : ''}`}
                onClick={() => setActiveTab('following')}
              >
                {t('following')} ({followingList.length})
              </div>
              <div
                className={`${styles.tab} ${activeTab === 'followers' ? styles.active : ''}`}
                onClick={() => setActiveTab('followers')}
              >
                {t('followers')} ({followersList.length})
              </div>
              <div
                className={`${styles.tab} ${activeTab === 'friends' ? styles.active : ''}`}
                onClick={() => setActiveTab('friends')}
              >
                {t('friends')} ({friendsList.length})
              </div>
            </div>
            <div className={styles.tabContent}>{renderActiveTabContent()}</div>
          </>
        )}
      </div>
    </div>
  );
};
export default PeoplePage;
