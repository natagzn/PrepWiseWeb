import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

const SortComponent = ({ sortingOptions, onSortChange }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortingOptions[0]);
  const optionsRef = useRef(null);

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSortChange(option.value);
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setIsOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.sortContainer}
      ref={optionsRef}
      onClick={toggleOptionsVisibility}
    >
      <div className={styles.optionLabel}>{selectedOption.label}</div>
      <img
        src="/icons/SortComponent/open.svg"
        alt="Open"
        className={styles.openIcon}
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
