import React, { useState } from 'react';
import styles from './styles.module.css';
import { SaveNot } from '../../../components/UI/SaveNot';
import HeaderComponent from '../../../components/UI/HeaderComponent';
import SortComponent from '../../../components/UI/SortComponent';
import QuestionSetsComponentForFolders from '../../../components/UI/QuestionSetsComponentForFolders';
import { useTranslation } from 'react-i18next';

const LookFolder = ({ folderName, visibility, count, countQ }) => {
  const { t } = useTranslation();

  // Початковий порядок sets
  const initialQuestionSetsData = [
    {
      id: 1,
      name: 'Set 1',
      count: 10,
      isAdded: true,
      author: 'me',
      date: '10-11-2024',
    },
    {
      id: 2,
      name: 'Set 2',
      count: 15,
      isAdded: false,
      author: 'me',
      date: '10-11-2024',
    },
    {
      id: 3,
      name: 'Set 3',
      count: 20,
      isAdded: true,
      author: 'me',
      date: '10-11-2024',
    },
    {
      id: 4,
      name: 'Set 1',
      count: 10,
      isAdded: true,
      author: 'me',
      date: '10-11-2024',
    },
    {
      id: 5,
      name: 'Set 2',
      count: 15,
      isAdded: false,
      author: 'me',
      date: '10-11-2024',
    },
    {
      id: 6,
      name: 'Set 3',
      count: 20,
      isAdded: true,
      author: 'me',
      date: '10-11-2024',
    },
    {
      id: 7,
      name: 'Set 1',
      count: 10,
      isAdded: true,
      author: 'me',
      date: '10-11-2024',
    },
    {
      id: 8,
      name: 'Set 2',
      count: 15,
      isAdded: false,
      author: 'me',
      date: '10-11-2024',
    },
    {
      id: 9,
      name: 'Set 3',
      count: 20,
      isAdded: true,
      author: 'me',
      date: '10-11-2024',
    },
  ];

  const [questionSetsData, setQuestionSetsData] = useState(
    initialQuestionSetsData
  );

  // Функція для обробки сортування
  const handleSortChange = (sortOrder) => {
    const sortedData = [...questionSetsData].sort((a, b) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      if (sortOrder === 'desc') return b.name.localeCompare(a.name);
      return 0;
    });
    setQuestionSetsData(sortedData);
  };

  return (
    <div className={styles.container}>
      <HeaderComponent />
      <div className={styles.group}>
        <div className={styles.columnLeft}>
          <div className={styles.folderName}>{folderName}</div>
          <div className={styles.setsCount}>
            {count} {t('sets')} • {countQ} {t('questions')}
          </div>
        </div>
        <div className={styles.columnRight}>
          <div className={styles.groupInfo}>
            <div className={styles.saveNot}>
              <SaveNot />
            </div>
            <img
              src={
                visibility === 'Public'
                  ? '/icons/public.svg'
                  : '/icons/private.svg'
              }
              alt="visibility"
              className={styles.icon}
            />
            <div className={styles.visibility}>{visibility}</div>
            <div className={styles.threeDots}>
              <img src="/icons/dots.svg" alt="dots" className={styles.icon} />
            </div>
          </div>
          <div className={styles.sortContainer}>
            <SortComponent
              sortingOptions={[
                { label: t('A-Z'), value: 'asc' },
                { label: t('Z-A'), value: 'desc' },
              ]}
              onSortChange={handleSortChange}
            />
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
            link={'#'}
            date={set.date}
          />
        ))}
      </div>
    </div>
  );
};

export default LookFolder;
