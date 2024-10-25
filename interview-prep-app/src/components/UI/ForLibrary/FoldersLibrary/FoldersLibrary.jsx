import React, { useEffect, useState } from 'react';
import styles from './FoldersLibrary.module.css'; // Імпорт стилів
import { FolderComponent } from '../../FolderComponent/FolderComponent'; // Імпорт компонента папки
import SortComponent from '../../SortComponent/SortComponent'; // Імпорт компонента сортування
import SearchComponent from '../../SearchComponent/SearchComponent'; // Імпорт компонента пошуку
import { useTranslation } from 'react-i18next';

const FoldersLibrary = () => {
  const { t } = useTranslation();

  const [folders, setFolders] = useState([]); // Змінено на folders
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' }, // Переклад
    { label: t('created_old_new'), value: 'createdAsc' }, // Переклад
    { label: t('name_A_Z'), value: 'nameAsc' }, // Переклад
    { label: t('name_Z_A'), value: 'nameDesc' }, // Переклад
  ];

  useEffect(() => {
    // Генерація даних для папок
    const titles = [
      'Project Documentation',
      'Client Proposals',
      'Meeting Notes',
      'Research Papers',
      'Design Assets',
    ];

    const generateRandomDate = () => {
      const start = new Date(2023, 0, 1); // 1 січня 2023
      const end = new Date(); // Сьогодні
      const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return date.toISOString().split('T')[0]; // Повертає дату у форматі YYYY-MM-DD
    };

    setFolders(
      Array.from({ length: 8 }, (_, index) => ({
        id: index,
        title: titles[index % titles.length], // Використовуємо назви з масиву
        itemsCount: Math.floor(Math.random() * 20) + 5, // Випадкова кількість елементів
        date: generateRandomDate(), // Генеруємо випадкову дату
        isLiked: index % 2 === 0,
      }))
    );
  }, []);

  // Функція для сортування папок
  const sortedFolders = () => {
    let filteredFolders = folders.filter((folder) => {
      // Додаємо логіку пошуку
      const matchesSearchTerm = folder.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSearchTerm; // Повертаємо тільки за умовою пошуку
    });

    // Сортуємо фільтровані папки
    if (selectedSortingOption) {
      return filteredFolders.sort((a, b) => {
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
    return filteredFolders; // Якщо не вибрано сортування, повертаємо фільтрований масив
  };

  // Обробник для оновлення значення пошуку
  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className={styles.foldersWrapper}>
      <div className={styles.filterSortWrapper}>
        <div className={styles.leftGroup}>
          <div className={styles.sortComponent}>
            <SortComponent
              sortingOptions={sortingOptions}
              onSortChange={setSelectedSortingOption}
            />
          </div>
        </div>
        <div className={styles.search}>
          <SearchComponent
            placeholder={t('search_folders')}
            onClick={handleSearchClick} // Передаємо обробник
          />
        </div>
      </div>
      <div className={styles.foldersList}>
        {sortedFolders().map((folder) => (
          <FolderComponent
            key={folder.id}
            folderName={folder.title} // Назва папки
            itemsCount={folder.itemsCount} // Кількість елементів
            date={folder.date} // Дата
            isLiked={folder.isLiked}
          />
        ))}
      </div>
    </div>
  );
};

export default FoldersLibrary;
