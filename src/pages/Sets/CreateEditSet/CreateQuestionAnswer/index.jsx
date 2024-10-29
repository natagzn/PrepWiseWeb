import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

Modal.setAppElement('#root');

const CreateQuestionAnswer = ({ id, index, onDelete }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const questionRef = useRef(null);
  const answerRef = useRef(null);

  const { t } = useTranslation();

  const handleTextChange = (e, setText) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const updateHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const questionObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => updateHeight(questionRef));
    });

    const answerObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => updateHeight(answerRef));
    });

    if (questionRef.current) {
      questionObserver.observe(questionRef.current);
    }

    if (answerRef.current) {
      answerObserver.observe(answerRef.current);
    }

    return () => {
      questionObserver.disconnect();
      answerObserver.disconnect();
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span>{index}</span> {/* Відображення порядкового номера */}
          <FaTrashAlt className={styles.trashIcon} onClick={openModal} />
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputColumn}>
            <textarea
              className={styles.inputArea}
              placeholder={t('Enter a question')}
              value={question}
              onChange={(e) => handleTextChange(e, setQuestion)}
              ref={questionRef}
              rows={1}
            />
            <label>{t('Question')}</label>
          </div>

          <div className={styles.inputColumn}>
            <textarea
              className={styles.inputArea}
              placeholder={t('Enter an answer')}
              value={answer}
              onChange={(e) => handleTextChange(e, setAnswer)}
              ref={answerRef}
              rows={1}
            />
            <label>{t('Answer')}</label>
          </div>
        </div>
      </div>

      {/* Модальне вікно для підтвердження видалення */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <p className={styles.questionModal}>Чи ви дійсно хочете видалити?</p>
        <div className={styles.blockButtonsConfirm}>
          <button onClick={handleDelete} className={styles.confirmButton}>
            Так
          </button>
          <button onClick={closeModal} className={styles.cancelButton}>
            Ні
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateQuestionAnswer;
