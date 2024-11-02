import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import UserComponentForSearch from '../../UserComponentForSearch';
import usersData from '../../../../users.json'; // Adjust the path as necessary
import { useTranslation } from 'react-i18next';

const UsersSearch = () => {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setUsers(usersData);
    console.log(usersData);
  }, []);

  return (
    <div className={styles.resourcesWrapper}>
      <div className={styles.resourcesList}>
        {users.length === 0 ? (
          <div className="noResultsMessage">{t('no_users_message_search')}</div>
        ) : (
          users.map((user) => (
            <UserComponentForSearch
              key={user.id}
              id={user.id}
              username={user.username}
              profilePicture={user.profilePicture}
              resourcesCount={user.resourcesCount}
              setsCount={user.setsCount}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UsersSearch;
