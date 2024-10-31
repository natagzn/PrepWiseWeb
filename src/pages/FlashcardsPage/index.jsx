import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Flashcard from 'components/UI/Flashcard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FlashcardPage({ setId }) {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [setTitle, setSetTitle] = useState('');
  const [stillLearningCount, setStillLearningCount] = useState(0);
  const [knowCount, setKnowCount] = useState(0);
  const [statusHistory, setStatusHistory] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [flip, setFlip] = useState(false);

  const location = useLocation();
  const { viewOrStudy } = location.state || {};

  const { t } = useTranslation();

  const navigate = useNavigate();

  const onClose = () => {
    navigate(`/lookSet`, {
      state: {
        setId: setId,
      },
    });
  };

  useEffect(() => {
    console.log('Init set');

    // Приклад заголовка, який може прийти з props
    setSetTitle('title');

    // Ініціалізація флешкарток
    const initialFlashcards = [
      {
        id: 0,
        question: 'What is JavaScript?',
        answer: 'A programming language',
        status: 'know',
      },
      {
        id: 1,
        question: 'What is a closure?',
        answer: 'A function with its own lexical scope.',
        status: 'stilllearning',
      },
      {
        id: 2,
        question: 'Explain event delegation.',
        answer: 'A technique to manage events efficiently.',
        status: 'know',
      },
      {
        id: 3,
        question: 'What is a promise?',
        answer:
          'An object representing the eventual completion of an asynchronous operation.',
        status: 'stilllearning',
      },
      {
        id: 4,
        question: 'What is the difference between let and var?',
        answer: 'let is block scoped, var is function scoped.',
        status: 'know',
      },
    ];

    // Перезаписуємо `flashcards` лише з картками `stilllearning`, якщо viewOrStudy === 'study'
    if (viewOrStudy === 'study') {
      setFlashcards(
        initialFlashcards.filter((card) => card.status === 'stilllearning')
      );
    } else {
      setFlashcards(initialFlashcards); // залишаємо всі картки, якщо viewOrStudy не 'study'
    }
  }, [setId, viewOrStudy]);

  const handleStatusChange = (newStatus) => {
    const currentFlashcard = flashcards[currentIndex];
    const oldStatus = currentFlashcard.status;

    // Оновлюємо лічильники
    if (newStatus === 'stilllearning') {
      setStillLearningCount((prev) => prev + 1);
    } else if (newStatus === 'know') {
      setKnowCount((prev) => prev + 1);
    }

    // Оновлюємо статус картки
    setFlashcards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[currentIndex].status = newStatus;
      return updatedCards;
    });

    // Зберігаємо історію статусів
    setStatusHistory((prev) => [
      ...prev,
      { id: currentFlashcard.id, oldStatus, newStatus },
    ]);

    // Імітуємо запит на оновлення статусу в БД
    updateStatusInDB(currentFlashcard.id, newStatus);

    // Переходимо до наступної картки
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % flashcards.length;

      if (newIndex === 0) {
        navigate('/flashcard/result', {
          state: {
            setId: setId,
            stillLearningCount:
              newStatus === 'stilllearning'
                ? stillLearningCount + 1
                : stillLearningCount,
            knowCount: newStatus === 'know' ? knowCount + 1 : knowCount,
            viewOrStudy: viewOrStudy,
          },
        });
      }
      return newIndex;
    });
  };

  const handleNavigateFlashcard = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'prev') {
        // Якщо індекс 0, залишаємося на початковій картці
        return prevIndex === 0 ? 0 : prevIndex - 1;
      } else {
        // Якщо досягнуто останньої картки, перенаправляємо на сторінку результатів
        if (prevIndex + 1 === flashcards.length) {
          navigate('/flashcard/result', {
            state: {
              setId: setId,
              viewOrStudy: viewOrStudy,
              countAll: flashcards.length,
            },
          });
          return prevIndex; // Залишаємо індекс незмінним, бо відбудеться перенаправлення
        }
        // Переходимо до наступної картки
        return prevIndex + 1;
      }
    });
  };

  const updateStatusInDB = (id, newStatus) => {
    console.log(`Updating card ID: ${id} to new status: ${newStatus}`);

    // Імітація асинхронного запиту
    setTimeout(() => {
      console.log(
        `Card ID: ${id} updated successfully to status: ${newStatus} (simulated).`
      );
    }, 1000);
  };

  const handleBack = () => {
    if (statusHistory.length > 0) {
      const lastStatus = statusHistory.pop();

      // Зменшити лічильник для останнього статусу
      if (lastStatus.newStatus === 'stilllearning') {
        setStillLearningCount((prev) => prev - 1);
      } else if (lastStatus.newStatus === 'know') {
        setKnowCount((prev) => prev - 1);
      }

      // Скидання статусу поточної картки
      setFlashcards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[currentIndex].status = undefined; // Скидання статусу
        return updatedCards;
      });

      setStatusHistory([...statusHistory]);

      // Оновлення індексу на попередню картку
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
      );
    }
  };

  const handleRestart = () => {
    setFlashcards((prevCards) => shuffleFlashcards(prevCards));
    setCurrentIndex(0);
    setStillLearningCount(0);
    setKnowCount(0);
    setStatusHistory([]);
    setMenuVisible(false);
  };

  const shuffleFlashcards = (cards) => {
    return cards
      .map((card) => ({ ...card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...card }) => card);
  };

  const progressPercentage = ((currentIndex + 1) / flashcards.length) * 100;
  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className={styles.flashcardPage}>
      {menuVisible && (
        <div className={styles.overlay} onClick={() => setMenuVisible(false)} />
      )}
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className={styles.statusContainer}>
        {viewOrStudy === 'study' && (
          <>
            <div className={styles.statusItem}>
              <div
                className={`${styles.statusCount} ${styles.stillLearningCount}`}
              >
                {stillLearningCount}
              </div>
              <span className={styles.stillLearningText}>
                {t('stillLearning')}
              </span>
            </div>
            <div className={styles.questionProgress}>
              {`${currentIndex + 1} / ${flashcards.length}`}
            </div>
            <div className={styles.statusItem}>
              <span className={styles.knowText}>{t('know')}</span>
              <div className={`${styles.statusCount} ${styles.knowCount}`}>
                {knowCount}
              </div>
            </div>
          </>
        )}
        {viewOrStudy === 'view' && (
          <div className={styles.questionProgress}>
            {`${currentIndex + 1} / ${flashcards.length}`}
          </div>
        )}
      </div>
      {currentFlashcard && (
        <Flashcard flashcard={currentFlashcard} flip={flip} />
      )}
      <footer className={styles.footer}>
        <div className={styles.centerButtons}>
          <div className={styles.flashcard}>
            <img
              src="/icons/flashcards_gray.svg"
              className={styles.footerIcon}
              alt="flashcard"
              onClick={() => setMenuVisible((prev) => !prev)}
            />
            {menuVisible && (
              <div className={styles.menu}>
                {viewOrStudy === 'view' && (
                  <button onClick={handleRestart}>
                    {t('restartFlashcards')}
                  </button>
                )}
                <button onClick={() => setFlip((prev) => !prev)}>
                  {flip ? t('flipToQuestion') : t('flipToAnswer')}
                </button>
                <button onClick={onClose}>{t('closeFlashcards')}</button>
              </div>
            )}
          </div>
          {viewOrStudy === 'study' ? (
            <>
              <button
                className={`${styles.footerButton} ${styles.incorrectButton}`}
                onClick={() => handleStatusChange('stilllearning')}
              >
                X
              </button>
              <button
                className={`${styles.footerButton} ${styles.correctButton}`}
                onClick={() => handleStatusChange('know')}
              >
                ✓
              </button>
              <button
                className={styles.prevQuestionButton}
                onClick={handleBack}
              >
                <img
                  src="icons/back_black.svg"
                  alt="Previous"
                  className={styles.icon}
                />
              </button>
            </>
          ) : (
            <>
              <button
                className={`${styles.footerButton} ${styles.navButton}`}
                onClick={() => handleNavigateFlashcard('prev')}
              >
                &lt;
              </button>
              <button
                className={`${styles.footerButton} ${styles.navButton}`}
                onClick={() => handleNavigateFlashcard('next')}
              >
                &gt;
              </button>
              <div className={styles.buttonEmpty}></div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}

export default FlashcardPage;
