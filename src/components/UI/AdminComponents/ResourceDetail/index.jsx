import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';

const ResourceDetail = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const resource = {
    title: 'Приклад ресурсу',
    description: 'Опис ресурсу.',
    userId: 1,
    levelId: 1,
    categoryId: 1,
    date: '2024-11-01',
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Ресурс з ID ${resourceId} видалено`);
    setIsDeleteModalOpen(false);
    handleCancel();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{resource.title}</h2>
        <p>{resource.description}</p>
        <p>
          {t('user')}: {resource.userId}
        </p>
        <p>
          {t('level')}: {resource.levelId}
        </p>
        <p>
          {t('category')}: {resource.categoryId}
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
                onClick={handleDeleteConfirm}
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
