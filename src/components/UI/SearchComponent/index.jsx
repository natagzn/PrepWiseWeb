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
      onClick('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onClick(inputValue);
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
        onKeyDown={handleKeyDown}
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
