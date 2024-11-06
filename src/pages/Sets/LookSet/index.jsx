import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SetInfoComponent from './SetInfoComponent';
import SetQuickReviewComponent from './SetQuickReviewComponent';
import HeaderComponent from 'components/UI/HeaderComponent';
import CardBlock from './CardsBlock';
import styles from './styles.module.css';
import Spinner from 'react-bootstrap/Spinner'; // Імпорт спінера з Bootstrap
import { fetchSetById } from 'api/apiService';

function LookSet() {
  const { id } = useParams();
  const [setInfo, setSetInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSetInfo = async () => {
      try {
        const data = await fetchSetById(id);
        setSetInfo(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error('Помилка завантаження набору:', error);
        setError(error.message);
        setLoading(false);
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
  } = setInfo;
  console.log(setInfo);

  const isAuthor = true;
  return (
    <div>
      <HeaderComponent showPremium={true} />
      <div className={styles.container}>
        <SetInfoComponent
          title={name}
          author={author.username}
          questionCount={questions.length}
          level={level}
          categories={categories}
          visibility={access ? 'Public' : 'Private'}
          onSave={() => alert('Set saved!')}
          isAuthor={isAuthor}
          id={id}
          createdAt={createdAt}
          isLiked={isFavourite}
        />
        <div className={styles.separator} />
        <SetQuickReviewComponent
          questionsAnswers={questions}
          setId={id}
          isAuthor={isAuthor}
        />
        <div className={styles.separator} />
        <CardBlock questionsAnswers={questions} isAuthor={isAuthor} />
      </div>
    </div>
  );
}

export default LookSet;
