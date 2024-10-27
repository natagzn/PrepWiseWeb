import React, { useState, useEffect } from 'react';
import styles from './ResourcesForFavorite.module.css';
import ResourceComponent from '../../ResourceComponent/ResourceComponent';
import SortComponent from '../../SortComponent/SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel/FilterCategoryLevel';
import SearchComponent from '../../SearchComponent/SearchComponent';
import { useTranslation } from 'react-i18next';
import resourcesData from '../../../../resources.json';

const ResourcesForFavorite = () => {
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
    const likedResources = resourcesData.filter((resource) => resource.isLiked);
    setResources(likedResources);
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
      label: 'Category',
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

  // Видалення ресурсу зі сторінки при знятті лайку або дизлайку
  const handleRemoveResource = (id) => {
    setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== id)
    );
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
            placeholder={t('search_favorite_resource')}
            onClick={handleSearchClick}
          />
        </div>
      </div>
      <div className={styles.resourcesList}>
        {filteredResources().map((resource) => (
          <ResourceComponent
            key={resource.id}
            id={resource.id}
            title={resource.title}
            categories={resource.categories}
            username={resource.username}
            date={resource.date}
            description={resource.description}
            isLiked={resource.isLiked}
            onRemove={() => handleRemoveResource(resource.id)} // передача функції видалення
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcesForFavorite;
