import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FooterComponent from '../../components/UI/FooterComponent';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'context/UserContext';
import GooglePayButton from '@google-pay/button-react';
import { toast } from 'react-toastify';
import { addSubscription } from 'api/apiPremium';
import { fetchUserProfile } from 'api/apiUser';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

function BuyPremium() {
  const { t } = useTranslation();
  const { isPremium } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePaymentSuccess = async (paymentRequest) => {
    try {
      const response = await addSubscription();

      if (response.success) {
        closeModal();
        toast.success(t('Successfully upgraded to a premium account!'));

        try {
          const profileData = await fetchUserProfile();
          //console.log(profileData);

          // Проверяем тип подписки и обновляем localStorage
          if (profileData.subscription_type === 'premium') {
            localStorage.isPremium = true;
          } else {
            localStorage.isPremium = false;
          }
        } catch (fetchError) {
          console.error('Error fetching user profile:', fetchError);
          toast.error(t('Failed to retrieve profile data.'));
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(t('Failed to upgrade to a premium account. Try again.'));
      console.error('Error during subscription:', error);
    }
  };

  return (
    <div className={styles.premiumPage}>
      <div className={styles.header}>
        <div>PrepWise</div>
      </div>

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

          <div className={styles.subscriptionOptions}>
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
            </motion.div>

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
              <motion.button
                className={styles.secondButton}
                onClick={openModal}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 0, 0.8)',
                }}
                transition={{ duration: 0.2 }}
              >
                {t('get_prepwise_premium')}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal for Payment Options */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={styles.column}>
          <h3>{t('Choose a payment method')}</h3>
          {isPremium && (
            <h6>
              {t('You already have a subscription, but you can renew it')}
            </h6>
          )}
          <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: 'CARD',
                  parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                  },
                  tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                      gateway: 'example',
                      gatewayMerchantId: 'exampleGatewayMerchantId',
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: '12345678901234567890',
                merchantName: 'Demo Merchant',
              },
              transactionInfo: {
                totalPriceStatus: 'FINAL',
                totalPriceLabel: 'Total',
                totalPrice: '1.99',
                currencyCode: 'USD',
                countryCode: 'US',
              },
            }}
            onLoadPaymentData={handlePaymentSuccess} // Викликаємо обробник після успішної оплати
          />
        </div>
      </Modal>

      <FooterComponent />
    </div>
  );
}

export default BuyPremium;
