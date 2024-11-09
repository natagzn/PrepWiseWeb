import React, { useRef, useState } from 'react';
import styles from './styles.module.css';
import { motion } from 'framer-motion';

const SearchComponent = ({ placeholder, onClick, onEnter }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (typeof onEnter !== 'undefined') {
      onEnter(e.target.value);
    }
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
      <motion.div
        className={styles['search-icon']}
        onClick={() => onClick(inputValue)}
        animate={{
          scale: inputValue ? 1.3 : 1, // Збільшуємо іконку на 30%, якщо є введений текст
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      ></motion.div>
    </div>
  );
};

export default SearchComponent;
