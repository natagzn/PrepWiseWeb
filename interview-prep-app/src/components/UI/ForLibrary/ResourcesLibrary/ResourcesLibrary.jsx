import React, { useState, useEffect } from 'react';
import styles from './ResourcesLibrary.module.css';
import ResourceComponent from '../../ResourceComponent/ResourceComponent';
import SortComponent from '../../SortComponent/SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel/FilterCategoryLevel';
import SearchComponent from '../../SearchComponent/SearchComponent';
import { useTranslation } from 'react-i18next'; // Імпортуємо useTranslation

const ResourcesLibrary = () => {
  const { t } = useTranslation(); // Отримуємо функцію t для перекладів
  const [resources, setResources] = useState([]);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' }, // Переклад
    { label: t('created_old_new'), value: 'createdAsc' }, // Переклад
    { label: t('name_A_Z'), value: 'nameAsc' }, // Переклад
    { label: t('name_Z_A'), value: 'nameDesc' }, // Переклад
  ];

  const handleSortChange = (value) => {
    setSelectedSortingOption(value);
  };

  useEffect(() => {
    const resourceTitles = [
      'Book1 Author A.A.',
      'Book2 Author B.B.',
      'Article3 C.C.',
      'Book4 Author D.D.',
      'Book5 Author E.E.',
    ];

    const categories = [
      'Development',
      'Design',
      'Marketing',
      'Science',
      'Arts',
    ];

    const generateRandomDate = () => {
      const start = new Date(2023, 0, 1);
      const end = new Date();
      const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return date.toISOString().split('T')[0];
    };

    setResources(
      Array.from({ length: 5 }, (_, index) => ({
        id: index,
        title: resourceTitles[index % resourceTitles.length],
        category: categories[index % categories.length],
        username: 'user' + index,
        date: generateRandomDate(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isLiked: index % 2 === 0,
      }))
    );
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
            placeholder={t('search_resources')} // Переклад
            onClick={handleSearchClick}
          />
        </div>
      </div>
      <div className={styles.resourcesList}>
        {filteredResources().map((resource) => (
          <ResourceComponent
            key={resource.id}
            title={resource.title}
            category={resource.category}
            username={resource.username}
            date={resource.date}
            description={resource.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcesLibrary;
