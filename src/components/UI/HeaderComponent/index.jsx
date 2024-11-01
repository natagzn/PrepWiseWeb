import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import AvatarMenu from '../AvatarMenu';
import SearchComponent from '../SearchComponent';
import PeoplePage from '../../../pages/PeoplePage';
import { useTranslation } from 'react-i18next';
import PlusButton from '../PlusButton';
import Calendar from 'react-calendar';
import CalendarModal from '../CalendarModal';
import CalendarComponent from '../CalendarModal';

const HeaderComponent = ({ showSearch, showPlus, showPremium }) => {
  const { t } = useTranslation();
  const [isPeoplePageOpen, setIsPeoplePageOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Додаємо стан для календаря

  const openPeoplePage = () => {
    setIsPeoplePageOpen(true);
  };

  const closePeoplePage = () => {
    setIsPeoplePageOpen(false);
  };

  const openCalendar = () => {
    setIsCalendarOpen(true); // Відкриваємо календар
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false); // Закриваємо календар
  };

  return (
    <div className={styles.header}>
      <div className={styles['left-group']}>
        <div className={styles.logo}>PrepWise</div>
      </div>

      <div className={styles['right-group']}>
        {showSearch && (
          <div className={styles['search']}>
            <SearchComponent placeholder={t('enter_your_request')} />
          </div>
        )}

        {showPremium && (
          <div className={styles['premium-box']}>
            <div className={styles['premium-text']}>{t('free_trial')}</div>
          </div>
        )}

        {showPlus && <PlusButton />}

        <div className={styles.avatar}>
          <AvatarMenu
            onOpenPeoplePage={openPeoplePage}
            onOpenCalendarModal={openCalendar}
          />{' '}
          {/* Передаємо пропс для відкриття календаря */}
        </div>
      </div>

      {isPeoplePageOpen &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <PeoplePage username="sofiyalev06" onClose={closePeoplePage} />
            </div>
          </div>,
          document.body
        )}

      {isCalendarOpen &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <CalendarComponent onClose={closeCalendar} />{' '}
              {/* Ваше модальне вікно календаря */}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default HeaderComponent;
