import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import HeaderAdmin from '../Header';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useUser } from 'context/UserContext';

const CategoryManagement = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error(t('Error fetching categories. Please try again.'));
    } finally {
      setLoading(false); // Завантаження завершено
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]); // залежить від токена

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.name &&
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const addCategoryToServer = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/categories`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newCategoryName }),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      await response.json();
      setIsAddModalOpen(false);
      setNewCategoryName('');
      setSearchTerm('');
      fetchCategories(); // Оновлюємо список категорій
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error(t('Error adding category. Please try again.'));
    }
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setEditedName(category.name);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/categories/${currentCategory.category_id}`,
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
      setCurrentCategory(null);
      setEditedName('');
      fetchCategories(); // Оновлюємо список категорій
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(t('Error updating category. Please try again.'));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/categories/${currentCategory.category_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories((prevCategories) =>
        prevCategories.filter(
          (cat) => cat.category_id !== currentCategory.category_id
        )
      );
      setIsDeleteModalOpen(false);
      setCurrentCategory(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(t('Error deleting category. Please try again.'));
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategoryToServer();
    }
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    setFilteredCategories(categories);
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container my-4">
        <h2>{t('Manage categories')}</h2>

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

          {/* Кнопка для додавання категорії */}
          <button
            className="btn btn-success"
            onClick={() => {
              setIsAddModalOpen(true);
              handleResetSearch();
            }}
          >
            {t('Add category')}
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
                <th>{t('Category name')}</th>
                <th>{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.category_id}>
                  <td>{category.category_id}</td>
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
        )}

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
                  {t('Create')}
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
