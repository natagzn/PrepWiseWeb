import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import SearchComponent from 'components/UI/SearchComponent';
import { Spinner } from 'react-bootstrap';
import { generateAvatar } from 'components/generateAvatar';
import { getShortUserInfoById } from 'api/apiUser';
import { getFriends } from 'api/apiPeople';
import {
  getSharedSetById,
  addSharing,
  deleteSharedSetById,
} from 'api/apiSharedSet';

function SettingsShare({ onClose, setId }) {
  const { t } = useTranslation();
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsersData = async () => {
      setIsLoading(true);
      try {
        const friendsIdsResponse = await getFriends();
        const friendsIds = Array.isArray(friendsIdsResponse)
          ? friendsIdsResponse
          : [friendsIdsResponse];

        const friendsData = await Promise.all(
          friendsIds.map(async (friendId) => {
            const userInfo = await getShortUserInfoById(friendId);
            return {
              ...userInfo,
              avatar: generateAvatar(userInfo.username),
              id: friendId,
            };
          })
        );

        const sharedResponse = await getSharedSetById(setId);
        const usersWithAccess = sharedResponse.success
          ? sharedResponse.data.users
          : [];

        // Видаляємо доступ для користувачів, які не є друзями
        const friendIdsSet = new Set(friendsIds);
        for (const user of usersWithAccess) {
          if (!friendIdsSet.has(user.userId)) {
            await deleteSharedSetById(user.id);
          }
        }

        // Оновлюємо список друзів з їх рівнями доступу
        const friendsWithAccess = friendsData.map((friend) => {
          const accessInfo = usersWithAccess.find(
            (user) => user.userId === friend.id
          );
          return {
            ...friend,
            accessLevel: accessInfo
              ? accessInfo.edit
                ? 'Edit'
                : 'View'
              : 'None',
            sharedId: accessInfo ? accessInfo.id : null,
          };
        });

        setFriends(friendsWithAccess);
        console.log('friends with access', friendsWithAccess);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersData();
  }, [setId]);

  const handleAccessChange = (userId, newAccess) => {
    setFriends(
      friends.map((f) =>
        f.id === userId ? { ...f, accessLevel: newAccess } : f
      )
    );

    console.log('friends', friends);
  };

  const saveAccessChanges = async () => {
    try {
      // Видаляємо всі існуючі доступи
      for (const friend of friends) {
        if (friend.sharedId !== null) {
          await deleteSharedSetById(friend.sharedId);
        }
      }

      // Додаємо нові доступи
      for (const friend of friends) {
        if (friend.accessLevel !== 'None') {
          await addSharing(setId, friend.id, friend.accessLevel === 'Edit');
        }
      }

      console.log('Access levels updated successfully');
    } catch (error) {
      console.error('Помилка збереження доступів:', error);
    }
  };

  const handleSearch = (query) => setSearchTerm(query);

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.headerContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
          <h1 className={styles.title}>{t('share')}</h1>
        </div>

        <SearchComponent
          placeholder={t('search_friends')}
          onClick={handleSearch}
          onEnter={handleSearch}
        />

        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.friendsList}>
            {filteredFriends.length === 0 ? (
              <p>{t('no_search_results')}</p>
            ) : (
              filteredFriends.map((friend) => (
                <div key={friend.id} className={styles.followerItem}>
                  <div
                    className={styles.avatar}
                    style={{ backgroundColor: friend.avatar.backgroundColor }}
                  >
                    {friend.avatar.initials}
                  </div>
                  <div className={styles.followerInfo}>
                    <div className={styles.username}>{friend.username}</div>
                  </div>
                  <select
                    value={friend.accessLevel}
                    onChange={(e) =>
                      handleAccessChange(friend.id, e.target.value)
                    }
                    className={styles.accessDropdown}
                  >
                    <option value="None">{t('None')}</option>
                    <option value="View">{t('View')}</option>
                    <option value="Edit">{t('Edit')}</option>
                  </select>
                </div>
              ))
            )}
          </div>
        )}

        <div className={styles.footer}>
          <motion.button
            className={styles.confirmButton}
            onClick={saveAccessChanges}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('confirm')}
          </motion.button>
          <motion.button
            className={styles.cancelButton}
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('cancel')}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default SettingsShare;
