import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../../components/UI/HeaderComponent';
import QuestionSetsComponentForFolders from '../../../components/UI/QuestionSetsComponentForFolders';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchComponent from 'components/UI/SearchComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addSetToFolder,
  createFolder,
  deleteSetFromFolder,
  fetchFolderById,
  fetchSetForFolders,
  updateFolderById,
} from 'api/apiFolder';
import { Spinner } from 'react-bootstrap';

const CreateEditFolder = ({ folderName, visibility, editOrCreate }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [questionSetsData, setQuestionSetsData] = useState([]);
  const [filteredQuestionSets, setFilteredQuestionSets] = useState([]);
  const [folderTitle, setFolderTitle] = useState(folderName || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSets, setSelectedSets] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track data loading state
  const [isProcessing, setIsProcessing] = useState(false); // Track if a process is in progress

  const [originalSets, setOriginalSets] = useState([]); // Stores the original set IDs
  const [addedSets, setAddedSets] = useState([]); // Stores newly added set IDs
  const [removedSets, setRemovedSets] = useState([]); // Stores removed set IDs

  const count = selectedSets.length;
  const countQ = selectedSets.reduce((acc, set) => acc + set.count, 0);

  // Fetch all available sets on mount
  useEffect(() => {
    const fetchData = async () => {
      const sets = await fetchSetForFolders();
      const formattedSets = sets.map((set) => ({
        ...set,
        isAdded: false,
      }));
      setQuestionSetsData(formattedSets);
      setFilteredQuestionSets(formattedSets); // Initialize filtered sets
      setIsDataLoaded(true); // Set data loaded to true
    };
    fetchData();
  }, []);

  // Fetch folder data if in edit mode and data is loaded
  useEffect(() => {
    const loadFolderData = async () => {
      if (editOrCreate === 'edit' && isDataLoaded) {
        const folderData = await fetchFolderById(id);
        if (folderData) {
          setFolderTitle(folderData.title);

          // Initialize original sets with the folder's current sets
          const initialSetIds = folderData.sets;

          setOriginalSets(initialSetIds);

          const addedSets = questionSetsData.filter((set) =>
            folderData.sets.includes(set.id)
          );
          setSelectedSets(addedSets);
          setQuestionSetsData((prevData) =>
            prevData.map((set) => ({
              ...set,
              isAdded: folderData.sets.includes(set.id),
            }))
          );
        }
      }
    };
    loadFolderData();
  }, [editOrCreate, id, isDataLoaded]);

  const toggleSetSelection = (setId) => {
    setSelectedSets((prevSelectedSets) => {
      const isAlreadySelected = prevSelectedSets.some(
        (set) => set.id === setId
      );

      if (isAlreadySelected) {
        if (originalSets.includes(setId)) {
          setRemovedSets((prev) =>
            prev.includes(setId) ? prev : [...prev, setId]
          );
        }
        setAddedSets((prev) => prev.filter((id) => id !== setId));

        return prevSelectedSets.filter((set) => set.id !== setId);
      } else {
        if (originalSets.includes(setId)) {
          setRemovedSets((prev) => prev.filter((id) => id !== setId));
        } else {
          setAddedSets((prev) => [...prev, setId]);
        }

        const newSet = questionSetsData.find((set) => set.id === setId);
        return [...prevSelectedSets, newSet];
      }
    });
  };

  const handleCreate = async () => {
    if (!folderTitle.trim()) {
      toast.error(t('Please enter a title.'));
      return;
    }

    const idsList = selectedSets.map((set) => set.id);
    try {
      setIsProcessing(true); // Start processing
      const response = await createFolder(folderTitle, idsList);
      if (response.folder) {
        toast.success(response.message || t('Folder created successfully'));
        navigate('/home');
      } else {
        toast.error(t('Error creating folder. Please try again.'));
      }
    } catch (error) {
      toast.error(t(`Error: ${error.message}`));
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  const handleUpdate = async () => {
    if (!folderTitle.trim()) {
      toast.error(t('Please enter a title.'));
      return;
    }

    try {
      setIsProcessing(true); // Start processing
      // Оновлюємо назву папки
      const updateFolderResponse = await updateFolderById(id, folderTitle);
      if (updateFolderResponse.success) {
        // Update success
      } else {
        toast.error(t('Failed to update folder title'));
        return;
      }

      // Додаємо нові сети
      for (const setId of addedSets) {
        const addSetResponse = await addSetToFolder(id, setId);
        if (!addSetResponse.success) {
          toast.error(t(`Failed to add set ID ${setId}`));
        }
      }

      // Видаляємо видалені сети
      for (const setId of removedSets) {
        const deleteSetResponse = await deleteSetFromFolder(id, setId);
        if (!deleteSetResponse.success) {
          toast.error(t(`Failed to remove set ID ${setId}`));
        }
      }

      toast.success(t('Folder updated successfully'));
      navigate(-1);
    } catch (error) {
      console.error('Error updating folder:', error);
      toast.error(t('Error updating folder. Please try again.'));
    } finally {
      setIsProcessing(false); // End processing
    }
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

  // Render a spinner if data is not yet loaded
  if (!isDataLoaded) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

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
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : editOrCreate === 'create' ? (
                t('Create')
              ) : (
                t('Update')
              )}
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
            {searchTerm.length > 0
              ? `${t('Searched by name')}: ${searchTerm}`
              : ''}
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
          className={styles.createUpdateButton}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : editOrCreate === 'create' ? (
            t('Create')
          ) : (
            t('Update')
          )}
        </button>
        <button onClick={handleCancel} className={styles.cancelButton}>
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};

export default CreateEditFolder;
