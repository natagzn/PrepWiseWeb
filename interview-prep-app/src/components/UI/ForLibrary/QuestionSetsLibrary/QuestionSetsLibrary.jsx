import React, { useState, useEffect } from 'react';
import styles from './QuestionSetsLibrary.module.css';
import QuestionSetComponent from '../../QuestionSetComponent/QuestionSetComponent';
import SortComponent from '../../SortComponent/SortComponent';
import FilterCategoryLevel from '../../FilterCategoryLevel/FilterCategoryLevel';
import SearchComponent from '../../SearchComponent/SearchComponent';

import { useTranslation } from 'react-i18next';

const QuestionSetsLibrary = () => {
  const { t } = useTranslation();

  const [questionSets, setQuestionSets] = useState([]);
  const [loadedSets, setLoadedSets] = useState(8);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Додано для збереження терміна пошуку

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
    const titles = [
      'Math Fundamentals',
      'Introduction to Psychology',
      'Web Development Basics',
      'Advanced JavaScript Concepts',
      'Creative Writing Workshop',
      'Data Science Essentials',
      'Digital Marketing Strategies',
      'Graphic Design Principles',
    ];

    const categories = [
      'Development',
      'Design',
      'Marketing',
      'Psychology',
      'Mathematics',
      'Science',
      'Arts',
      'Business',
    ];

    const generateRandomDate = () => {
      const start = new Date(2023, 0, 1); // 1 січня 2023
      const end = new Date(); // Сьогодні
      const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return date.toISOString().split('T')[0]; // Повертає дату у форматі YYYY-MM-DD
    };

    setQuestionSets(
      Array.from({ length: 8 }, (_, index) => ({
        id: index,
        questionsCount: Math.floor(Math.random() * 20) + 5, // Випадкова кількість питань від 5 до 25
        title: titles[index % titles.length], // Використовуємо назви з масиву
        categories: [categories[index % categories.length]], // Використовуємо категорії з масиву
        username: 'user' + index,
        date: generateRandomDate(), // Генеруємо випадкову дату
        level:
          index % 3 === 0
            ? 'Easy'
            : index % 3 === 1
              ? 'Intermediate'
              : 'Advanced',
        isLiked: index % 2 === 0,
        visibility: index % 2 === 0 ? 'Public' : 'Private',
      }))
    );
  }, []);

  const categories = ['Development', 'Design', 'Marketing', 'Sales', 'Finance'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    levels: [],
    visibility: [],
  });

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
    console.log('Selected Categories:', filters.categories);
    console.log('Selected Levels:', filters.levels);
    console.log('Selected Visibility:', filters.visibility);
  };

  const filters = [
    {
      name: 'categories',
      label: 'Category',
      options: ['Development', 'Design', 'Marketing'],
    },
    {
      name: 'levels',
      label: 'Level',
      options: ['Easy', 'Intermediate', 'Advanced'],
    },
    {
      name: 'visibility',
      label: 'Visibility',
      options: ['Public', 'Private'],
    },
  ];

  // Функція для сортування наборів питань
  const sortedQuestionSets = () => {
    let filteredSets = questionSets.filter((set) => {
      const matchesCategories =
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.some((category) =>
          set.categories.includes(category)
        );

      const matchesLevels =
        selectedFilters.levels.length === 0 ||
        selectedFilters.levels.includes(set.level);
      const matchesVisibility =
        selectedFilters.visibility.length === 0 ||
        selectedFilters.visibility.includes(set.visibility);

      // Додаємо логіку пошуку
      const matchesSearchTerm = set.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        matchesCategories &&
        matchesLevels &&
        matchesVisibility &&
        matchesSearchTerm
      );
    });

    // Сортуємо фільтровані набори питань
    if (selectedSortingOption) {
      return filteredSets.sort((a, b) => {
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
    return filteredSets; // Якщо не вибрано сортування, повертаємо фільтрований масив
  };

  // Обробник для оновлення значення пошуку
  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

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
        {sortedQuestionSets()
          .slice(0, loadedSets)
          .map((set) => (
            <div key={set.id}>
              <QuestionSetComponent
                questionsCount={set.questionsCount}
                title={set.title}
                categories={set.categories}
                username={set.username}
                date={set.date}
                level={set.level}
                isLiked={set.isLiked}
                visibility={set.visibility}
                style={{ width: '500px' }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionSetsLibrary;
