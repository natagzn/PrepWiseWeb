import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../../components/UI/HeaderComponent';
import QuestionSetsComponentForFolders from '../../../components/UI/QuestionSetsComponentForFolders';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchComponent from 'components/UI/SearchComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEditFolder = ({
  folderName,
  visibility,
  questionSetsData,
  editOrCreate,
}) => {
  questionSetsData = [
    { id: 1, name: 'Set 1', count: 10, isAdded: true, author: 'me' },
    { id: 2, name: 'Set 2', count: 15, isAdded: false, author: 'me' },
    { id: 3, name: 'Set 3', count: 20, isAdded: true, author: 'me' },
    { id: 4, name: 'Set 4', count: 15, isAdded: false, author: 'me' },
    { id: 5, name: 'Set 5', count: 20, isAdded: true, author: 'me' },
    { id: 6, name: 'Set 6', count: 15, isAdded: false, author: 'me' },
    { id: 7, name: 'Set 7', count: 20, isAdded: true, author: 'me' },
  ];

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [folderTitle, setFolderTitle] = useState(folderName || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSets, setSelectedSets] = useState([]);

  const count = selectedSets.length;
  const countQ = selectedSets.reduce((acc, set) => acc + set.count, 0);

  useEffect(() => {
    if (editOrCreate === 'edit') {
      fetchFolderData(id); // Витягуємо дані про папку
    }
  }, [editOrCreate, id]);

  const fetchFolderData = (id) => {
    // Фіктивна функція для отримання даних про папку за ID
    const folderData = {
      title: 'Example Folder Title', // Приклад заголовка
      addedSetIds: [1, 3, 5], // Приклад ID доданих сетів
    };

    setFolderTitle(folderData.title); // Встановлюємо заголовок
    const addedSets = questionSetsData.filter((set) =>
      folderData.addedSetIds.includes(set.id)
    );
    setSelectedSets(addedSets); // Встановлюємо вибрані сети
  };

  const toggleSetSelection = (setId) => {
    setSelectedSets((prevSelectedSets) => {
      const isAlreadySelected = prevSelectedSets.some(
        (set) => set.id === setId
      );
      if (isAlreadySelected) {
        return prevSelectedSets.filter((set) => set.id !== setId);
      } else {
        const newSet = questionSetsData.find((set) => set.id === setId);
        return [...prevSelectedSets, newSet];
      }
    });
  };

  const handleCreate = () => {
    if (!folderTitle.trim() || selectedSets.length === 0) {
      toast.error(t('Please enter a title and select at least one set.'));
      return;
    }

    console.log('Creating folder with sets:', selectedSets, folderTitle);
    // Логіка створення папки

    toast.success(t('Folder created successfully'));
    navigate('/home');
  };

  const handleUpdate = () => {
    if (!folderTitle.trim() || selectedSets.length === 0) {
      toast.error(t('Please enter a title and select at least one set.'));
      return;
    }

    console.log('Updating folder with sets:', selectedSets, folderTitle);
    // Логіка оновлення папки

    toast.success(t('Folder updated successfully'));
    navigate('/home');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const filterQuestionSets = (term) => {
    setSearchTerm(term);
    const filteredSets = questionSetsData.filter((set) =>
      set.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredQuestionSets(filteredSets);
  };

  const [filteredQuestionSets, setFilteredQuestionSets] =
    useState(questionSetsData);

  return (
    <div className={styles.container}>
      <HeaderComponent />
      <div className={styles.group}>
        <div className={styles.columnLeft}>
          <div className={styles.folderTitle}>
            {editOrCreate === 'create'
              ? t('create_a_folder')
              : t('update_a_folder')}
          </div>
          <input
            type="text"
            value={folderTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
            className={styles.inputText}
            placeholder={t('enter_a_title')}
          />
        </div>

        <div className={styles.columnRight}>
          <div className={styles.buttonBlock}>
            <button
              onClick={editOrCreate === 'create' ? handleCreate : handleUpdate}
              className={styles.createUpdateButton}
            >
              {editOrCreate === 'create' ? t('Create') : t('Update')}
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              {t('cancel')}
            </button>
          </div>

          <div className={styles.setsCount}>
            {t('Was chosen')}: {count} {t('sets')} • {countQ} {t('questions')}
          </div>
        </div>
      </div>
      <div className={styles.questionSets}>
        <div className={styles.search}>
          <div className={styles.textSearch}>
            {searchTerm.length > 0 ? `Searched by name: ${searchTerm}` : ''}
          </div>
          <div className={styles.searchComponentContainer}>
            <SearchComponent
              placeholder={t('search_sets')}
              onClick={(term) => filterQuestionSets(term)}
            />
          </div>
        </div>
        {filteredQuestionSets.map((set) => (
          <QuestionSetsComponentForFolders
            key={set.id}
            name={set.name}
            questionCount={set.count}
            author={set.author}
            isAdded={selectedSets.some((selected) => selected.id === set.id)}
            onToggle={() => toggleSetSelection(set.id)}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <button
          onClick={editOrCreate === 'create' ? handleCreate : handleUpdate}
          className={styles.createUpdateButtonFooter}
        >
          {editOrCreate === 'create' ? t('Create') : t('Update')}
        </button>
        <button onClick={handleCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateEditFolder;
