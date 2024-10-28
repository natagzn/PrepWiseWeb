import React, { useState } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { FaPen } from 'react-icons/fa';

function VisibilityLevelCategories() {
  const { t } = useTranslation();

  const [visibility, setVisibility] = useState('public');
  const [level, setLevel] = useState('trainee');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ['C#', 'ASP .NET', 'JavaScript', 'Python', 'Java'];

  const handleVisibilityChange = (e) => setVisibility(e.target.value);
  const handleLevelChange = (e) => setLevel(e.target.value);

  const toggleCategoryModal = () =>
    setIsCategoryModalOpen(!isCategoryModalOpen);

  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleApplyCategories = () => toggleCategoryModal();

  return (
    <div className={styles.container}>
      {/* Перший рядок - вибір видимості */}
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

      {/* Другий рядок - вибір рівня */}
      <div className={styles.optionRow}>
        <div className={styles.label}>{t('Level of set')}:</div>
        <select
          value={level}
          onChange={handleLevelChange}
          className={styles.dropdown}
        >
          <option value="trainee">{t('Trainee')}</option>
          <option value="junior">{t('Junior')}</option>
          <option value="middle">{t('Middle')}</option>
          <option value="senior">{t('Senior')}</option>
          <option value="team_lead">{t('Team Lead')}</option>
        </select>
      </div>

      {/* Третій рядок - вибір категорій */}
      <div className={styles.optionRow}>
        <div className={styles.label}>{t('Category of set')}:</div>
        <div className={styles.categoryList}>
          {selectedCategories.map((category, index) => (
            <div key={index} className={styles.categoryItem}>
              {category}
            </div>
          ))}
          <button onClick={toggleCategoryModal} className={styles.editButton}>
            {selectedCategories.length === 0 ? '+' : <FaPen />}
          </button>
        </div>
      </div>

      {/* Модальне вікно вибору категорій */}
      {isCategoryModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>{t('Select categories')}</h3>
            <div className={styles.categoryOptions}>
              {categories.map((category, index) => (
                <label key={index} className={styles.categoryOption}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategorySelection(category)}
                    disabled={
                      !selectedCategories.includes(category) &&
                      selectedCategories.length >= 3
                    }
                  />
                  {category}
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
