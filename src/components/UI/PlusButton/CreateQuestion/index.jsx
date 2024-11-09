import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import SelectSetModal from './SelectSetModal';
import { createQuestion } from 'api/apiSet';
import { toast } from 'react-toastify';

const CreateQuestion = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedSet, setSelectedSet] = useState('');
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
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
    ref.current.style.overflowY =
      ref.current.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  const handleCreate = async () => {
    if (!question.trim() || !selectedSet) {
      toast.error(t('All fields are required!'));
      return;
    }

    setLoading(true);
    try {
      console.log('selectedSet', selectedSet);
      const result = await createQuestion(selectedSet.id, { question, answer });
      if (result.success) {
        toast.success(t('Question created successfully!'));
        handleClose();
      } else {
        toast.error(result.message || t('Failed to create question'));
      }
    } catch (error) {
      toast.error(t('An error occurred while creating the question.'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnswer('');
    setQuestion('');
    setSelectedSet('');
    onClose();
  };

  const handleSelectSet = (set) => {
    setSelectedSet(set);
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
              {selectedSet ? selectedSet.name : t('Choose set')}
            </button>
            <SelectSetModal
              isOpen={isSelectModalOpen}
              onClose={() => setIsSelectModalOpen(false)}
              onSelect={handleSelectSet}
            />
          </div>
          <div className={styles.buttonBlock}>
            <button
              className={styles.createButton}
              onClick={handleCreate}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner}></span> : t('Create')}
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
