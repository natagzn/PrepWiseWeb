import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';

const FilterCategoryLevel = ({ filters, onApply, selectedFilters }) => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localSelectedFilters, setLocalSelectedFilters] = useState({});

  useEffect(() => {
    const initialFilters = {};
    filters.forEach((filter) => {
      initialFilters[filter.name] = Array.isArray(selectedFilters[filter.name])
        ? selectedFilters[filter.name]
        : [];
    });
    setLocalSelectedFilters(initialFilters);
  }, [filters, selectedFilters]);

  const toggleFilter = (filterName, value) => {
    setLocalSelectedFilters((prev) => {
      const currentValues = prev[filterName] || [];
      return {
        ...prev,
        [filterName]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleApply = () => {
    const filtersToApply = {};
    filters.forEach((filter) => {
      filtersToApply[filter.name] = Array.isArray(
        localSelectedFilters[filter.name]
      )
        ? localSelectedFilters[filter.name]
        : [];
    });
    onApply(filtersToApply);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    const initialFilters = {};
    filters.forEach((filter) => {
      initialFilters[filter.name] = selectedFilters[filter.name] || [];
    });
    setLocalSelectedFilters(initialFilters);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    const initialFilters = {};
    filters.forEach((filter) => {
      initialFilters[filter.name] = []; // Скидаємо фільтри до пустого масиву
    });
    setLocalSelectedFilters(initialFilters); // Оновлюємо локальні фільтри
  };

  // Перевірка на наявність вибраних фільтрів
  const hasSelectedFilters = Object.values(localSelectedFilters).some(
    (filter) => filter.length > 0
  );

  // Calculate the total number of applied filters
  const appliedFiltersCount = Object.values(selectedFilters).reduce(
    (acc, filter) => acc + filter.length,
    0
  );

  return (
    <div>
      <div className={styles.filterButton} onClick={() => setIsModalOpen(true)}>
        {t('filter')}
        {appliedFiltersCount > 0 && (
          <span className={styles.filterBadge}>{appliedFiltersCount}</span>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{t('filter')}</h2>
            <div className={styles.scrollContainer}>
              {filters.map((filter) => (
                <div key={filter.name}>
                  <h3>{t(filter.label)}:</h3>
                  <div className={styles.checkboxGroup}>
                    {filter.options.map((option) => (
                      <div key={option} className={styles.checkboxItem}>
                        <input
                          type="checkbox"
                          id={option}
                          checked={
                            localSelectedFilters[filter.name]?.includes(
                              option
                            ) || false
                          }
                          onChange={() => toggleFilter(filter.name, option)}
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button onClick={handleApply}>{t('apply')}</button>
              <button onClick={handleReset} disabled={!hasSelectedFilters}>
                {t('reset')}
              </button>
              <button onClick={handleClose}>{t('cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCategoryLevel;
