import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import QuestionSetComponent from '../../QuestionSetComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import SearchComponent from '../../SearchComponent';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchSetById } from 'api/apiSet';
import { fetchAllFavorite } from 'api/apiFavorite';
import { Spinner } from 'react-bootstrap';

const QuestionSetsForFavorite = ({ levels, categories }) => {
  const { t } = useTranslation();
  const [sets, setSets] = useState([]); // ID улюблених наборів
  const [questionSets, setQuestionSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState('createdDesc');
  const [searchTerm, setSearchTerm] = useState('');
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
    const loadData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchAllFavorite();
        console.log('Fetched IDs:', data.sets);
        setSets(data.sets);

        const setsData = await Promise.all(
          data.sets.map(async (id) => {
            const setData = await fetchSetById(id);
            if (setData.success !== false) {
              return { ...setData, id };
            }
            return null;
          })
        );

        const validSets = setsData.filter((set) => set !== null);
        setQuestionSets(validSets);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error(t('Failed to load data. Please try again.'));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [t]);

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
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
    {
      name: 'visibility',
      label: 'Visibility',
      options: ['Public', 'Private'],
    },
  ];

  const sortedQuestionSets = () => {
    let filteredSets = questionSets.filter((set) => {
      const matchesCategories =
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.some(
          (category) =>
            Array.isArray(set.categories) &&
            set.categories.some((setCategory) => setCategory.name === category)
        );

      const matchesLevels =
        selectedFilters.levels.length === 0 ||
        selectedFilters.levels.includes(set.level.name);

      const matchesVisibility =
        selectedFilters.visibility.length === 0 ||
        //selectedFilters.visibility.includes(set.visibility);
        selectedFilters.visibility.includes(
          set.access === 'public' ? 'Public' : 'Private'
        );

      const matchesSearchTerm = set.name
        ? set.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return (
        matchesCategories &&
        matchesLevels &&
        matchesVisibility &&
        matchesSearchTerm
      );
    });

    if (selectedSortingOption) {
      return filteredSets.sort((a, b) => {
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
    return filteredSets;
  };

  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

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
            placeholder={t('search_favorite_sets')}
            onClick={handleSearchClick}
            onEnter={handleSearchClick}
          />
        </div>
      </div>

      <div className={styles.questionSetsGrid}>
        {sortedQuestionSets().length === 0 ? (
          <div className="noResultsMessage">
            {t('no_question_sets_message_fav')}
          </div>
        ) : (
          sortedQuestionSets().map((set) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionSetsForFavorite;
