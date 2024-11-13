// AboutSection/index.jsx
import React from 'react';
import styles from './styles.module.css';
import { motion } from 'framer-motion';

const AboutSection = ({ handleOnClick }) => {
  return (
    <div className={styles.container}>
      <img
        src="/img/background.png"
        alt="Background"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay}>
        <div className={styles.text}>
          Experience a new era of interview preparation. Our platform will help
          you organize and store all the essential questions and resources for
          successfully acing your interviews.
        </div>
        <motion.button
          className={styles.signupButton}
          whileHover={{
            scale: 1.05,
            backgroundColor: 'rgba(232, 211, 72, 0.8)', // аналогічна анімація для кнопки "Sign up"
          }}
          transition={{ duration: 0.2 }}
          onClick={handleOnClick}
        >
          Sign up
        </motion.button>
      </div>
    </div>
  );
};

export default AboutSection;
