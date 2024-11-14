import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import QuestionSetComponent from '../../QuestionSetComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import SearchComponent from '../../SearchComponent';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import QuestionSetShare from 'components/UI/QuestionSetComponent/QuestionSetShare';
import { getAllSharedSet, getAllSharingSet } from 'api/apiSharedSet';
import { fetchSetById } from 'api/apiSet';
import { fetchUserProfile } from 'api/apiUser';

const SharedSetsLibrary = ({ categories, levels }) => {
  const { t } = useTranslation();
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState('createdDesc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // For loading state
  const [sortedQuestionSets, setSortedQuestionSets] = useState([]); // For sorted and filtered sets

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
    type: [],
  });

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
      name: 'type',
      label: 'Type',
      options: ['Sharing', 'Shared/view', 'Shared/edit'],
    },
  ];

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  useEffect(() => {
    const fetchUserProfileData = async () => {
      const userProfile = await fetchUserProfile();
      return userProfile.user_id;
    };

    const fetchSharedSets = async (userId) => {
      const sharedSetsResponse = await getAllSharedSet();
      if (!sharedSetsResponse.success) {
        console.error(
          'Не вдалося отримати спільні набори:',
          sharedSetsResponse.message
        );
        return [];
      }

      const sharedSetsWithDetails = await Promise.all(
        sharedSetsResponse.data.map(async (set) => {
          const detailedSet = await fetchSetById(set.setId);
          const currentUser = set.sharedWithUsers.find(
            (user) => user.id === userId
          );
          const editPermission = currentUser
            ? currentUser.editPermission
            : false;

          return {
            ...detailedSet,
            author: set.author,
            sharedWithUsers: set.sharedWithUsers,
            editPermission: editPermission,
            id: set.setId,
            shared: true,
            //createdAt: set.createdAt,
          };
        })
      );

      console.log('sharedSetsWithDetails', sharedSetsWithDetails);
      return sharedSetsWithDetails;
    };

    const fetchSharingSets = async () => {
      const sharingSetResponse = await getAllSharingSet();
      if (!sharingSetResponse.success) {
        console.error(
          'Не вдалося отримати sharing sets:',
          sharingSetResponse.message
        );
        return [];
      }

      const sharingSetsWithDetails = await Promise.all(
        sharingSetResponse.data.map(async (set) => {
          const detailedSet = await fetchSetById(set.setId);

          console.log('detailedSet', detailedSet);
          return {
            ...detailedSet,
            sharedWithUsers: set.sharedWithUsers,
            id: set.setId,
          };
        })
      );
      //console.log('sharingSetsWithDetails', sharingSetsWithDetails);
      return sharingSetsWithDetails;
    };

    const fetchAllData = async () => {
      try {
        // Завантаження профілю користувача
        const userId = await fetchUserProfileData();

        // Отримання спільних та sharing наборів
        const [sharedSets, sharingSets] = await Promise.all([
          fetchSharedSets(userId),
          fetchSharingSets(),
        ]);

        // Об'єднуємо та сортуємо набори
        const combinedSets = [...sharedSets, ...sharingSets].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        console.log('ALL COMBINED SET', combinedSets);

        setQuestionSets(combinedSets);
      } catch (error) {
        console.error('Помилка завантаження даних:', error.message);
      } finally {
        setLoading(false); // Завершуємо завантаження
      }
    };

    fetchAllData();
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

        const matchesType =
          selectedFilters.type.length === 0 ||
          selectedFilters.type.some((type) => {
            const typeValue = type;

            // Перевірка, чи значення type відповідає 'Sharing' і set.shared є undefined або null
            if (type === 'Sharing') {
              return set.shared === undefined || set.shared === null;
            }

            // Порівняння для інших значень типу
            return set.shared === typeValue;
          });

        const matchesSearchTerm =
          set.name && set.name.toLowerCase().includes(searchTerm.toLowerCase());

        return (
          matchesCategories && matchesLevels && matchesType && matchesSearchTerm
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

      setSortedQuestionSets(filteredSets); // Update the sortedQuestionSets state
    };

    applyFiltersAndSorting();
  }, [questionSets, selectedFilters, selectedSortingOption, searchTerm]);

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters({
      categories: Array.isArray(filters.categories) ? filters.categories : [],
      levels: Array.isArray(filters.levels) ? filters.levels : [],
      type: Array.isArray(filters.type) ? filters.type : [],
    });
  };

  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

  if (loading) {
    return (
      <div className={styles.spinnerWrapper}>
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
            placeholder={t('search_sets')}
            onClick={handleSearchClick} // Передаємо обробник
          />
        </div>
      </div>

      {/* Сети питань */}
      <div className={styles.questionSetsGrid}>
        {sortedQuestionSets.length === 0 ? (
          <div className="noResultsMessage">{t('no_shared_yet_lib')} </div>
        ) : (
          sortedQuestionSets.map((set) => {
            console.log('set', set); // Logging the set to the console
            console.log('filters', filters);
            return (
              <div key={set.id}>
                <QuestionSetShare
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
                  usernameAuthor={set.author.username}
                  coauthors={set.sharedWithUsers}
                  editPermission={set.editPermission}
                  shared={set.shared}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SharedSetsLibrary;
