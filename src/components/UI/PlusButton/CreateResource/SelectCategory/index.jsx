import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import SearchComponent from 'components/UI/SearchComponent';
import { useTranslation } from 'react-i18next';
import { fetchCategories } from 'api/apiService';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const SelectCategoryModal = ({
  isOpen,
  onClose,
  onSelect,
  initialSelectedCategory,
}) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory || null
  );
  const [isLoading, setIsLoading] = useState(false); // Стан для індикатора завантаження
  const { t } = useTranslation();

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true); // Починаємо завантаження
      try {
        const response = await fetchCategories();
        const formattedCategories = response.map((category) => ({
          id: category.category_id,
          title: category.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Error downloading categories');
      } finally {
        setIsLoading(false); // Закінчуємо завантаження
      }
    };

    if (isOpen) {
      loadCategories();
      setSelectedCategory(initialSelectedCategory || null);
    }
  }, [isOpen, initialSelectedCategory]);

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (category) => {
    setSelectedCategory((prev) =>
      prev && prev.id === category.id ? null : category
    );
  };

  const handleConfirm = () => {
    onSelect(selectedCategory);
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2>{t('Choose category')}</h2>
        <SearchComponent
          value={searchTerm}
          onClick={setSearchTerm}
          onEnter={setSearchTerm}
        />
        <div className={styles.categoryList}>
          {isLoading ? ( // Показуємо спінер, коли дані завантажуються
            <div className={styles.loader}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">{t('Loading...')}</span>
              </Spinner>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className={styles.categoryItem}
                onClick={() => handleCheckboxChange(category)}
              >
                <input
                  type="checkbox"
                  checked={
                    selectedCategory
                      ? selectedCategory.id === category.id
                      : false
                  }
                  onChange={() => handleCheckboxChange(category)}
                />
                <label>{category.title}</label>
              </div>
            ))
          )}
        </div>

        <div className={styles.buttonsBlock}>
          <button className={styles.confirm} onClick={handleConfirm}>
            {t('confirm')}
          </button>
          <button className={styles.close} onClick={onClose}>
            {t('Close')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SelectCategoryModal;
