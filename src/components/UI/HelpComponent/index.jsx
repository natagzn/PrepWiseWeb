import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import AskFriendsForHelp from '../AskFriendsForHelp';
import AnswersModal from '../AnswersHelpQuestion';
import { useTranslation } from 'react-i18next';

function HelpComponent({ userId, questionId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const { t } = useTranslation();
  const helpRef = useRef(null); // Реф для HelpComponent

  const toggleWindow = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    if (option === 'option1') {
      setShowModal(true);
    } else if (option === 'option2') {
      setShowAnswersModal(true);
    }
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseAnswersModal = () => {
    setShowAnswersModal(false);
  };

  // Обробник для закриття компонента при кліку поза межами
  const handleClickOutside = (event) => {
    if (helpRef.current && !helpRef.current.contains(event.target)) {
      setIsOpen(false); // Закриваємо вікно опцій
      setShowModal(false); // Закриваємо модальне вікно запиту допомоги
      setShowAnswersModal(false); // Закриваємо модальне вікно відповідей
    }
  };

  useEffect(() => {
    // Додаємо обробник подій при монтуванні компонента
    document.addEventListener('mousedown', handleClickOutside);

    // Очищення обробника подій при розмонтуванні
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.helpComponent} ref={helpRef}>
      <img src="/icons/help.svg" alt="help" onClick={toggleWindow} />

      {isOpen && (
        <div className={styles.optionsWindow}>
          <div
            className={styles.optionButton}
            onClick={() => handleOptionClick('option1')}
          >
            <img
              src="/icons/people.svg"
              alt="ask for help"
              className={styles.icon}
            />
            {t('Ask for help')}
          </div>
          <div className={styles.separator} />
          <div
            className={styles.optionButton}
            onClick={() => handleOptionClick('option2')}
          >
            <img
              src="/icons/lookAnswer.svg"
              alt="look answer"
              className={styles.icon}
            />
            {t('Look answer')}
          </div>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <AskFriendsForHelp
              userId={userId}
              questionId={questionId}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}

      {showAnswersModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <AnswersModal
              answers={[
                {
                  avatar: '/path/to/avatar1.jpg',
                  username: 'User1',
                  date: '2024-10-29',
                  text: 'This is the first answer.',
                },
                {
                  avatar: '/path/to/avatar2.jpg',
                  username: 'User2',
                  date: '2024-10-29',
                  text: 'This is the second answer.',
                },
              ]}
              onClose={handleCloseAnswersModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpComponent;
