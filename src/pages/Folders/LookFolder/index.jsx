import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { SaveNot } from '../../../components/UI/SaveNot';
import HeaderComponent from '../../../components/UI/HeaderComponent';
import SortComponent from '../../../components/UI/SortComponent';
import QuestionSetsComponentForFolders from '../../../components/UI/QuestionSetsComponentForFolders';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLookFolder } from 'api/apiFolder'; // Імпортуємо функцію fetchLookFolder
import { Spinner } from 'react-bootstrap'; // Використовуємо спінер з react-bootstrap
import FolderMenu from '../FolderMenu';
import LayoutFooter from 'components/layout/LayoutFooter';
import { toast } from 'react-toastify';

const LookFolder = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [folderData, setFolderData] = useState(null);
  const [loading, setLoading] = useState(true); // Стан для спінера
  const [questionSetsData, setQuestionSetsData] = useState([]);
  const navigate = useNavigate();

  // Завантаження даних при першому рендері
  useEffect(() => {
    const loadFolderData = async () => {
      setLoading(true);
      try {
        const data = await fetchLookFolder(id);
        if (data.success === false) {
          toast.error('Data not found.');
          navigate(-1);
          return;
        }

        setFolderData(data);
        setQuestionSetsData(data.sets);
        console.log(data.sets);
      } catch (error) {
        console.error('Error fetching folder data:', error);
        toast.error('Error fetching data.');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    loadFolderData();
  }, [id]);

  // Функція для обробки сортування
  const handleSortChange = (selectedSortingOption) => {
    const sortedData = [...questionSetsData].sort((a, b) => {
      switch (selectedSortingOption) {
        case 'createdDesc':
          return new Date(b.date) - new Date(a.date);
        case 'createdAsc':
          return new Date(a.date) - new Date(b.date);
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    setQuestionSetsData(sortedData);
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!folderData) {
    return <div>{t('Error loading folder data')}</div>;
  }

  return (
    <LayoutFooter showPlus={true} showSearch={true}>
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.columnLeft}>
            <div className={styles.folderName}>{folderData.title}</div>
            <div className={styles.setsCount}>
              {folderData.itemsCount} {t('sets')} • {folderData.countQ}{' '}
              {t('questions')} • {folderData.date}
            </div>
          </div>
          <div className={styles.columnRight}>
            <div className={styles.groupInfo}>
              <div className={styles.saveNot}>
                <SaveNot state={folderData.isLiked} type="folder" id={id} />
              </div>
              <img
                src={'/icons/private.svg'}
                alt="visibility"
                className={styles.icon}
              />
              <div className={styles.visibility}>{t('Private')}</div>
              <div className={styles.threeDots}>
                <FolderMenu id={id} />
              </div>
            </div>
            <div className={styles.sortContainer}>
              <SortComponent
                sortingOptions={[
                  { label: t('created_new_old'), value: 'createdDesc' },
                  { label: t('created_old_new'), value: 'createdAsc' },
                  { label: t('name_A_Z'), value: 'nameAsc' },
                  { label: t('name_Z_A'), value: 'nameDesc' },
                ]}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.questionSets}>
          {questionSetsData.length === 0 ? (
            <div className="noResultsMessage">
              {t('no_sets_in_folder_message')}
            </div>
          ) : (
            questionSetsData.map((set) => (
              <QuestionSetsComponentForFolders
                key={set.id}
                id={set.id}
                name={set.name}
                questionCount={set.count}
                date={set.date}
                link={true}
              />
            ))
          )}
        </div>
      </div>
    </LayoutFooter>
  );
};

export default LookFolder;
