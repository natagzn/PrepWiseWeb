import React, { useState } from 'react';
import styles from './styles.module.css';
import AskFriendsForHelp from '../AskFriendsForHelp'; // Імпорт компонента модального вікна
import AnswersModal from '../AnswersHelpQuestion';

function HelpComponent({ userId, questionId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Стан для відображення модального вікна запиту допомоги
  const [showAnswersModal, setShowAnswersModal] = useState(false); // Стан для відображення модального вікна відповідей

  const toggleWindow = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    if (option === 'option1') {
      setShowModal(true); // Відкриваємо модальне вікно запиту допомоги
    } else if (option === 'option2') {
      setShowAnswersModal(true); // Відкриваємо модальне вікно відповідей
    }
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Закриваємо модальне вікно запиту допомоги
  };

  const handleCloseAnswersModal = () => {
    setShowAnswersModal(false); // Закриваємо модальне вікно відповідей
  };

  return (
    <div className={styles.helpComponent}>
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
            Ask for help
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
            Look answer
          </div>
        </div>
      )}

      {/* Модальне вікно запиту допомоги */}
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

      {/* Модальне вікно відповідей */}
      {showAnswersModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <AnswersModal
              answers={[
                // Тут ви можете замінити на фактичні дані відповідей
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
