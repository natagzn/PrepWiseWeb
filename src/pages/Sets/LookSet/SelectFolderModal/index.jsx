import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import SearchComponent from 'components/UI/SearchComponent';
import SetsData from '../../../../questionSetsData.json';
import { useTranslation } from 'react-i18next';

const SelectFolderModal = ({ isOpen, onClose, onSelect }) => {
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = SetsData;
        const data = SetsData;
        setFolders(data);
      } catch (error) {
        console.error('Error fetching the folders:', error);
      }
    };

    if (isOpen) {
      fetchFolders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredFolders = folders.filter((folder) =>
    folder.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2>{t('Select the folder to add to')}</h2>
        <SearchComponent value={searchTerm} onClick={setSearchTerm} />
        <div className={styles.setList}>
          {filteredFolders.map((folder) => (
            <div
              key={folder.id}
              className={styles.setItem}
              onClick={() => {
                onSelect(folder.title);
                handleClose();
              }}
            >
              {folder.title}
            </div>
          ))}
        </div>
        <button className={styles.close} onClick={handleClose}>
          {t('Close')}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default SelectFolderModal;
