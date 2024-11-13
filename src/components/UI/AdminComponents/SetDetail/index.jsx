import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { deleteSetByIdAdmin, fetchSetById } from 'api/apiSet';
import { deleteSetById } from 'api/apiSet'; // Ваш API для видалення
import { toast } from 'react-toastify';

const SetDetails = () => {
  const { questionSetId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [setData, setSetData] = useState(null); // Стан для даних набору
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Стан для завантаження
  const [isDeleting, setIsDeleting] = useState(false); // Стан для видалення

  useEffect(() => {
    const getSetData = async () => {
      console.log(questionSetId, 'qs');
      const data = await fetchSetById(questionSetId);
      if (data.success !== false) {
        setSetData(data); // Зберігаємо дані
      } else {
        //console.error('Error fetching set:', data.message);
        toast.error('Error fetching data.');
        navigate(-1);
      }
      setLoading(false); // Завантаження завершене
    };

    getSetData();
  }, [questionSetId]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true); // Починаємо процес видалення
    try {
      const result = await deleteSetByIdAdmin(questionSetId);
      if (result.success) {
        console.log(`Набір запитань з ID ${questionSetId} видалено`);
        toast.success(t('Set deleted successfully'));
        navigate(-1); // Повертаємося назад після видалення
      } else {
        toast.error(t('Failed to delete set.'));
      }
    } catch (error) {
      console.error('Error deleting set:', error);
      toast.error(t('Error deleting set.'));
    } finally {
      setIsDeleting(false); // Завершуємо процес видалення
      setIsDeleteModalOpen(false); // Закриваємо модальне вікно
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // Якщо дані ще завантажуються, показуємо спінер
  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div> {/* Ваш спінер */}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.leftBlock}>
          <h2>{setData.name}</h2>
          <p>
            {t('user')}: {setData.author.username}
          </p>
          <p>
            {t('category')}:{' '}
            {setData.categories.map((cat) => cat.name).join(', ')}
          </p>
          <p>
            {t('access')}:{' '}
            {setData.access === 'public' ? t('public') : t('private')}
          </p>
          <p>
            {t('Date')}: {new Date(setData.createdAt).toLocaleDateString()}
          </p>
          <p>
            {t('level')}: {setData.level.name}
          </p>
          <button onClick={handleDelete} className={styles.button}>
            {t('delete')}
          </button>
          <button onClick={handleCancel} className={styles.button}>
            {t('cancel')}
          </button>
        </div>

        <div className={styles.rightBlock}>
          <h3>{t('questions_in_set')}</h3>
          <ul className={styles.questionList}>
            {setData.questions.map((question) => (
              <li key={question.question_id} className={styles.questionItem}>
                <p>
                  <strong>{question.content}</strong>
                </p>
                <p>
                  {t('answer')}: {question.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Модальне вікно для підтвердження видалення */}
      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{t('are_you_sure_delete_set')}</p>
            <div>
              <button
                className="btn btn-danger mx-1"
                onClick={handleDeleteConfirm}
                disabled={isDeleting} // Заблокувати кнопку, поки йде процес видалення
              >
                {isDeleting ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  t('delete')
                )}
              </button>
              <button
                className="btn btn-secondary mx-1"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetDetails;
