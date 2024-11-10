import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import QuestionSetComponent from '../../QuestionSetComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import { useTranslation } from 'react-i18next';

const QuestionSetsSearch = ({ sets, categories, levels }) => {
  // Деструктуризація пропсів
  const { t } = useTranslation();
  const [questionSets, setQuestionSets] = useState(sets); // ініціалізація з переданих даних
  const [selectedSortingOption, setSelectedSortingOption] =
    useState('createdDesc');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
  });

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  // Викликаємо фільтрацію та сортування при змінах в сортуванні або фільтрах
  const fetchQuestionSetsFromAPI = (filters, sortingOption) => {
    console.log('Fetching question sets with filters:', filters);
    console.log('Selected sorting option:', sortingOption);

    const filteredSets = sets.filter((set) => {
      const matchesCategories =
        filters.categories.length === 0 ||
        filters.categories.some((category) =>
          set.categories.includes(category)
        );
      const matchesLevels =
        filters.levels.length === 0 || filters.levels.includes(set.level);

      return matchesCategories && matchesLevels;
    });

    const sortedSets = filteredSets.sort((a, b) => {
      switch (sortingOption) {
        case 'createdDesc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'createdAsc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setQuestionSets(sortedSets); // Оновлюємо стан з відфільтрованими і відсортованими наборами
  };

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
    fetchQuestionSetsFromAPI(selectedFilters, value); // Викликаємо після зміни сортування
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
    fetchQuestionSetsFromAPI(filters, selectedSortingOption); // Викликаємо після застосування фільтрів
  };

  const filters = [
    {
      name: 'categories',
      label: 'categories',
      options: categories,
    },
    {
      name: 'levels',
      label: 'level',
      options: levels,
    },
  ];

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
      </div>

      {/* Сети питань */}
      <div className={styles.questionSetsGrid}>
        {questionSets.length === 0 ? (
          <div className="noResultsMessage">
            {t('no_question_sets_message_search')}
          </div>
        ) : (
          questionSets.map((set) => (
            <div key={set.id}>
              <QuestionSetComponent
                name={set.name}
                categories={set.categories}
                author={set.author}
                createdAt={set.createdAt}
                level={set.level}
                isFavourite={set.isFavourite}
                access={set.access}
                style={{ width: '500px' }}
                id={set.id}
                questions={set.questions}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionSetsSearch;
