import React from 'react';
import { motion } from 'framer-motion'; // Імпортуємо motion для анімацій
import styles from './styles.module.css';

const OurMainFeatures = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Our main features</div>
      <div className={styles.featuresWrapper}>
        {[
          {
            icon: 'icon1.svg',
            title: 'Create lists of questions',
            description: 'Easily create and organize lists of questions.',
          },
          {
            icon: 'icon2.svg',
            title: 'Resources for study',
            description: 'Access to useful materials and recommendations.',
          },
          {
            icon: 'icon3.svg',
            title: 'Profile management',
            description:
              'Profile settings, avatar, friends, and subscriptions.',
          },
          {
            icon: 'icon4.svg',
            title: 'Search and filtering',
            description:
              'Convenient search and filtering by categories and materials.',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className={styles.featureItem}
            whileHover={{ scale: 1.05 }} // Анімація збільшення при наведенні
            transition={{ duration: 0.3 }} // Час анімації
          >
            <img
              className={styles.icon}
              src={`/icons/${feature.icon}`} // Динамічно підключаємо іконки
              alt={feature.title}
            />
            <div className={styles.featureText}>
              <div className={styles.featureTitle}>{feature.title}</div>
              <div className={styles.featureDescription}>
                {feature.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurMainFeatures;
