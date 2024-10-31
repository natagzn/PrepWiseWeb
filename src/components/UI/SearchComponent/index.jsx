import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

const SearchComponent = ({ placeholder, onClick }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (inputValue.trim() === '') {
      onClick(''); // Передаємо порожній рядок для очищення результатів
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onClick(inputValue); // Викликаємо onClick при натисканні Enter
    }
  };

  return (
    <div className={styles['search-box']}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown} // Додаємо обробник onKeyDown
        placeholder={inputValue ? '' : placeholder}
        className={styles['search-input']}
      />
      <div
        className={styles['search-icon']}
        onClick={() => onClick(inputValue)}
      ></div>
    </div>
  );
};

export default SearchComponent;
