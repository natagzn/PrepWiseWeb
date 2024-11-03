import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import ResourceComponent from '../../ResourceComponent';
import SortComponent from '../../SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel';
import { useTranslation } from 'react-i18next';
import resourcesData from '../../../../resources.json';

const ResourcesSearch = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState(resourcesData); // Set initial state directly
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
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
    fetchResources(); // Call fetchResources on mount
  }, []); // Only run on initial mount

  useEffect(() => {
    fetchResources(); // Call fetchResources when filters or sorting options change
  }, [selectedFilters, selectedSortingOption]);

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
  };

  const filters = [
    {
      name: 'categories',
      label: 'categories',
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
  ];

  const fetchResources = () => {
    // Simulate an API call to fetch resources based on sorting and filters
    const filtered = resources.filter((resource) => {
      const matchesCategory =
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.includes(resource.category);

      return matchesCategory;
    });

    // Sort resources if a sorting option is selected
    const sorted = sortResources(filtered, selectedSortingOption);

    setFilteredResourcesList(sorted);
  };

  const sortResources = (resources, sortingOption) => {
    if (!sortingOption) return resources;

    return [...resources].sort((a, b) => {
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
              report={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ResourcesSearch;
