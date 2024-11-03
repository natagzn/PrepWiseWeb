import React, { useState } from 'react';
import SearchComponent from '../SearchComponent';
import PeopleComponent from '../PeopleComponent';
import styles from './style.module.css';
import { useTranslation } from 'react-i18next';

function FollowingComponent({ users }) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Фільтрація користувачів за запитом пошуку
  const filteredPeople = users.filter((person) =>
    person.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функція для обробки події пошуку
  const handleSearch = (query) => {
    setSearchQuery(query); // Оновлюємо пошуковий запит
  };

  return (
    <div className={styles.padding}>
      <SearchComponent placeholder={t('search_user')} onClick={handleSearch} />{' '}
      <div className={styles.container}>
        {filteredPeople.length > 0 ? (
          filteredPeople.map((person) => (
            <PeopleComponent
              key={person.username}
              username={person.username}
              text={person.text}
            />
          ))
        ) : (
          <p>{t('no_users_found')}</p>
        )}
      </div>
    </div>
  );
}

export default FollowingComponent;
