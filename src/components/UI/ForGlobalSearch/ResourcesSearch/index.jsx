import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import ResourceComponent from '../../ResourceComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import { useTranslation } from 'react-i18next';

const ResourcesSearch = ({ levels, categories, resources }) => {
  const { t } = useTranslation();
  const [selectedSortingOption, setSelectedSortingOption] =
    useState('createdDesc');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
  });
  const [filteredResourcesList, setFilteredResourcesList] = useState([]);

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
  };

  useEffect(() => {
    console.log('res', resources);
    fetchResources();
  }, [resources, selectedFilters, selectedSortingOption]);

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
  };

  const filters = [
    {
      name: 'categories',
      label: 'categories',
      options: categories,
    },
    { name: 'levels', label: 'level', options: levels },
  ];

  const fetchResources = () => {
    let filtered = resources.filter((resource) => {
      const matchesCategory =
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.includes(resource.category);
      const matchesLevels =
        selectedFilters.levels.length === 0 ||
        selectedFilters.levels.includes(resource.level);
      return matchesCategory && matchesLevels;
    });

    // Сортуємо ресурси залежно від вибраної опції
    if (selectedSortingOption) {
      filtered = filtered.sort((a, b) => {
        switch (selectedSortingOption) {
          case 'createdDesc':
            return new Date(b.date) - new Date(a.date); // Сортуємо по даті від нових до старих
          case 'createdAsc':
            return new Date(a.date) - new Date(b.date); // Сортуємо по даті від старих до нових
          case 'nameAsc':
            return a.title.localeCompare(b.title); // Сортуємо по назві від А до Я
          case 'nameDesc':
            return b.title.localeCompare(a.title); // Сортуємо по назві від Я до А
          default:
            return 0;
        }
      });
    }

    setFilteredResourcesList(filtered); // Оновлюємо список відфільтрованих та відсортованих ресурсів
  };

  return (
    <div className={styles.resourcesWrapper}>
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
      <div className={styles.resourcesList}>
        {filteredResourcesList.length === 0 ? (
          <div className="noResultsMessage">
            {t('no_resources_message_search')}
          </div>
        ) : (
          filteredResourcesList.map((resource) => (
            <ResourceComponent
              key={resource.id}
              id={resource.id}
              title={resource.title}
              category={resource.category}
              username={resource.username}
              date={resource.date}
              description={resource.description}
              isLiked={resource.isLiked}
              level={resource.level}
              likes={resource.likes}
              dislikes={resource.dislikes}
              isAuthor={resource.isAuthor}
              report={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ResourcesSearch;
