import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import { deleteResourceByIdAdmin, fetchResourceById } from 'api/apiResource';
import { toast } from 'react-toastify';

const ResourceDetail = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [resource, setResource] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResourceById(resourceId);
        if (data.success === false) {
          toast.error('Data not found.');
          navigate(-1);
          return;
        }

        setResource(data);
        setIsLoading(false);
      } catch (error) {
        //console.error('Error fetching resource:', error);
        setIsLoading(false);
        toast.error('Error fetching data.');
        navigate(-1);
      }
    };

    fetchData();
  }, [resourceId]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true); // Відкриваємо модальне вікно
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteResourceByIdAdmin(resourceId); // Викликаємо функцію для видалення
      if (result.success) {
        console.log(`Ресурс з ID ${resourceId} видалено`);
        setIsDeleteModalOpen(false);
        navigate(-1); // Повертаємося на попередню сторінку після успішного видалення
      } else {
        console.error('Error deleting resource:', result.message);
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{resource.title}</h2>
        <p>{resource.description}</p>
        <p>
          {t('user')}: {resource.username}
        </p>
        <p>
          {t('level')}: {resource.level}
        </p>
        <p>
          {t('category')}: {resource.category}
        </p>
        <p>
          {t('Date')}: {resource.date}
        </p>
        <button onClick={handleDelete} className={styles.button}>
          {t('delete')}
        </button>
        <button onClick={handleCancel} className={styles.button}>
          {t('cancel')}
        </button>
      </div>

      {/* Модальне вікно для підтвердження видалення */}
      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{t('are_you_sure_delete')}</p>
            <div>
              <button
                className="btn btn-danger mx-1"
                onClick={handleDeleteConfirm} // Викликаємо функцію для підтвердження видалення
              >
                {t('delete')}
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

export default ResourceDetail;
