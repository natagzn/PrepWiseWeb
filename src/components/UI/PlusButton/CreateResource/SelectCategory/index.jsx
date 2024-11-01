import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import SearchComponent from 'components/UI/SearchComponent';
import { useTranslation } from 'react-i18next';

const fetchCategories = async () => {
  return [
    { id: 1, title: 'Science' },
    { id: 2, title: 'Mathematics' },
    { id: 3, title: 'History' },
    { id: 4, title: 'Literature' },
    { id: 5, title: 'Technology' },
  ];
};

const SelectCategoryModal = ({
  isOpen,
  onClose,
  onSelect,
  initialSelectedCategory, // Змінено на одну категорію
}) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory || null
  );
  const { t } = useTranslation();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
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
    ); // Дозволяємо вибір лише однієї категорії
  };

  const handleConfirm = () => {
    onSelect(selectedCategory);
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2>{t('Choose category')}</h2>
        <SearchComponent value={searchTerm} onClick={setSearchTerm} />
        <div className={styles.categoryList}>
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryItem}
              onClick={() => handleCheckboxChange(category)} // Обробка натискання на весь блок
            >
              <input
                type="checkbox"
                checked={
                  selectedCategory ? selectedCategory.id === category.id : false
                }
                onChange={() => handleCheckboxChange(category)} // Додаємо обробник для зміни
              />
              <label>{category.title}</label>
            </div>
          ))}
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
