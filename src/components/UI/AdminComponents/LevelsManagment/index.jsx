import React, { useState } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import HeaderAdmin from '../Header';

const LevelsManagement = () => {
  const { t } = useTranslation();
  const [levels, setLevels] = useState([
    { id: 1, name: 'Рівень 1' },
    { id: 2, name: 'Рівень 2' },
    { id: 3, name: 'Рівень 3' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleEditClick = (level) => {
    setCurrentLevel(level);
    setEditedName(level.name);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (level) => {
    setCurrentLevel(level);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log(`Рівень "${currentLevel.name}" змінено на "${editedName}"`);
    setLevels((prevLevels) =>
      prevLevels.map((lvl) =>
        lvl.id === currentLevel.id ? { ...lvl, name: editedName } : lvl
      )
    );
    setIsEditModalOpen(false);
    setCurrentLevel(null);
  };

  const handleDeleteConfirm = () => {
    console.log(`Рівень "${currentLevel.name}" видалено`);
    setLevels((prevLevels) =>
      prevLevels.filter((lvl) => lvl.id !== currentLevel.id)
    );
    setIsDeleteModalOpen(false);
    setCurrentLevel(null);
  };

  // Фільтрація рівнів за назвою
  const filteredLevels = levels.filter((level) =>
    level.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <HeaderAdmin />
      <div className="container my-4">
        <h2>{t('Manage levels')}</h2>

        {/* Поле для пошуку */}
        <input
          type="text"
          placeholder={t('Search by name')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control my-3"
        />

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{t('ID')}</th> {/* Заголовок для ID */}
              <th>{t('Level name')}</th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredLevels.map((level) => (
              <tr key={level.id}>
                <td>{level.id}</td> {/* Відображення ID рівня */}
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
                  {t('save')}
                </button>
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  {t('cancel')}
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
                  {t('cancel')}
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
