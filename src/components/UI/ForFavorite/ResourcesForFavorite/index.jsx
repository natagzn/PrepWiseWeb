import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import ResourceComponent from '../../ResourceComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import SearchComponent from '../../SearchComponent';
import { useTranslation } from 'react-i18next';
import resourcesData from '../../../../resources.json';
import { fetchAllFavorite } from 'api/apiFavorite';
import { fetchResourceById } from 'api/apiResource';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const ResourcesForFavorite = ({ levels, categories }) => {
  const { t } = useTranslation();
  const [resources, setResources] = useState([]);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState('createdDesc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Початковий стан: завантаження

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
    const loadData = async () => {
      setIsLoading(true);

      console.log('іііі', levels, categories);

      try {
        const data = await fetchAllFavorite();
        setResources(data.resources);

        const resourcesData = await Promise.all(
          data.resources.map(async (id) => {
            const resourceData = await fetchResourceById(id);
            if (resourceData.success !== false) {
              return { ...resourceData, id };
            }
            return null;
          })
        );

        const validated = resourcesData.filter((set) => set !== null);
        setResources(validated);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error(t('Failed to load data. Please try again.'));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [t]);

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
  });

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

  // Видалення ресурсу зі сторінки при знятті лайку або дизлайку
  const handleRemoveResource = (id) => {
    /*setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== id)
    );*/
  };

  // Якщо дані ще не завантажені, нічого не рендеримо, тільки спінер
  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner animation="border" role="status" />
      </div>
    );
  }

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
            onEnter={handleSearchClick}
          />
        </div>
      </div>
      <div className={styles.resourcesList}>
        {filteredResources().length === 0 ? (
          <div className="noResultsMessage">
            {t('no_resources_message_fav')}
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
              /*onRemove={() => handleRemoveResource(resource.id)} */
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ResourcesForFavorite;
