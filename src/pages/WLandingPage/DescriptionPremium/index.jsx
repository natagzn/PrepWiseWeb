import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const DescriptionPremium = ({ handleOnClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerText}>PrepWise</div>
          <div className={styles.premiumText}>PREMIUM</div>
        </div>
        <div className={styles.description}>
          <div className={styles.descriptionText}>You will receive:</div>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <img src="/icons/like.svg" className={styles.marker} alt="like" />
              <div className={styles.listText}>unlimited search results</div>
            </div>
            <div className={styles.listItem}>
              <img src="/icons/like.svg" className={styles.marker} alt="like" />
              <div className={styles.listText}>unlimited sets</div>
            </div>
            <div className={styles.listItem}>
              <img src="/icons/like.svg" className={styles.marker} alt="like" />
              <div className={styles.listText}>
                unlimited number of questions in the set
              </div>
            </div>
            <div className={styles.listItem}>
              <img src="/icons/like.svg" className={styles.marker} alt="like" />
              <div className={styles.listText}>
                the ability to share access to the set
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightBlock}>
        <div className={styles.subscriptionOptions}>
          <motion.div
            className={styles.subscriptionBlock}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleOnClick}
          >
            <h4>Annual</h4>
            <p>Billed annually at US$11.99, that’s like:</p>
            <p style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
              $0.99 / month
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(232, 211, 72, 0.8)',
              }}
              transition={{ duration: 0.2 }}
            >
              Start Free Trial
            </motion.button>
          </motion.div>

          <motion.div
            className={styles.subscriptionBlock}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={handleOnClick}
          >
            <h4>Monthly</h4>
            <p>Amount billed today:</p>
            <p style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
              $1.99 / month
            </p>
            <motion.button
              className={styles.secondButton}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 0, 0.8)',
              }}
              transition={{ duration: 0.2 }}
            >
              Get PrepWise Premium
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPremium;
