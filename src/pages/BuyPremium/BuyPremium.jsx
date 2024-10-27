import React from 'react';
import styles from './BuyPremium.module.css';
import { useTranslation } from 'react-i18next';
import iconBack from './back.svg';
import like from './like.svg';
import { motion } from 'framer-motion';
import FooterComponent from '../../components/UI/FooterComponent/FooterComponent';
import { useNavigate } from 'react-router-dom';

function BuyPremium() {
  const { t } = useTranslation();

  const navigate = useNavigate(); // Initialize navigate

  // Function to handle back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className={styles.premiumPage}>
      {/* Header Block */}
      <div className={styles.header}>
        <div>PrepWise</div>
      </div>

      {/* Premium Info Block */}
      <div className={styles.premiumInfo}>
        <div className={styles.topBar}>
          <img
            src={iconBack}
            className={styles.backIcon}
            alt="back"
            onClick={handleBackClick} // Add click handler
            style={{ cursor: 'pointer' }}
          />
          <h2 className={styles.pageTitle}>
            PrepWise <span>PREMIUM</span>
          </h2>
        </div>

        <div className={styles.mainContent}>
          {/* Left - Premium Features */}
          <div className={styles.featuresList}>
            <h3>{t('you_will_receive')}:</h3>
            <ul>
              <li>
                <img src={like} className={styles.like} alt="like" />
                {t('unlimited_search_results')}
              </li>
              <li>
                <img src={like} className={styles.like} alt="like" />
                {t('unlimited_sets')}
              </li>
              <li>
                <img src={like} className={styles.like} alt="like" />
                {t('unlimited_questions')}
              </li>
              <li>
                <img src={like} className={styles.like} alt="like" />
                {t('share_access')}
              </li>
            </ul>
          </div>

          {/* Right - Subscription Options */}
          <div className={styles.subscriptionOptions}>
            {/* Annual Subscription Block */}
            <motion.div
              className={styles.subscriptionBlock}
              initial={{ opacity: 0, y: 20 }} // Start hidden
              animate={{ opacity: 1, y: 0 }} // Animate to visible
              transition={{ duration: 0.5 }} // Animation duration
            >
              <h4>{t('annual')}</h4>
              <p>{t('billed_annually')}:</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
                $0.99 / {t('month')}
              </p>
              <p>{t('start_with_trial')}</p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(232, 211, 72, 0.8)',
                }} // Change button color on hover
                transition={{ duration: 0.2 }}
              >
                {t('start_free_trial')}
              </motion.button>
            </motion.div>

            {/* Monthly Subscription Block */}
            <motion.div
              className={styles.subscriptionBlock}
              initial={{ opacity: 0, y: 20 }} // Start hidden
              animate={{ opacity: 1, y: 0 }} // Animate to visible
              transition={{ duration: 0.5, delay: 0.2 }} // Animation duration with delay
            >
              <h4>{t('monthly')}</h4>
              <p>{t('amount_billed_today')}:</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
                $1.99 / {t('month')}
              </p>
              <motion.button
                className={styles.secondButton}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 0, 0.8)',
                }} // Change button color on hover
                transition={{ duration: 0.2 }}
              >
                {t('get_prepwise_premium')}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}

export default BuyPremium;
