import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import UserComponentForSearch from 'components/UI/UserComponentForSearch';

const UsersSearch = ({ usersData }) => {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setUsers(usersData);
  }, []);

  return (
    <div className={styles.resourcesWrapper}>
      <div className={styles.resourcesList}>
        {users.length === 0 ? (
          <div className="noResultsMessage">{t('no_users_message_search')}</div>
        ) : (
          users.map((user) => <UserComponentForSearch {...user} />)
        )}
      </div>
    </div>
  );
};

export default UsersSearch;
