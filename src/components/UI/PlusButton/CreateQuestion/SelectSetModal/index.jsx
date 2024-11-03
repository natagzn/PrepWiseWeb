import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import SearchComponent from 'components/UI/SearchComponent';
import SetsData from '../../../../../questionSetsData.json';
import { useTranslation } from 'react-i18next';

const SelectSetModal = ({ isOpen, onClose, onSelect }) => {
  const [sets, setSets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = SetsData; //  шлях до  файлу
        const data = SetsData;
        setSets(data);
      } catch (error) {
        console.error('Error fetching the sets:', error);
      }
    };

    if (isOpen) {
      fetchSets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredSets = sets.filter((set) =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2>{t('Select a Set')}</h2>
        <SearchComponent value={searchTerm} onClick={setSearchTerm} />
        <div className={styles.setList}>
          {filteredSets.map(
            (
              set // Показуємо тільки 5 наборів
            ) => (
              <div
                key={set.id}
                className={styles.setItem}
                onClick={() => {
                  onSelect(set.title);
                  handleClose();
                }}
              >
                {set.title}
              </div>
            )
          )}
        </div>
        <button className={styles.close} onClick={handleClose}>
          {t('Close')}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default SelectSetModal;
