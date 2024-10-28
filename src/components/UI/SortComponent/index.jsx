import React, { useState } from 'react';
import styles from './styles.module.css';

const SortComponent = ({ sortingOptions, onSortChange }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false); // Стан для контролю видимості опцій
  const [selectedOption, setSelectedOption] = useState(sortingOptions[0]); // Стан для зберігання вибраної опції

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible((prev) => !prev); // Перемикаємо видимість
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Оновлюємо вибрану опцію
    onSortChange(option.value); // Викликаємо функцію для зміни сортування
    toggleOptionsVisibility(); // Закриваємо опції після вибору
  };

  return (
    <div className={styles.sortContainer}>
      <div className={styles.optionLabel} onClick={toggleOptionsVisibility}>
        {selectedOption.label}
      </div>
      <img
        src="/icons/open.svg"
        alt="Open"
        className={styles.openIcon}
        onClick={toggleOptionsVisibility}
      />

      {isOptionsVisible && (
        <div className={styles.sortOptionsContainer}>
          {sortingOptions.map((option, index) => (
            <div key={index}>
              <div
                className={styles.sortOption}
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
              {index < sortingOptions.length - 1 && (
                <div className={styles.separator} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortComponent;
