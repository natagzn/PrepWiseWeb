import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import SelectCategoryModal from './SelectCategory';
import { fetchLevels, postResource } from 'api/apiService';

const CreateResource = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // Змінено на одну категорію
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const { t } = useTranslation();

  const [levels, setLevels] = useState([]); // Стан для зберігання рівнів
  const [error, setError] = useState(null); // Стан для зберігання помилок

  const maxRows = 4;

  useEffect(() => {
    const getLevels = async () => {
      try {
        const fetchedLevels = await fetchLevels();
        console.log(fetchedLevels);
        // Перетворюємо отримані дані у потрібний формат
        const formattedLevels = fetchedLevels.map((level) => ({
          id: level.level_id,
          label: level.name,
        }));
        setLevels(formattedLevels);
      } catch (error) {
        console.error('Error fetching levels:', error);
        setError('Не вдалося завантажити рівні.');
        toast.error('Не вдалося завантажити рівні.');
      }
    };

    getLevels(); // Викликаємо асинхронну функцію
  }, []); // Пустий масив залежностей - викликати лише при монтуванні

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

  const handleCreate = async () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !selectedLevel ||
      !selectedCategory
    ) {
      toast.error(t('Name, description, level, and category are required!'));
      return;
    }

    try {
      // Викликаємо функцію для створення ресурсу через API
      const result = await postResource({
        title: name,
        description,
        levelId: selectedLevel,
        categoryId: selectedCategory.id,
      });

      toast.success(t('Resource created successfully!'));
      console.log('Created resource:', result);

      handleClose();
    } catch (error) {
      const errorData = await error.response?.json();
      console.error('Error data:', errorData);
      toast.error(
        `Failed to create resource: ${errorData?.message || error.message}`
      );
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setSelectedCategory(null); // Очищуємо вибрану категорію
    setSelectedLevel(null);
    onClose();
  };

  const handleSelectCategory = (category) => {
    console.log('Selected category:', category);
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
