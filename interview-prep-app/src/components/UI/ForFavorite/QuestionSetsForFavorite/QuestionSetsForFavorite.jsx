import React, { useState, useEffect } from 'react';
import styles from './QuestionSetsForFavorite.module.css';
import QuestionSetComponent from '../../QuestionSetComponent/QuestionSetComponent';
import SortComponent from '../../SortComponent/SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel/FilterCategoryLevel';
import SearchComponent from '../../SearchComponent/SearchComponent';
import questionSetsData from '../../../../questionSetsData.json';

import { useTranslation } from 'react-i18next';

const QuestionSetsForFavorite = () => {
  const { t } = useTranslation();
  const [questionSets, setQuestionSets] = useState(
    questionSetsData.filter((set) => set.isLiked)
  );
  const [loadedSets, setLoadedSets] = useState(8);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
  };

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
    visibility: [],
  });

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
    console.log('Selected Categories:', filters.categories);
    console.log('Selected Levels:', filters.levels);
    console.log('Selected Visibility:', filters.visibility);
  };

  const filters = [
    {
      name: 'categories',
      label: 'Category',
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
      label: 'Level',
      options: ['Junior', 'Middle', 'Senior'],
    },
    {
      name: 'visibility',
      label: 'Visibility',
      options: ['Public', 'Private'],
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
      const matchesVisibility =
        selectedFilters.visibility.length === 0 ||
        selectedFilters.visibility.includes(set.visibility);

      // Додаємо логіку пошуку
      const matchesSearchTerm = set.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        matchesCategories &&
        matchesLevels &&
        matchesVisibility &&
        matchesSearchTerm
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

  // Функція для видалення лайку
  const handleUnlikeSet = (id) => {
    setQuestionSets((prevSets) => prevSets.filter((set) => set.id !== id));
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
        {sortedQuestionSets()
          .slice(0, loadedSets)
          .map((set) => (
            <div key={set.id}>
              <QuestionSetComponent
                questionsCount={set.questionsCount}
                title={set.title}
                categories={set.categories}
                username={set.username}
                date={set.date}
                level={set.level}
                isLiked={set.isLiked}
                visibility={set.visibility}
                style={{ width: '500px' }}
                id={set.id}
                handleUnlikeSet={handleUnlikeSet}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionSetsForFavorite;
