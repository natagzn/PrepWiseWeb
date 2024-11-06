import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Flashcard from 'components/UI/Flashcard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { updateQuestionStatus } from 'api/apiSet';

function FlashcardPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stillLearningCount, setStillLearningCount] = useState(0);
  const [knowCount, setKnowCount] = useState(0);
  const [statusHistory, setStatusHistory] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [flip, setFlip] = useState(false);

  const location = useLocation();
  const { viewOrStudy, initialFlashcards, setId, setTitle } =
    location.state || {};
  console.log('Initial:', initialFlashcards);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const onClose = () => {
    navigate(`/lookSet/${setId}`);
  };

  useEffect(() => {
    setFlashcards((prevCards) =>
      shuffleFlashcards(
        viewOrStudy === 'study'
          ? initialFlashcards.filter((card) => card.status === false)
          : initialFlashcards
      )
    );
  }, [initialFlashcards, viewOrStudy]);

  const handleStatusChange = (newStatus) => {
    const currentFlashcard = flashcards[currentIndex];
    const oldStatus = currentFlashcard.status;

    // Оновлюємо лічильники
    if (newStatus === false) {
      setStillLearningCount((prev) => prev + 1);
    } else if (newStatus === true) {
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
      { question_id: currentFlashcard.question_id, oldStatus, newStatus },
    ]);

    // Імітуємо запит на оновлення статусу в БД
    updateStatusInDB(currentFlashcard.question_id, newStatus);

    // Переходимо до наступної картки
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % flashcards.length;

      if (newIndex === 0) {
        navigate('/flashcard/result', {
          state: {
            setId: setId,
            stillLearningCount:
              newStatus === false ? stillLearningCount + 1 : stillLearningCount,
            knowCount: newStatus === true ? knowCount + 1 : knowCount,
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
              setTitle: setTitle,
            },
          });
          return prevIndex; // Залишаємо індекс незмінним, бо відбудеться перенаправлення
        }
        // Переходимо до наступної картки
        return prevIndex + 1;
      }
    });
  };

  const updateStatusInDB = async (question_id, newStatus) => {
    console.log(`Updating card ID: ${question_id} to new status: ${newStatus}`);

    try {
      // Викликаємо функцію updateQuestionStatus для оновлення статусу
      const result = await updateQuestionStatus(question_id, newStatus);

      // Виводимо результат успішного оновлення
      console.log(
        `Card ID: ${question_id} updated successfully to status: ${newStatus}.`,
        result
      );
    } catch (error) {
      // Виводимо помилку, якщо виникла
      console.error(`Failed to update card ID: ${question_id}.`, error);
    }
  };

  const handleBack = () => {
    if (statusHistory.length > 0) {
      const lastStatus = statusHistory.pop();

      // Зменшити лічильник для останнього статусу
      if (lastStatus.newStatus === false) {
        setStillLearningCount((prev) => prev - 1);
      } else if (lastStatus.newStatus === true) {
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
                onClick={() => handleStatusChange(false)}
              >
                X
              </button>
              <button
                className={`${styles.footerButton} ${styles.correctButton}`}
                onClick={() => handleStatusChange(true)}
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
