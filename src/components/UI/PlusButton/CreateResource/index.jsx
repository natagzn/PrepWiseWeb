import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import SelectCategoryModal from './SelectCategory';

const CreateResource = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // Змінено на одну категорію
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const { t } = useTranslation();

  const maxRows = 4;

  const levels = [
    { id: 1, label: 'Trainee' },
    { id: 2, label: 'Junior' },
    { id: 3, label: 'Middle' },
    { id: 4, label: 'Senior' },
    { id: 5, label: 'Team Lead' },
  ];

  const handleTextChange = (e, setText, ref) => {
    const value = e.target.value;
    setText(value);

    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
    const lineHeight = parseInt(
      window.getComputedStyle(ref.current).lineHeight
    );
    const maxHeight = maxRows * lineHeight;
    if (ref.current.scrollHeight > maxHeight) {
      ref.current.style.height = `${maxHeight}px`;
      ref.current.style.overflowY = 'auto';
    } else {
      ref.current.style.overflowY = 'hidden';
    }
  };

  const handleCreate = () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !selectedLevel ||
      !selectedCategory
    ) {
      toast.error(t('Name, description, level, and category are required!'));
      return;
    }

    toast.success(t('Resource created successfully!'));
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Level ID:', selectedLevel);

    handleClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setSelectedCategory(null); // Очищуємо вибрану категорію
    setSelectedLevel(null);
    onClose();
  };

  const handleSelectCategory = (category) => {
    console.log('Selected category:', category); // Додайте лог для перевірки
    setSelectedCategory(category);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{t('New Resource')}</h2>
        <div className={styles.inputGroup}>
          <textarea
            ref={nameRef}
            value={name}
            onChange={(e) => handleTextChange(e, setName, nameRef)}
            placeholder={t('Enter name of the article/book')}
            className={styles.textarea}
            rows={1}
            style={{ maxHeight: `${maxRows * 1.5}em` }}
          />
          <label>{t('Name of Article/Book')}</label>
        </div>
        <div className={styles.inputGroup}>
          <textarea
            ref={descriptionRef}
            value={description}
            onChange={(e) =>
              handleTextChange(e, setDescription, descriptionRef)
            }
            placeholder={t('Enter description')}
            className={styles.textarea}
            rows={1}
            style={{ maxHeight: `${maxRows * 1.5}em` }}
          />
          <label>{t('Description')}</label>
        </div>
        <div className={styles.footer}>
          <div className={styles.chooseCategories}>
            <button onClick={() => setIsCategoryModalOpen(true)}>
              {selectedCategory ? selectedCategory.title : t('Choose category')}
            </button>
            <div className={styles.chooseLevel}>
              <select
                value={selectedLevel || ''}
                onChange={handleLevelChange}
                className={styles.select}
              >
                <option value="" disabled>
                  {t('Select level')}
                </option>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            <SelectCategoryModal
              isOpen={isCategoryModalOpen}
              onClose={() => setIsCategoryModalOpen(false)}
              onSelect={handleSelectCategory} // Передаємо одну категорію
              initialSelectedCategory={selectedCategory} // Змінено на одну категорію
            />
          </div>
          <div className={styles.buttonBlock}>
            <button className={styles.createButton} onClick={handleCreate}>
              {t('Create')}
            </button>
            <button className={styles.cancelButton} onClick={handleClose}>
              {t('Cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CreateResource;
