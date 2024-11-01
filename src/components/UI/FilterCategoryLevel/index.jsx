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
            <h2>{t('filter')}</h2>
            {filters.map((filter) => (
              <div key={filter.name}>
                <h3>{t(filter.label)}:</h3>
                <div className={styles.checkboxGroup}>
                  {' '}
                  {/* Новий контейнер для checkbox'ів */}
                  {filter.options.map((option) => (
                    <div key={option} className={styles.checkboxItem}>
                      {' '}
                      {/* Доданий клас для кожного checkbox'а */}
                      <input
                        type="checkbox"
                        id={option} // додайте id для зв'язування з label
                        checked={
                          localSelectedFilters[filter.name]?.includes(option) ||
                          false
                        }
                        onChange={() => toggleFilter(filter.name, option)}
                      />
                      <label htmlFor={option}>{option}</label>{' '}
                      {/* Використання label для покращення доступності */}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className={styles.modalActions}>
              <button onClick={handleApply}>{t('apply')}</button>
              <button onClick={handleClose}>{t('cancel')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCategoryLevel;
