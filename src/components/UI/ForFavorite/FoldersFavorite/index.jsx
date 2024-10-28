import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { FolderComponent } from '../../FolderComponent';
import SortComponent from '../../SortComponent';
import SearchComponent from '../../SearchComponent';
import foldersData from '../../../../foldersData.json';
import { useTranslation } from 'react-i18next';

const FoldersFavorite = () => {
  const { t } = useTranslation();
  const [folders, setFolders] = useState(
    foldersData.filter((folder) => folder.isLiked) // Ініціалізація тільки лайкнутими елементами
  );
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

  const handleLikeFolder = (id) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== id)
    );
  };

  const sortedFolders = () => {
    let filteredFolders = folders.filter((folder) =>
      folder.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
    return filteredFolders;
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
            placeholder={t('search_favorite_folders')}
            onClick={handleSearchClick}
          />
        </div>
      </div>
      <div className={styles.foldersList}>
        {sortedFolders().map((folder) => (
          <FolderComponent
            key={folder.id}
            id={folder.id}
            folderName={folder.title}
            itemsCount={folder.itemsCount}
            date={folder.date}
            isLiked={folder.isLiked}
            handleLikeFolder={handleLikeFolder}
          />
        ))}
      </div>
    </div>
  );
};

export default FoldersFavorite;
