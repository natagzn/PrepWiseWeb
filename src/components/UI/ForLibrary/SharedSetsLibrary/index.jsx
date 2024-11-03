import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import QuestionSetComponent from '../../QuestionSetComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import SearchComponent from '../../SearchComponent';
import questionSetsData from '../../../../setsForShare.json';

import { useTranslation } from 'react-i18next';
import QuestionSetShare from 'components/UI/QuestionSetComponent/QuestionSetShare';

const SharedSetsLibrary = () => {
  const { t } = useTranslation();
  const [questionSets, setQuestionSets] = useState([]);
  const [loadedSets, setLoadedSets] = useState(8);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  useEffect(() => {
    setQuestionSets(questionSetsData); // Встановлюємо дані з JSON-файлу
  }, []);

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
  };

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
    type: [],
  });

  const handleApplyFilters = (filters) => {
    setSelectedFilters({
      categories: Array.isArray(filters.categories) ? filters.categories : [],
      levels: Array.isArray(filters.levels) ? filters.levels : [],
      type: Array.isArray(filters.type) ? filters.type : [],
    });
    console.log('Selected Categories:', filters.categories);
    console.log('Selected Levels:', filters.levels);
    console.log('Selected Type:', filters.type);
  };

  const filters = [
    {
      name: 'categories',
      label: 'categories',
      options: [
        'JavaScript',
        'Programming',
        'CSS',
        'Design',
        'React',
        'Python',
        'Data Science',
        'SQL',
        'Databases',
        'UI/UX',
        'Machine Learning',
        'AI',
        'Security',
        'Networking',
        'Java',
        'Cloud',
        'IT',
        'C++',
        'Data Structures',
        'Linux',
        'Systems',
        'Algorithms',
        'HTML',
        'Web',
        'Mobile',
        'App Dev',
      ],
    },
    {
      name: 'levels',
      label: 'level',
      options: ['Junior', 'Middle', 'Senior'],
    },
    {
      name: 'type',
      label: 'Type',
      options: ['Sharing', 'Shared/view', 'Shared/edit'],
    },
  ];

  // Функція для сортування наборів питань
  const sortedQuestionSets = () => {
    let filteredSets = questionSets.filter((set) => {
      const matchesCategories =
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.some((category) =>
          set.categories.includes(category)
        );

      const matchesLevels =
        selectedFilters.levels.length === 0 ||
        selectedFilters.levels.includes(set.level);

      const matchesType =
        selectedFilters.type.length === 0 ||
        selectedFilters.type.some((type) => {
          const typeValue = type.split('/')[1];
          if (type === 'Sharing') {
            return set.shared === undefined;
          }
          return set.shared === typeValue.toLowerCase();
        });

      // Додаємо логіку пошуку
      const matchesSearchTerm = set.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        matchesCategories && matchesLevels && matchesType && matchesSearchTerm
      );
    });

    // Сортуємо фільтровані набори питань
    if (selectedSortingOption) {
      return filteredSets.sort((a, b) => {
        switch (selectedSortingOption) {
          case 'createdDesc':
            return new Date(b.date) - new Date(a.date);
          case 'createdAsc':
            return new Date(a.date) - new Date(b.date);
          case 'nameAsc':
            return a.title.localeCompare(b.title);
          case 'nameDesc':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }
    return filteredSets; // Якщо не вибрано сортування, повертаємо фільтрований масив
  };

  // Обробник для оновлення значення пошуку
  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className={styles.questionSetsWrapper}>
      <div className={styles.filterSortWrapper}>
        <div className={styles.leftGroup}>
          <div className={styles.sortComponent}>
            <SortComponent
              sortingOptions={sortingOptions}
              onSortChange={handleSortChange}
            />
          </div>
          <div className={styles.filterComponent}>
            <FilterCategoryLevel
              filters={filters}
              onApply={handleApplyFilters}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>
        <div className={styles.search}>
          <SearchComponent
            placeholder={t('search_sets')}
            onClick={handleSearchClick} // Передаємо обробник
          />
        </div>
      </div>

      {/* Сети питань */}
      <div className={styles.questionSetsGrid}>
        {sortedQuestionSets().length === 0 ? (
          <div className="noResultsMessage">{t('no_shared_yet_lib')} </div>
        ) : (
          sortedQuestionSets()
            .slice(0, loadedSets)
            .map((set) => (
              <div key={set.id}>
                <QuestionSetShare
                  questionsCount={set.questionsCount}
                  title={set.title}
                  categories={set.categories}
                  username={set.username}
                  date={set.date}
                  level={set.level}
                  isLiked={set.isLiked}
                  shared={set.shared}
                  usernameAuthor={set.usernameAuthor}
                  coauthors={set.coauthors}
                  style={{ width: '500px' }}
                  id={set.id}
                />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default SharedSetsLibrary;
