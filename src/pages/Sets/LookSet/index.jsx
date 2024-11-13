import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SetInfoComponent from './SetInfoComponent';
import SetQuickReviewComponent from './SetQuickReviewComponent';
import HeaderComponent from 'components/UI/HeaderComponent';
import CardBlock from './CardsBlock';
import styles from './styles.module.css';
import Spinner from 'react-bootstrap/Spinner'; // Імпорт спінера з Bootstrap
import { fetchSetById, getTypeAccessToSet } from 'api/apiSet';
import { useTranslation } from 'react-i18next';
import FooterComponent from 'components/UI/FooterComponent';
import LayoutFooter from 'components/layout/LayoutFooter';
import { toast } from 'react-toastify';

function LookSet() {
  const { id } = useParams();
  const [setInfo, setSetInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const loadSetInfo = async () => {
      try {
        const data = await fetchSetById(id);

        if (data.success === false) {
          toast.error('Data not found.');
          navigate(-1);
          return;
        }

        const accessData = await getTypeAccessToSet(id);

        const combinedData = {
          ...data,
          ...accessData,
        };

        if (
          !combinedData.isAuthor &&
          combinedData.UserCanEdit === null &&
          combinedData.access === 'private'
        ) {
          navigate(-1);
        }

        setSetInfo(combinedData);
        console.log(combinedData);
        setLoading(false);
      } catch (error) {
        console.error('Помилка завантаження набору:', error);
        setError(error.message);
        setLoading(false);
        toast.error('Error fetching data.');
        navigate(-1);
      }
    };

    loadSetInfo();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <Spinner
          animation="border"
          role="status"
          style={{ alignSelf: 'center' }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) return <div>Помилка: {error}</div>;

  if (!setInfo) return null;

  const {
    name,
    level,
    categories,
    author,
    createdAt,
    questions,
    access,
    isFavourite,
    isAuthor,
    UserCanEdit,
  } = setInfo;
  console.log(setInfo);

  return (
    <LayoutFooter showPlus={true} showSearch={true}>
      <div className={styles.container}>
        <SetInfoComponent
          title={name}
          author={author.username}
          questionCount={questions.length}
          level={level}
          categories={categories}
          visibility={access === 'public' ? 'Public' : 'Private'}
          onSave={() => alert('Set saved!')}
          isAuthor={isAuthor}
          UserCanEdit={UserCanEdit}
          id={id}
          createdAt={createdAt}
          isLiked={isFavourite}
          questions={questions}
        />
        <div className={styles.separator} />
        {questions.length !== 0 && (
          <>
            <SetQuickReviewComponent
              questionsAnswers={questions}
              setId={id}
              isAuthor={isAuthor}
              setTitle={name}
            />
            <div className={styles.separator} />
            <CardBlock questionsAnswers={questions} isAuthor={isAuthor} />
          </>
        )}
        {questions.length === 0 && (
          <div className={`noResultsMessage ${styles.message}`}>
            {t('no_questions_in_set')}
          </div>
        )}
      </div>
    </LayoutFooter>
  );
}

export default LookSet;
