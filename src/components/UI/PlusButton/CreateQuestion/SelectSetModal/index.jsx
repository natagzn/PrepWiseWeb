import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import SearchComponent from 'components/UI/SearchComponent';
import SetsData from '../../../../../questionSetsData.json';
import { useTranslation } from 'react-i18next';
import { fetchAllSetUser, fetchSetById, getAllSetsName } from 'api/apiSet';
import { Spinner } from 'react-bootstrap';

const SelectSetModal = ({ isOpen, onClose, onSelect }) => {
  const [sets, setSets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  /*useEffect(() => {
    const fetchSets = async () => {
      setIsLoading(true); // Початок завантаження
      try {
        const response = await getAllSetsName();
        setSets(response);
      } catch (error) {
        console.error('Error fetching the sets:', error);
      } finally {
        setIsLoading(false); // Завершення завантаження
      }
    };

    if (isOpen) {
      fetchSets();
    }
  }, [isOpen]);*/

  useEffect(() => {
    const loadQuestionSets = async () => {
      try {
        const response = await fetchAllSetUser();
        const detailedSets = await Promise.all(
          response.map(async (set) => {
            const detailResponse = await fetchSetById(set.question_set_id);

            // Вибірка лише необхідних полів
            const { name, questions } = detailResponse;
            const detailedSet = {
              id: set.question_set_id,
              name: name,
              questionsCount: questions.length, // Кількість питань
            };
            console.log(detailedSet);
            return detailedSet;
          })
        );

        // Отримання статусу isPremium з localStorage
        const isPremium = JSON.parse(localStorage.getItem('isPremium'));

        // Фільтрація залежно від статусу isPremium
        const filteredSets = detailedSets.filter((set) => {
          if (isPremium) {
            return set.questionsCount < 100; // Якщо Premium, дозволяємо до 100 питань
          }
          return set.questionsCount < 20; // Якщо не Premium, дозволяємо до 20 питань
        });

        setSets(filteredSets);
      } catch (error) {
        console.error('Error loading question sets:', error);
      } finally {
        setIsLoading(false); // При завершенні завантаження встановлюємо isLoading в false
      }
    };

    loadQuestionSets();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredSets = sets.filter((set) =>
    set.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2>{t('Select a Set')}</h2>
        <SearchComponent
          value={searchTerm}
          onClick={setSearchTerm}
          onEnter={setSearchTerm}
        />

        {isLoading ? (
          <div className={styles.spinner} role="status">
            <Spinner />
          </div> // Показуємо спінер
        ) : (
          <div className={styles.setList}>
            {filteredSets.map((set) => (
              <div
                key={set.id}
                className={styles.setItem}
                onClick={() => {
                  onSelect(set);
                  handleClose();
                }}
              >
                {set.name}
              </div>
            ))}
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

export default SelectSetModal;
