import React, { useState, useEffect } from 'react';
import styles from './ResourcesLibrary.module.css';
import ResourceComponent from '../../ResourceComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import SearchComponent from '../../SearchComponent';
import { useTranslation } from 'react-i18next';
import resourcesData from '../../../../resources.json';

const ResourcesLibrary = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState([]);
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

  useEffect(() => {
    setResources(resourcesData);
  }, []);

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
  });

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
  };

  const filters = [
    {
      name: 'categories',
      label: 'categories',
      options: ['Development', 'Design', 'Marketing', 'Science', 'Arts'],
    },
  ];

  const filteredResources = () => {
    let filtered = resources.filter((resource) => {
      const matchesCategory =
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.includes(resource.category);

      const matchesSearchTerm = resource.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearchTerm;
    });

    if (selectedSortingOption) {
      return filtered.sort((a, b) => {
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
    return filtered;
  };

  const handleSearchClick = (value) => {
    setSearchTerm(value);
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
        <div className={styles.search}>
          <SearchComponent
            placeholder={t('search_resources')}
            onClick={handleSearchClick}
          />
        </div>
      </div>

      <div className={styles.resourcesList}>
        {filteredResources().length === 0 ? (
          <div className="noResultsMessage">
            {t('no_resources_message_lib')}
          </div>
        ) : (
          filteredResources().map((resource) => (
            <ResourceComponent
              key={resource.id}
              id={resource.id}
              title={resource.title}
              category={resource.category}
              username={resource.username}
              date={resource.date}
              description={resource.description}
              isLiked={resource.isLiked}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ResourcesLibrary;
