import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { FolderComponent } from '../../FolderComponent';
import SortComponent from '../../SortComponent';
import SearchComponent from '../../SearchComponent';
import { useTranslation } from 'react-i18next';
import { fetchAllFolderUser, fetchFolderById } from 'api/apiFolder';
import Spinner from 'react-bootstrap/Spinner'; // Підключення спінера, якщо використовуєте react-bootstrap

const FoldersLibrary = () => {
  const { t } = useTranslation();
  const [folders, setFolders] = useState([]);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState('createdDesc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const sortingOptions = [
    { label: t('created_new_old'), value: 'createdDesc' },
    { label: t('created_old_new'), value: 'createdAsc' },
    { label: t('name_A_Z'), value: 'nameAsc' },
    { label: t('name_Z_A'), value: 'nameDesc' },
  ];

  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const loadFolders = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllFolderUser();
        const detailedFolders = await Promise.all(
          response.map(async (folder) => {
            const detailResponse = await fetchFolderById(folder.folder_id);
            return { ...detailResponse, id: folder.folder_id };
          })
        );
        setFolders(detailedFolders.reverse());
      } catch (error) {
        console.error('Error loading folders:', error);
      } finally {
        setIsLoading(false); // Завершення завантаження
      }
    };

    loadFolders();
  }, []);

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

  const displayedFolders = sortedFolders();

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
            onClick={handleSearchClick}
            onEnter={handleSearchClick}
          />
        </div>
      </div>
      <div className={styles.foldersList}>
        {isLoading ? (
          <Spinner
            style={{ alignSelf: 'center' }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">{t('loading')}</span>
          </Spinner>
        ) : displayedFolders.length === 0 ? (
          <div className="noResultsMessage">{t('no_folders_message')}</div>
        ) : (
          displayedFolders.map((folder) => (
            <FolderComponent
              key={folder.id}
              id={folder.id}
              folderName={folder.title}
              itemsCount={folder.itemsCount}
              date={folder.date}
              isLiked={folder.isLiked}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FoldersLibrary;
