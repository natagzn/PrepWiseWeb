import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import AvatarMenu from '../AvatarMenu';
import SearchComponent from '../SearchComponent';
import PeoplePage from '../../../pages/PeoplePage';
import { useTranslation } from 'react-i18next';
import PlusButton from '../PlusButton';
import CalendarComponent from '../CalendarModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HeaderComponent = ({ showSearch, showPlus, showPremium }) => {
  const { t } = useTranslation();
  const [isPeoplePageOpen, setIsPeoplePageOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const navigate = useNavigate();

  const openPeoplePage = () => {
    setIsPeoplePageOpen(true);
  };

  const closePeoplePage = () => {
    setIsPeoplePageOpen(false);
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  const handleSearch = (searchTerm) => {
    const invalidCharacters = /[\/\\.#?]/; // Регулярний вираз для символів "/", "\", ".", "#" і "?"

    if (searchTerm.trim() === '') {
      toast.error(t('enter_your_request'));
    } else if (invalidCharacters.test(searchTerm)) {
      toast.error(t('special_characters_not_allowed'));
    } else {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles['left-group']}>
        <div className={styles.logo}>PrepWise</div>
      </div>

      <div className={styles['right-group']}>
        {showSearch && (
          <div className={styles['search']}>
            <SearchComponent
              placeholder={t('enter_your_request')}
              onClick={handleSearch}
            />
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
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default HeaderComponent;
