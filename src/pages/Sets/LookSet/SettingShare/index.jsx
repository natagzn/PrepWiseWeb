import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import SearchComponent from 'components/UI/SearchComponent';

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

        {/* Replacing Search Input with SearchComponent */}
        <SearchComponent
          placeholder={t('search_friends')}
          onClick={handleSearch} // Pass handleSearch function to SearchComponent
        />

        {/* Friends List or No Results Message */}
        <div className={styles.friendsList}>
          {friends.length === 0 ? (
            <p>{t('no_friends')}</p> // Display message if no friends
          ) : filteredFriends.length === 0 ? (
            <p>{t('no_search_results')}</p> // Display message if no search results
          ) : (
            filteredFriends.map((follower) => (
              <div key={follower.id} className={styles.followerItem}>
                <img
                  className={styles.avatar}
                  src="https://via.placeholder.com/47x47"
                  alt={`${follower.username} avatar`}
                />
                <div className={styles.followerInfo}>
                  <div className={styles.username}>{follower.username}</div>
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

        {/* Footer with Confirm and Cancel buttons */}
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
      </div>
    </div>
  );
}

export default SettingsShare;
