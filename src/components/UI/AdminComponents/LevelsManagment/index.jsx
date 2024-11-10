import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import HeaderAdmin from '../Header';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { fetchLevels } from 'api/apiService';

const LevelsManagement = () => {
  const { t } = useTranslation();
  const [levels, setLevels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [newLevelName, setNewLevelName] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadLevels = async () => {
      setLoading(true); // Додаємо індикатор завантаження
      try {
        const response = await fetchLevels(); // Викликаємо функцію, що отримує рівні
        setLevels(response);
      } catch (error) {
        console.error('Error fetching levels:', error);
        toast.error(t('Error fetching levels. Please try again.'));
      } finally {
        setLoading(false);
      }
    };

    loadLevels(); // Викликаємо функцію при завантаженні компонента
  }, [t]);

  useEffect(() => {
    const filtered = levels.filter((level) =>
      level.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLevels(filtered);
  }, [levels, searchTerm]); // Додаємо searchTerm до залежностей

  const handleEditClick = (level) => {
    setCurrentLevel(level);
    setEditedName(level.name);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (level) => {
    setCurrentLevel(level);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/levels/${currentLevel.level_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: editedName }),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      await response.json();
      setIsEditModalOpen(false);
      setCurrentLevel(null);
      setEditedName('');
      fetchLevels(); // Оновлюємо список рівнів
    } catch (error) {
      console.error('Error updating level:', error);
      toast.error(t('Error updating level. Please try again.'));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/levels/${currentLevel.level_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLevels((prevLevels) =>
        prevLevels.filter((lvl) => lvl.level_id !== currentLevel.level_id)
      );
      setIsDeleteModalOpen(false);
      setCurrentLevel(null);
    } catch (error) {
      console.error('Error deleting level:', error);
      toast.error(t('Error deleting level. Please try again.'));
    }
  };

  const handleAddLevel = async () => {
    if (newLevelName.trim()) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/levels`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newLevelName }),
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        await response.json();
        setIsAddModalOpen(false);
        setNewLevelName('');
        fetchLevels(); // Оновлюємо список рівнів
      } catch (error) {
        console.error('Error adding level:', error);
        toast.error(t('Error adding level. Please try again.'));
      }
    }
  };

  // Функція для скидання пошуку
  const handleResetSearch = () => {
    setSearchTerm('');
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container my-4">
        <h2>{t('Manage levels')}</h2>

        <div className="d-flex justify-content-between align-items-center my-3">
          {/* Поле для пошуку */}
          <input
            type="text"
            placeholder={t('Search by name')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mx-2"
            style={{ width: '800px' }}
          />

          {/* Кнопка для додавання рівня */}
          <button
            className="btn btn-success"
            onClick={() => {
              setIsAddModalOpen(true);
              handleResetSearch();
            }}
          >
            {t('Add level')}
          </button>

          {/* Кнопка для скидання пошуку */}
          <button className="btn btn-secondary" onClick={handleResetSearch}>
            {t('Reset Search')}
          </button>
        </div>

        {loading ? ( // Відображення індикатора завантаження
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>{t('ID')}</th>
                <th>{t('Level name')}</th>
                <th>{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredLevels.map((level) => (
                <tr key={level.level_id}>
                  <td>{level.level_id}</td>
                  <td>{level.name}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => handleEditClick(level)}
                    >
                      {t('Edit')}
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDeleteClick(level)}
                    >
                      {t('Delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Модальне вікно для додавання рівня */}
        {isAddModalOpen && (
          <div className={`${styles.modalOverlay} ${styles.modal}`}>
            <div className={styles.modalContent}>
              <h5>{t('Add level')}</h5>
              <input
                type="text"
                value={newLevelName}
                onChange={(e) => setNewLevelName(e.target.value)}
                placeholder={t('Level name')}
                className="form-control my-2"
              />
              <div>
                <button
                  className="btn btn-success mx-1"
                  onClick={handleAddLevel}
                >
                  {t('Add')}
                </button>
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  {t('Cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Модальне вікно для редагування */}
        {isEditModalOpen && (
          <div className={`${styles.modalOverlay} ${styles.modal}`}>
            <div className={styles.modalContent}>
              <h5>{t('Edit level')}</h5>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="form-control my-2"
              />
              <div>
                <button
                  className="btn btn-success mx-1"
                  onClick={handleSaveEdit}
                >
                  {t('Save')}
                </button>
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  {t('Cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Модальне вікно для підтвердження видалення */}
        {isDeleteModalOpen && (
          <div className={`${styles.modalOverlay} ${styles.modal}`}>
            <div className={styles.modalContent}>
              <p>
                {t('delete_level_confirmation', { name: currentLevel.name })}
              </p>
              <div>
                <button
                  className="btn btn-danger mx-1"
                  onClick={handleDeleteConfirm}
                >
                  {t('Delete')}
                </button>
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  {t('Cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelsManagement;
