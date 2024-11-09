import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import QuestionSetComponent from '../../QuestionSetComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import SearchComponent from '../../SearchComponent';

import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import { fetchAllSetUser, fetchSetById } from 'api/apiSet';

const QuestionSetsLibrary = ({ levels, categories }) => {
  const { t } = useTranslation();
  const [questionSets, setQuestionSets] = useState([]);
  const [loadedSets, setLoadedSets] = useState(8);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState('createdDesc');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedQuestionSets, setSortedQuestionSets] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
    visibility: [],
  });
  const [isLoading, setIsLoading] = useState(true); // Стан для спінера

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
    {
      name: 'visibility',
      label: 'Visibility',
      options: ['Public', 'Private'],
    },
  ];

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  useEffect(() => {
    const loadQuestionSets = async () => {
      try {
        const response = await fetchAllSetUser();
        const detailedSets = await Promise.all(
          response.map(async (set) => {
            const detailResponse = await fetchSetById(set.question_set_id);
            return { ...detailResponse, id: set.question_set_id };
          })
        );
        setQuestionSets(detailedSets);
      } catch (error) {
        console.error('Error loading question sets:', error);
      } finally {
        setIsLoading(false); // При завершенні завантаження встановлюємо isLoading в false
      }
    };

    loadQuestionSets();
  }, []);

  useEffect(() => {
    const applyFiltersAndSorting = () => {
      let filteredSets = questionSets.filter((set) => {
        const matchesCategories =
          selectedFilters.categories.length === 0 ||
          selectedFilters.categories.some(
            (category) =>
              Array.isArray(set.categories) &&
              set.categories.some(
                (setCategory) => setCategory.name === category
              )
          );

        const matchesLevels =
          selectedFilters.levels.length === 0 ||
          selectedFilters.levels.includes(set.level.name);

        const matchesVisibility =
          selectedFilters.visibility.length === 0 ||
          /*selectedFilters.visibility.includes(
            set.access ? 'Public' : 'Private'
          );*/
          selectedFilters.visibility.includes(
            set.access === 'public' ? 'Public' : 'Private'
          );

        const matchesSearchTerm =
          set.name && set.name.toLowerCase().includes(searchTerm.toLowerCase());

        return (
          matchesCategories &&
          matchesLevels &&
          matchesVisibility &&
          matchesSearchTerm
        );
      });

      if (selectedSortingOption) {
        filteredSets = filteredSets.sort((a, b) => {
          switch (selectedSortingOption) {
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
      }

      setSortedQuestionSets(filteredSets);
    };

    applyFiltersAndSorting();
  }, [questionSets, selectedFilters, selectedSortingOption, searchTerm]);

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
    console.log('Selected Categories:', filters.categories);
    console.log('Selected Levels:', filters.levels);
    console.log('Selected Visibility:', filters.visibility);
  };

  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className={styles.questionSetsWrapper}>
      {isLoading ? (
        <Spinner style={{ alignSelf: 'center' }} /> // Відображаємо спінер, поки isLoading дорівнює true
      ) : (
        <>
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
                onClick={handleSearchClick}
                onEnter={handleSearchClick}
              />
            </div>
          </div>

          <div className={styles.questionSetsGrid}>
            {sortedQuestionSets.length === 0 ? (
              <div className="noResultsMessage">
                {t('no_question_sets_message_lib')}
              </div>
            ) : (
              sortedQuestionSets.slice(0, loadedSets).map((set) => (
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
                    key={set.id}
                  />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionSetsLibrary;
