import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

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

  const handleTextChange = (e, setText) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
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

  const handleDelete = () => {
    onDelete(id);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span>{index}</span>
          <FaTrashAlt className={styles.trashIcon} onClick={openModal} />
        </div>
        <div className={styles.inputRow}>
          <div className={styles.inputColumn}>
            <textarea
              className={styles.inputArea}
              placeholder={t('enterQuestion')}
              value={question}
              onChange={(e) => onQuestionChange(e.target.value)}
              ref={questionRef}
              rows={1}
            />
            <label>{t('questionLabel')}</label>
          </div>
          <div className={styles.inputColumn}>
            <textarea
              className={styles.inputArea}
              placeholder={t('enterAnswer')}
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              ref={answerRef}
              rows={1}
            />
            <label>{t('answerLabel')}</label>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={t('confirmDelete')}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <p className={styles.questionModal}>{t('confirmDeleteQuestion')}</p>
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
