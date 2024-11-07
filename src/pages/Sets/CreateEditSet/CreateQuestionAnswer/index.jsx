import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

// Встановлює елемент кореня для модального вікна (дозволяє читання з #root)
Modal.setAppElement('#root');

const CreateQuestionAnswer = ({
  question,
  answer,
  onDelete,
  onQuestionChange,
  onAnswerChange,
  index,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Функція для динамічного налаштування висоти textarea
    const updateHeight = (ref) => {
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    };
    updateHeight(questionRef);
    updateHeight(answerRef);
  }, [question, answer]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  // Видаляє питання/відповідь і закриває модальне вікно
  const handleDelete = () => {
    onDelete(id);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span>{index}</span>
          <FaTrashAlt className={styles.trashIcon} onClick={openModal} />{' '}
        </div>

        {/* Рядок для введення питання та відповіді */}
        <div className={styles.inputRow}>
          {/* Колонка для введення питання */}
          <div className={styles.inputColumn}>
            <textarea
              className={styles.inputArea}
              placeholder={t('enterQuestion')}
              value={question}
              onChange={(e) => onQuestionChange(e.target.value)}
              ref={questionRef} // Реф для автозміни висоти
              rows={1} // Початкова кількість рядків
            />
            <label>{t('questionLabel')}</label>
          </div>

          {/* Колонка для введення відповіді */}
          <div className={styles.inputColumn}>
            <textarea
              className={styles.inputArea}
              placeholder={t('enterAnswer')}
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              ref={answerRef} // Реф для автозміни висоти
              rows={1} // Початкова кількість рядків
            />
            <label>{t('answerLabel')}</label>
          </div>
        </div>
      </div>

      {/* Модальне вікно підтвердження видалення */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={t('confirmDelete')}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <p className={styles.questionModal}>{t('confirmDeleteQuestion')}</p>{' '}
        {/* Текст підтвердження */}
        <div className={styles.blockButtonsConfirm}>
          <button onClick={handleDelete} className={styles.confirmButton}>
            {t('yes')}
          </button>
          <button onClick={closeModal} className={styles.cancelButton}>
            {t('no')}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateQuestionAnswer;
