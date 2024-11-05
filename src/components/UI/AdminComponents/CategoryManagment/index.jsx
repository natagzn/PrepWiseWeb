import React, { useState } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import HeaderAdmin from '../Header';

const CategoryManagement = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([
    { id: 1, name: 'Категорія 1' },
    { id: 2, name: 'Категорія 2' },
    { id: 3, name: 'Категорія 3' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // для модального вікна створення
  const [currentCategory, setCurrentCategory] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState(''); // для імені нової категорії

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setEditedName(category.name);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === currentCategory.id ? { ...cat, name: editedName } : cat
      )
    );
    setIsEditModalOpen(false);
    setCurrentCategory(null);
  };

  const handleDeleteConfirm = () => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== currentCategory.id)
    );
    setIsDeleteModalOpen(false);
    setCurrentCategory(null);
  };

  // Додавання нової категорії
  const handleAddCategory = () => {
    const newCategory = {
      id: categories.length + 1, // створюємо новий ID
      name: newCategoryName,
    };
    setCategories([...categories, newCategory]);
    setIsAddModalOpen(false);
    setNewCategoryName('');
  };

  // Фільтрація категорій за назвою
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <HeaderAdmin />
      <div className="container my-4">
        <h2>{t('Manage categories')}</h2>

        {/* Кнопка для додавання категорії */}
        <button
          className="btn btn-success my-3"
          onClick={() => setIsAddModalOpen(true)}
        >
          {t('Add category')}
        </button>

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
              <th>{t('ID')}</th>
              <th>{t('Category name')}</th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => handleEditClick(category)}
                  >
                    {t('Edit')}
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDeleteClick(category)}
                  >
                    {t('Delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Модальне вікно для додавання категорії */}
        {isAddModalOpen && (
          <div className={`${styles.modalOverlay} ${styles.modal}`}>
            <div className={styles.modalContent}>
              <h5>{t('Add category')}</h5>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={t('Category name')}
                className="form-control my-2"
              />
              <div>
                <button
                  className="btn btn-success mx-1"
                  onClick={handleAddCategory}
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
              <h5>{t('Edit category')}</h5>
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
                {t('delete_category_confirmation', {
                  name: currentCategory.name,
                })}
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

export default CategoryManagement;
