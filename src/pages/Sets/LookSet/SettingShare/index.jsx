import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import SearchComponent from 'components/UI/SearchComponent';
import { Spinner } from 'react-bootstrap'; // Імпортуємо компонент spinner
import { generateAvatar } from 'components/generateAvatar';
import { getShortUserInfoById } from 'api/apiUser';
import { getFriends } from 'api/apiPeople';

function SettingsShare({ onClose, id }) {
  const { t } = useTranslation();
  const [friends, setFriends] = useState([
    { id: 1, username: 'username1', accessLevel: t('None') },
    { id: 2, username: 'username2', accessLevel: t('None') },
    { id: 3, username: 'username3', accessLevel: t('Edit') },
    { id: 4, username: 'username2', accessLevel: t('None') },
    { id: 5, username: 'username3', accessLevel: t('View') },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Стан для відображення процесу завантаження

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // Починаємо завантаження
      try {
        const friendsIdsResponse = await getFriends();
        const friendsIds = Array.isArray(friendsIdsResponse)
          ? friendsIdsResponse
          : [friendsIdsResponse];

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
        setFriends(users); // Оновлюємо список друзів
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      } finally {
        setIsLoading(false); // Завершуємо завантаження
      }
    };

    fetchUsers();
  }, []); // Завантажуємо при монтуванні компонента

  const handleAccessChange = (id, newAccess) => {
    setFriends(
      friends.map((follower) =>
        follower.id === id ? { ...follower, accessLevel: newAccess } : follower
      )
    );
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredFriends = friends.filter((follower) =>
    follower.username.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Показуємо spinner, коли завантажуються друзі */}
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            <div>
              <div className={styles.friendsList}>
                {friends.length === 0 ? (
                  <p>{t('no_friends')}</p>
                ) : filteredFriends.length === 0 ? (
                  <p>{t('no_search_results')}</p>
                ) : (
                  filteredFriends.map((follower) => (
                    <div key={follower.id} className={styles.followerItem}>
                      <div
                        className={styles.avatar}
                        style={{
                          backgroundColor: follower.avatar.backgroundColor,
                        }}
                      >
                        {follower.avatar.initials}
                      </div>
                      <div className={styles.followerInfo}>
                        <div className={styles.username}>
                          {follower.username}
                        </div>
                      </div>
                      <select
                        value={follower.accessLevel}
                        onChange={(e) =>
                          handleAccessChange(follower.id, e.target.value)
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
            </div>

            <div className={styles.footer}>
              <motion.button
                className={styles.confirmButton}
                onClick={() => console.log('Confirm action')}
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
          </>
        )}
      </div>
    </div>
  );
}
export default SettingsShare;
