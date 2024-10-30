import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import SearchComponent from '../SearchComponent';
import { useTranslation } from 'react-i18next';

const AskFriendsForHelp = ({ userId, questionId, onClose }) => {
  const [askedFriends, setAskedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);

  const { t } = useTranslation();

  // Генерація друзів для демонстрації
  useEffect(() => {
    const generatedFriends = [
      { id: 1, name: 'John Doe', avatar: '/avatars/john.png' },
      { id: 2, name: 'Jane Smith', avatar: '/avatars/jane.png' },
      { id: 3, name: 'Alice Johnson', avatar: '/avatars/alice.png' },
      { id: 4, name: 'Jane Smith2', avatar: '/avatars/jane.png' },
      { id: 5, name: 'Alice Johnson2', avatar: '/avatars/alice.png' },
    ];

    // Тут ви можете реалізувати логіку фільтрації за userId
    // Наприклад, для демонстрації ми просто встановлюємо генеровані друзі
    setFriends(generatedFriends);
    setFilteredFriends(generatedFriends);
  }, [userId]);

  const handleAsk = (friendId) => {
    setAskedFriends((prev) => [...prev, friendId]);
  };

  const handleSearch = (searchTerm) => {
    const filtered = friends.filter((friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <SearchComponent
        placeholder={t('Find by username')}
        onClick={handleSearch}
      />
      <div className={styles.friendsList}>
        {filteredFriends.map((friend) => (
          <div key={friend.id} className={styles.friendItem}>
            <div className={styles.friendInfo}>
              <img
                src={friend.avatar}
                alt={friend.name}
                className={styles.avatar}
              />
              <span className={styles.friendName}>{friend.name}</span>
            </div>
            <button
              className={styles.askButton}
              onClick={() => handleAsk(friend.id)}
              disabled={askedFriends.includes(friend.id)}
            >
              {askedFriends.includes(friend.id) ? '✓' : 'Ask'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AskFriendsForHelp;
