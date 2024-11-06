import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { FaPen } from 'react-icons/fa';
import { fetchCategories, fetchLevels } from 'api/apiService';
import { toast } from 'react-toastify';

function VisibilityLevelCategories({
  onCategoryChange,
  onLevelChange,
  onVisibilityChange,
  initialLevel,
  initialVisibility,
  initialCategories,
}) {
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState(initialVisibility || 'public');
  const [levels, setLevels] = useState([]); // ініціалізуйте як масив
  const [level, setLevel] = useState(initialLevel || {}); // і початковий рівень
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(
    initialCategories ? initialCategories.map((cat) => cat.id) : []
  );
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setVisibility(initialVisibility);
    setLevel(initialLevel);
    setSelectedCategoryIds(
      initialCategories ? initialCategories.map((cat) => cat.id) : []
    );
  }, [initialVisibility, initialLevel, initialCategories]);

  useEffect(() => {
    const loadCategories = async () => {
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
      }
    };

    const getLevels = async () => {
      try {
        const fetchedLevels = await fetchLevels();
        const formattedLevels = fetchedLevels.map((level) => ({
          id: level.level_id,
          label: level.name,
        }));
        setLevels(formattedLevels);
        console.log(formattedLevels);
      } catch (error) {
        console.error('Error fetching levels:', error);
        toast.error('Не вдалося завантажити рівні.');
      }
    };

    getLevels();
    loadCategories();
  }, []); // Пустий масив залежностей - викликати лише при монтуванні

  // Обробник для зміни видимості
  const handleVisibilityChange = (e) => {
    const selectedVisibility = e.target.value;
    setVisibility(selectedVisibility);
    onVisibilityChange(selectedVisibility);
  };

  // Обробник для зміни рівня
  const handleLevelChange = (e) => {
    const selectedLevelId = String(e.target.value);
    console.log(selectedLevelId);

    // Перевірка наявності рівня
    const selectedLevel = levels.find((lvl) => lvl.id == selectedLevelId);

    if (selectedLevel) {
      setLevel(selectedLevel);
      onLevelChange(selectedLevel); // Передача оновленого рівня
    } else {
      // Логіка для випадку, коли рівень не знайдений
      console.error('Level not found');
      toast.error('lnf');
    }
  };

  // Відкриває/закриває модальне вікно для вибору категорій
  const toggleCategoryModal = () =>
    setIsCategoryModalOpen(!isCategoryModalOpen);

  // Додає або видаляє категорію з вибраних
  const handleCategorySelection = (categoryId) => {
    const updatedCategoryIds = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];

    // Обмеження до 3 категорій
    if (updatedCategoryIds.length <= 3) {
      setSelectedCategoryIds(updatedCategoryIds);
      onCategoryChange(
        categories.filter((cat) => updatedCategoryIds.includes(cat.id))
      );
    }
  };

  const handleApplyCategories = () => toggleCategoryModal();

  return (
    <div className={styles.container}>
      {/* Вибір видимості */}
      <div className={styles.optionRow}>
        <div className={styles.label}>{t('Visibility')}:</div>
        <select
          value={visibility}
          onChange={handleVisibilityChange}
          className={styles.dropdown}
        >
          <option value="public">{t('Public')}</option>
          <option value="private">{t('Private')}</option>
        </select>
      </div>

      {/* Вибір рівня */}
      <div className={styles.optionRow}>
        <div className={styles.label}>{t('Level of set')}:</div>
        <select
          value={level.id || ''}
          onChange={handleLevelChange}
          className={styles.dropdown}
        >
          {levels.length > 0 ? (
            levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {t(lvl.label)}
              </option>
            ))
          ) : (
            <option disabled>{t('Loading levels...')}</option>
          )}
        </select>
      </div>

      {/* Вибір категорії */}
      <div className={styles.optionRow}>
        <div className={styles.label}>{t('Category of set')}:</div>
        <div className={styles.categoryList}>
          {categories.length > 0 ? (
            categories
              .filter((cat) => selectedCategoryIds.includes(cat.id))
              .map((category) => (
                <div key={category.id} className={styles.categoryItem}>
                  {category.title}
                </div>
              ))
          ) : (
            <div>{t('Loading categories...')}</div>
          )}
          <button onClick={toggleCategoryModal} className={styles.editButton}>
            {selectedCategoryIds.length === 0 ? '+' : <FaPen />}
          </button>
        </div>
      </div>

      {/* Модальне вікно для вибору категорій */}
      {isCategoryModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{t('Select categories')}</h2>
            <div className={styles.scrollContainer}>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <div
                    key={category.id}
                    className={styles.checkboxItem}
                    onClick={() => handleCategorySelection(category.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategoryIds.includes(category.id)}
                      disabled={
                        !selectedCategoryIds.includes(category.id) &&
                        selectedCategoryIds.length >= 3
                      }
                    />
                    <label>{category.title}</label>
                  </div>
                ))
              ) : (
                <div>{t('Loading categories...')}</div>
              )}
            </div>
            <div className={styles.modalActions}>
              <button onClick={handleApplyCategories}>{t('apply')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisibilityLevelCategories;
