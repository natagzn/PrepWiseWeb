// index.jsx
import React from 'react';
import styles from './styles.module.css';
import { motion } from 'framer-motion'; // імпортуємо motion

const Header = ({ handleOnClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>PrepWise</div>
      <nav className={styles.nav}>
        <div className={styles.navItem}>Home</div>
        <div className={styles.navItem}>Our features</div>
        <div className={styles.navItem}>Digital cards</div>
        <div className={styles.navItem}>Premium</div>
      </nav>
      <motion.div
        className={styles.loginButton}
        whileHover={{
          scale: 1.05,
          backgroundColor: 'rgba(232, 211, 72, 0.8)', // аналогічна анімація для світлішої кнопки
        }}
        transition={{ duration: 0.2 }}
        onClick={handleOnClick}
      >
        <span>Log in</span>
      </motion.div>
    </header>
  );
};

export default Header;
