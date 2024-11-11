import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import SearchComponent from 'components/UI/SearchComponent';
import { useTranslation } from 'react-i18next';
import { fetchAllFolderUser, fetchFolderById } from 'api/apiFolder';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const SelectFolderModal = ({ isOpen, onClose, onSelect }) => {
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchAllFolderUser();
        const folderData = await Promise.all(
          data.map(async (folder) => {
            const setData = await fetchFolderById(folder.folder_id);
            if (setData.success !== false) {
              return { ...setData, id: folder.folder_id };
            }
            return null;
          })
        );

        const validated = folderData.filter((set) => set !== null);
        setFolders(validated);
      } catch (error) {
        toast.error(t('Failed to load data. Please try again.'));
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2>{t('Select the folder to add to')}</h2>
        <SearchComponent
          value={searchTerm}
          onClick={setSearchTerm}
          onEnter={setSearchTerm}
        />

        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner animation="border" />
          </div>
        ) : (
          <div className={styles.setList} style={{ overflowY: 'scroll' }}>
            {folders.filter((folder) =>
              folder.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 ? (
              <p className={styles.noFoldersFound}>{t('no_folders_found')}</p>
            ) : (
              folders
                .filter((folder) =>
                  folder.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((folder) => (
                  <div
                    key={folder.id}
                    className={styles.setItem}
                    onClick={() => {
                      onSelect(folder.title, folder.id); // Pass both title and id
                      handleClose();
                    }}
                  >
                    {folder.title}
                  </div>
                ))
            )}
          </div>
        )}

        <button className={styles.close} onClick={handleClose}>
          {t('Close')}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default SelectFolderModal;
