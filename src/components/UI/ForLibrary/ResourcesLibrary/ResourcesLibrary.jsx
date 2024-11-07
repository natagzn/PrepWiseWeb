import React, { useState, useEffect } from 'react';
import styles from './ResourcesLibrary.module.css';
import ResourceComponent from '../../ResourceComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import SearchComponent from '../../SearchComponent';
import { useTranslation } from 'react-i18next';
import { fetchAllResourceUser, fetchResourceById } from 'api/apiResource';
import Spinner from 'react-bootstrap/Spinner';

const ResourcesLibrary = ({ categories, levels }) => {
  const { t } = useTranslation();
  const [resources, setResources] = useState([]);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
  });

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
  };

  const handleDelete = (id) => {
    setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== id)
    );
  };

  useEffect(() => {
    const loadResource = async () => {
      try {
        const response = await fetchAllResourceUser();
        const detailedResources = await Promise.all(
          response.map(async (resource) => {
            const detailResponse = await fetchResourceById(
              resource.resource_id
            );
            return { ...detailResponse, id: resource.resource_id };
          })
        );
        setResources(detailedResources.reverse());
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        setIsLoading(false); // Завершення завантаження
      }
    };

    loadResource();
  }, []);

  const filters = [
    { name: 'categories', label: 'categories', options: categories },
    { name: 'levels', label: 'level', options: levels },
  ];

  const filteredResources = () => {
    let filtered = resources.filter((resource) => {
      const matchesCategory =
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.includes(resource.category);
      const matchesLevels =
        selectedFilters.levels.length === 0 ||
        selectedFilters.levels.includes(resource.level);
      const matchesSearchTerm = resource.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm && matchesLevels;
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
        {isLoading ? (
          <Spinner style={{ alignSelf: 'center' }} animation="border" />
        ) : filteredResources().length === 0 ? (
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
              level={resource.level}
              likes={resource.likes}
              dislikes={resource.dislikes}
              isAuthor={resource.isAuthor}
              onRemove={() => handleDelete(resource.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ResourcesLibrary;
