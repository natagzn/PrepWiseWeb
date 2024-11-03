import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import SelectSetModal from './SelectSetModal';
import { toast } from 'react-toastify';

const CreateQuestion = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedSet, setSelectedSet] = useState(''); // Стан для вибору сету
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false); // Стан для модального вікна
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const { t } = useTranslation();

  const maxRows = 4;

  const handleTextChange = (e, setText, ref) => {
    const value = e.target.value;
    setText(value);

    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
    const lineHeight = parseInt(
      window.getComputedStyle(ref.current).lineHeight
    );
    const maxHeight = maxRows * lineHeight;
    if (ref.current.scrollHeight > maxHeight) {
      ref.current.style.height = `${maxHeight}px`;
      ref.current.style.overflowY = 'auto';
    } else {
      ref.current.style.overflowY = 'hidden';
    }
  };

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.style.height = 'auto';
      questionRef.current.style.height = `${questionRef.current.scrollHeight}px`;
    }
    if (answerRef.current) {
      answerRef.current.style.height = 'auto';
      answerRef.current.style.height = `${answerRef.current.scrollHeight}px`;
    }
  }, []);

  const handleCreate = () => {
    if (!question.trim()) {
      toast.error(t('Question is required!'));
      return;
    }

    toast.success(t('Question created successfully!'));
    console.log('Question:', question);
    console.log('Answer:', answer);
    console.log('Selected Set:', selectedSet);
    onClose();
  };

  const handleClose = () => {
    setAnswer('');
    setQuestion('');
    setSelectedSet(''); // Скидаємо вибраний сет
    onClose();
  };

  const handleSelectSet = (setName) => {
    setSelectedSet(setName); // Оновлюємо вибраний сет
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>{t('New question')}</h2>
        <div className={styles.inputGroup}>
          <textarea
            ref={questionRef}
            value={question}
            onChange={(e) => handleTextChange(e, setQuestion, questionRef)}
            placeholder={t('Enter your question')}
            className={styles.textarea}
            rows={1}
            style={{ maxHeight: `${maxRows * 1.5}em` }}
          />
          <label>{t('Question')}</label>
        </div>
        <div className={styles.inputGroup}>
          <textarea
            ref={answerRef}
            value={answer}
            onChange={(e) => handleTextChange(e, setAnswer, answerRef)}
            placeholder={t('Enter your answer')}
            className={styles.textarea}
            rows={1}
            style={{ maxHeight: `${maxRows * 1.5}em` }}
          />
          <label>{t('Answer')}</label>
        </div>
        <div className={styles.footer}>
          <div className={styles.chooseSet}>
            <button onClick={() => setIsSelectModalOpen(true)}>
              {selectedSet ? selectedSet : t('Choose set')}
            </button>
            <SelectSetModal
              isOpen={isSelectModalOpen}
              onClose={() => setIsSelectModalOpen(false)}
              onSelect={handleSelectSet}
            />
          </div>
          <div className={styles.buttonBlock}>
            <button className={styles.createButton} onClick={handleCreate}>
              {t('Create')}
            </button>
            <button className={styles.cancelButton} onClick={handleClose}>
              {t('Cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CreateQuestion;
