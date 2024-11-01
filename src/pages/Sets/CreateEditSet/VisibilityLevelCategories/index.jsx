import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { FaPen } from 'react-icons/fa';

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
  const [level, setLevel] = useState(
    initialLevel || { id: 1, name: 'trainee' }
  );
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(
    initialCategories ? initialCategories.map((cat) => cat.id) : []
  );
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    setVisibility(initialVisibility);
    setLevel(initialLevel);
    setSelectedCategoryIds(initialCategories.map((cat) => cat.id));
  }, [initialVisibility, initialLevel, initialCategories]);

  const categories = [
    { id: 1, name: 'C#' },
    { id: 2, name: 'ASP .NET' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'Python' },
    { id: 5, name: 'Java' },
  ];
  const levels = [
    { id: 1, name: 'trainee' },
    { id: 2, name: 'junior' },
    { id: 3, name: 'middle' },
    { id: 4, name: 'senior' },
    { id: 5, name: 'team_lead' },
  ];

  const handleVisibilityChange = (e) => {
    const selectedVisibility = e.target.value;
    setVisibility(selectedVisibility);
    onVisibilityChange(selectedVisibility); // Передаємо вибрану видимість
  };

  const handleLevelChange = (e) => {
    const selectedLevel = levels.find((lvl) => lvl.name === e.target.value);
    setLevel(selectedLevel);
    onLevelChange(selectedLevel);
  };

  const toggleCategoryModal = () =>
    setIsCategoryModalOpen(!isCategoryModalOpen);

  const handleCategorySelection = (categoryId) => {
    const updatedCategoryIds = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];

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

      <div className={styles.optionRow}>
        <div className={styles.label}>{t('Level of set')}:</div>
        <select
          value={level.name}
          onChange={handleLevelChange}
          className={styles.dropdown}
        >
          {levels.map((lvl) => (
            <option key={lvl.id} value={lvl.name}>
              {t(lvl.name)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.optionRow}>
        <div className={styles.label}>{t('Category of set')}:</div>
        <div className={styles.categoryList}>
          {categories
            .filter((cat) => selectedCategoryIds.includes(cat.id))
            .map((category) => (
              <div key={category.id} className={styles.categoryItem}>
                {category.name}
              </div>
            ))}
          <button onClick={toggleCategoryModal} className={styles.editButton}>
            {selectedCategoryIds.length === 0 ? '+' : <FaPen />}
          </button>
        </div>
      </div>

      {isCategoryModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>{t('Select categories')}</h3>
            <div className={styles.categoryOptions}>
              {categories.map((category) => (
                <label key={category.id} className={styles.categoryOption}>
                  <input
                    type="checkbox"
                    checked={selectedCategoryIds.includes(category.id)}
                    onChange={() => handleCategorySelection(category.id)}
                    disabled={
                      !selectedCategoryIds.includes(category.id) &&
                      selectedCategoryIds.length >= 3
                    }
                  />
                  {category.name}
                </label>
              ))}
            </div>
            <button
              onClick={handleApplyCategories}
              className={styles.applyButton}
            >
              {t('apply')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisibilityLevelCategories;
