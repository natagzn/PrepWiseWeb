import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { getUserSubscriptions } from 'api/apiPremium';
import { formatDate } from 'components/formatDate';

const InfoPremiumModal = ({ isOpen, onClose, user_id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [previousSubscriptions, setPreviousSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await getUserSubscriptions();
      if (response.success) {
        const today = new Date();
        const activeSubscriptions = response.message.subscriptionDetails;
        console.log('res', response);

        // Определяем текущую подписку и предыдущие подписки
        const current = activeSubscriptions.find((sub) => {
          const endDate = new Date(sub.endDate);
          const startDate = new Date(sub.startDate);
          return startDate <= today && today <= endDate;
        });

        const previous = activeSubscriptions.filter((sub) => {
          const endDate = new Date(sub.endDate);
          return endDate < today;
        });

        setCurrentSubscription(current);
        setPreviousSubscriptions(previous);
      } else {
        console.error('Failed to fetch subscriptions:', response.message);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleViewSubscriptions = () => {
    navigate('/lookPremium');
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.subscriptionContent}>
          <h2>{t('current_subscription')}</h2>
          {/* Текущая подписка */}
          {currentSubscription ? (
            <div className={styles.subscriptionBlock}>
              <p>
                {t('purchase_date')}:{' '}
                {formatDate(currentSubscription.startDate)}
              </p>
              <p>
                {t('subscription_type')}: {t(currentSubscription.typeName)}
              </p>
              <p>
                {t('end_date')}: {formatDate(currentSubscription.endDate)}
              </p>
            </div>
          ) : (
            <p>{t('no_current_subscription')}</p>
          )}

          <h3>{t('previous_subscriptions')}</h3>
          {/* інші */}
          {previousSubscriptions && previousSubscriptions.length > 0 ? (
            previousSubscriptions.map((sub, index) => (
              <div key={index} className={styles.subscriptionBlock}>
                <p>
                  {t('purchase_date')}: {formatDate(sub.startDate)}
                </p>
                <p>
                  {t('subscription_type')}: {t(sub.typeName)}
                </p>
                <p>
                  {t('end_date')}: {formatDate(sub.endDate)}
                </p>
              </div>
            ))
          ) : (
            <p>{t('no_previous_subscriptions')}</p>
          )}
        </div>
        <button onClick={handleViewSubscriptions} className={styles.viewButton}>
          {t('view_subscriptions')}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default InfoPremiumModal;
