import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

// Фіктивна функція для отримання підписок на основі user_id
const fetchSubscriptions = (user_id) => {
  // Приклад фіктивних даних
  const subscriptions = {
    currentSubscription:
      user_id === 2 ? { purchaseDate: '2024-10-15', type: 'monthly' } : null,
    previousSubscriptions:
      user_id === 2
        ? [
            { purchaseDate: '2024-05-01', type: 'monthly' },
            { purchaseDate: '2023-12-01', type: 'annual' },
            { purchaseDate: '2023-11-01', type: 'monthly' },
          ]
        : [],
  };
  return new Promise((resolve) => {
    setTimeout(() => resolve(subscriptions), 500);
  });
};

const InfoPremiumModal = ({ isOpen, onClose, user_id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [previousSubscriptions, setPreviousSubscriptions] = useState([]);

  useEffect(() => {
    if (user_id) {
      fetchSubscriptions(user_id).then(
        ({ currentSubscription, previousSubscriptions }) => {
          setCurrentSubscription(currentSubscription);
          setPreviousSubscriptions(previousSubscriptions);
        }
      );
    }
  }, [user_id]);

  const handleViewSubscriptions = () => {
    navigate('/lookPremium');
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // Зупиняємо клік на модальному вікні від закриття
      >
        <div className={styles.subscriptionContent}>
          <h2>{t('current_subscription')}</h2>
          {/* Поточна підписка */}
          {currentSubscription ? (
            <div className={styles.subscriptionBlock}>
              <p>
                {t('purchase_date')}: {currentSubscription.purchaseDate}
              </p>
              <p>
                {t('subscription_type')}: {t(currentSubscription.type)}
              </p>
            </div>
          ) : (
            <p>{t('no_current_subscription')}</p>
          )}

          <h3>{t('previous_subscriptions')}</h3>

          {/* Попередні підписки */}
          {previousSubscriptions && previousSubscriptions.length > 0 ? (
            previousSubscriptions.map((sub, index) => (
              <div key={index} className={styles.subscriptionBlock}>
                <p>
                  {t('purchase_date')}: {sub.purchaseDate}
                </p>
                <p>
                  {t('subscription_type')}: {t(sub.type)}
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
