import React, { useState } from 'react';
import ReactDOM from 'react-dom'; // Підключаємо ReactDOM для створення порталу
import styles from './styles.module.css'; // Підключення CSS файлу
import AvatarMenu from '../AvatarMenu';
import SearchComponent from '../SearchComponent';
import PeoplePage from '../../../pages/PeoplePage';
import { useTranslation } from 'react-i18next'; // Імпортуємо useTranslation
import PlusButton from '../PlusButton';

const HeaderComponent = ({ showSearch, showPlus, showPremium }) => {
  const { t } = useTranslation();
  const [isPeoplePageOpen, setIsPeoplePageOpen] = useState(false);

  const openPeoplePage = () => {
    setIsPeoplePageOpen(true); // Відкриваємо PeoplePage
  };

  const closePeoplePage = () => {
    setIsPeoplePageOpen(false); // Закриваємо PeoplePage
  };

  return (
    <div className={styles.header}>
      <div className={styles['left-group']}>
        <div className={styles.logo}>PrepWise</div>
      </div>

      <div className={styles['right-group']}>
        {showSearch && (
          <div className={styles['search']}>
            <SearchComponent placeholder={t('enter_your_request')} />{' '}
            {/* Переклад для placeholder, якщо потрібно */}
          </div>
        )}

        {showPremium && (
          <div className={styles['premium-box']}>
            <div className={styles['premium-text']}>{t('free_trial')}</div>{' '}
            {/* Використовуємо переклад */}
          </div>
        )}

        {showPlus && <PlusButton />}

        <div className={styles.avatar}>
          <AvatarMenu onOpenPeoplePage={openPeoplePage} />
        </div>
      </div>

      {/* Використовуємо портал для рендерингу модального вікна за межами HeaderComponent */}
      {isPeoplePageOpen &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <PeoplePage username="sofiyalev06" onClose={closePeoplePage} />
            </div>
          </div>,
          document.body // рендеримо модальне вікно в body, щоб воно було поверх всього
        )}
    </div>
  );
};

export default HeaderComponent;
