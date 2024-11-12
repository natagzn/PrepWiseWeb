import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import SearchComponent from '../SearchComponent';
import { useTranslation } from 'react-i18next';
import { getFriends } from 'api/apiPeople';
import { getShortUserInfoById } from 'api/apiUser';
import { generateAvatar } from 'components/generateAvatar';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Імпортуємо toast для повідомлень
import { sendRequestForHelp } from 'api/apiHelp';

const AskFriendsForHelp = ({ questionId, onClose }) => {
  const [askedFriends, setAskedFriends] = useState([]); // Список друзів, яких вже запитали
  const [friends, setFriends] = useState([]); // Загальний список друзів
  const [filteredFriends, setFilteredFriends] = useState([]); // Список друзів після фільтрації
  const [isLoading, setIsLoading] = useState(true); // Статус завантаження
  const [loadingFriendId, setLoadingFriendId] = useState(null); // ID друга, для якого йде обробка запиту

  const { t } = useTranslation(); // Ініціалізація перекладу

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const friendsIdsResponse = await getFriends();
        const friendsIds = Array.isArray(friendsIdsResponse)
          ? friendsIdsResponse
          : [friendsIdsResponse]; // Перетворюємо в масив, якщо це не масив

        const fetchUserInfo = async (friendsIds) => {
          const userPromises = friendsIds.map(async (id) => {
            const userInfo = await getShortUserInfoById(id);
            return {
              ...userInfo,
              avatar: generateAvatar(userInfo.username),
            };
          });
          return await Promise.all(userPromises);
        };

        const users = await fetchUserInfo(friendsIds);
        setFriends(users); // Оновлюємо загальний список друзів
        setFilteredFriends(users); // Встановлюємо фільтрованих друзів на початку (всі друзі)
        console.log('users', users);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Завантажуємо дані при монтуванні компонента

  // Функція для обробки запиту до друга
  const handleAsk = async (friendId) => {
    if (askedFriends.includes(friendId)) return; // Якщо вже запитано, нічого не робимо

    setLoadingFriendId(friendId); // Встановлюємо ID друга, для якого йде запит
    setAskedFriends((prev) => [...prev, friendId]);

    console.log(friendId, questionId);

    try {
      const response = await sendRequestForHelp(friendId, questionId);
      if (response.success) {
        toast.success(t('Request sent successfully!')); // Показуємо успішне повідомлення
      } else {
        toast.error(t('Error sending request!')); // Показуємо помилку
      }
    } catch (error) {
      toast.error(t('Error sending request!')); // Помилка, якщо щось пішло не так
    } finally {
      setLoadingFriendId(null); // Скидаємо стан завантаження після завершення запиту
    }
  };

  // Функція для фільтрації друзів за іменем
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredFriends(friends); // Якщо пошуковий термін порожній, показуємо всіх друзів
      return;
    }

    const filtered = friends.filter((friend) =>
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFriends(filtered);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2 className={styles.modalTitle}>{t('Ask friends for help')}</h2>
      </div>

      {/* Компонент пошуку */}
      <SearchComponent
        placeholder={t('Find by username')}
        onClick={handleSearch}
        onEnter={handleSearch}
      />

      {/* Показуємо спіннер, якщо завантаження триває */}
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div className={styles.friendsList}>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <div key={friend.id} className={styles.friendItem}>
                <div className={styles.friendInfo}>
                  <div
                    className={styles.avatar}
                    style={{ backgroundColor: friend.avatar.backgroundColor }}
                  >
                    {friend.avatar.initials}
                  </div>
                  <span className={styles.friendName}>{friend.username}</span>
                </div>
                <button
                  className={styles.askButton}
                  onClick={() => handleAsk(friend.id)}
                  disabled={
                    askedFriends.includes(friend.id) ||
                    loadingFriendId === friend.id
                  }
                >
                  {loadingFriendId === friend.id ? (
                    <Spinner animation="border" size="sm" />
                  ) : askedFriends.includes(friend.id) ? (
                    '✓'
                  ) : (
                    'Ask'
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className={styles.notFound}>{t('No friends found')}</div> // Якщо немає знайдених друзів
          )}
        </div>
      )}
    </div>
  );
};

export default AskFriendsForHelp;
