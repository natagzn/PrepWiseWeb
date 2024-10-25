import React, { useState } from 'react';
import styles from './CreateEditFolder.module.css';
import HeaderComponent from '../../../components/UI/HeaderComponent/HeaderComponent';
import QuestionSetsComponentForFolders from '../../../components/UI/QuestionSetsComponentForFolders/QuestionSetsComponentForFolders';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

  const [folderTitle, setFolderTitle] = useState(folderName || '');

  const [selectedSets, setSelectedSets] = useState(
    questionSetsData.filter((set) => set.isAdded)
  );

  const count = selectedSets.length;
  const countQ = selectedSets.reduce((acc, set) => acc + set.count, 0);

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
    console.log('Creating folder with sets:', selectedSets);
  };

  const handleUpdate = () => {
    console.log('Updating folder with sets:', selectedSets);
  };

  const handleCancel = () => {
    navigate(-1);
  };

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
          {/* Просто інпут поле без обгортки */}
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
        {questionSetsData.map((set) => (
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

      {/* Footer з кнопкою Update */}
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
