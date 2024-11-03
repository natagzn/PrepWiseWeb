import React from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FooterComponent from '../../components/UI/FooterComponent';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'context/UserContext';

function BuyPremium() {
  const { t } = useTranslation();
  const { isPremium } = useUser();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
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
            src="/icons/back.svg"
            className={styles.backIcon}
            alt="back"
            onClick={handleBackClick}
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
                <img src="/icons/like.svg" className={styles.like} alt="like" />
                {t('unlimited_search_results')}
              </li>
              <li>
                <img src="/icons/like.svg" className={styles.like} alt="like" />
                {t('unlimited_sets')}
              </li>
              <li>
                <img src="/icons/like.svg" className={styles.like} alt="like" />
                {t('unlimited_questions')}
              </li>
              <li>
                <img src="/icons/like.svg" className={styles.like} alt="like" />
                {t('share_access')}
              </li>
            </ul>
          </div>

          {/* Right - Subscription Options */}
          <div className={styles.subscriptionOptions}>
            {/* Annual Subscription Block */}
            <motion.div
              className={styles.subscriptionBlock}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4>{t('annual')}</h4>
              <p>{t('billed_annually')}:</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
                $0.99 / {t('month')}
              </p>

              {!isPremium && (
                <>
                  <p>{t('start_with_trial')}</p>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(232, 211, 72, 0.8)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {t('start_free_trial')}
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* Monthly Subscription Block */}
            <motion.div
              className={styles.subscriptionBlock}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4>{t('monthly')}</h4>
              <p>{t('amount_billed_today')}:</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
                $1.99 / {t('month')}
              </p>
              {!isPremium && (
                <motion.button
                  className={styles.secondButton}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 0, 0.8)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {t('get_prepwise_premium')}
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}

export default BuyPremium;
