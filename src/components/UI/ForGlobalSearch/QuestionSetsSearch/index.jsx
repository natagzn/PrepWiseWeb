import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import QuestionSetComponent from '../../QuestionSetComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import questionSetsData from '../../../../questionSetsData.json';

import { useTranslation } from 'react-i18next';

const QuestionSetsSearch = () => {
  const { t } = useTranslation();
  const [questionSets, setQuestionSets] = useState([]);
  const [loadedSets, setLoadedSets] = useState(8);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
    visibility: [],
  });

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  useEffect(() => {
    setQuestionSets(questionSetsData); // Встановлюємо дані з JSON-файлу
  }, []);

  // Фіктивна функція для виклику API з фільтрами та сортуванням
  const fetchQuestionSetsFromAPI = (filters, sortingOption) => {
    console.log('Fetching question sets with filters:', filters);
    console.log('Selected sorting option:', sortingOption);

    // Використовуємо дані з локального JSON для імітації відповіді API
    const filteredSets = questionSetsData.filter((set) => {
      const matchesCategories =
        filters.categories.length === 0 ||
        filters.categories.some((category) =>
          set.categories.includes(category)
        );
      const matchesLevels =
        filters.levels.length === 0 || filters.levels.includes(set.level);
      const matchesVisibility =
        filters.visibility.length === 0 ||
        filters.visibility.includes(set.visibility);

      return matchesCategories && matchesLevels && matchesVisibility;
    });

    const sortedSets = filteredSets.sort((a, b) => {
      switch (sortingOption) {
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

    setQuestionSets(sortedSets);
  };

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
    fetchQuestionSetsFromAPI(selectedFilters, value);
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
    fetchQuestionSetsFromAPI(filters, selectedSortingOption);
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
          questionSets.slice(0, loadedSets).map((set) => (
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
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionSetsSearch;
