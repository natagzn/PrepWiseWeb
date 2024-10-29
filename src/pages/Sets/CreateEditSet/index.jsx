import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import HeaderComponent from '../../../components/UI/HeaderComponent';
import VisibilityLevelCategories from './VisibilityLevelCategories';
import CreateQuestionAnswer from './CreateQuestionAnswer';

function CreateEditSet({ editOrCreate }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [setTitle, setSetTitle] = useState(
    editOrCreate === 'edit' ? 'Set number 1' : ''
  );
  const [questions, setQuestions] = useState([
    { id: 1, question: '', answer: '' },
    { id: 2, question: '', answer: '' },
    { id: 3, question: '', answer: '' },
  ]);

  const handleTitleChange = (e) => {
    setSetTitle(e.target.value);
  };

  const handleCreate = () => {
    console.log('Creating new set with title:', setTitle);
    navigate('/sets');
  };

  const handleUpdate = () => {
    console.log('Updating set to:', setTitle);
    navigate('/sets');
  };

  const handleCancel = () => {
    navigate('/sets');
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);

    //додати запит АПІ
  };

  const addQuestionCard = () => {
    const newId =
      questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: newId, question: '', answer: '' },
    ]);
  };

  return (
    <div className={styles.container}>
      <HeaderComponent />

      <div className={styles.group}>
        <div className={styles.columnLeft}>
          <div className={styles.setTitle}>
            {editOrCreate === 'edit' ? t('update_a_set') : t('create_a_set')}
          </div>
          <div className={styles.inputField}>
            <div className={styles.label}>{t('Title')}:</div>
            <input
              type="text"
              value={setTitle}
              onChange={handleTitleChange}
              className={styles.inputText}
              placeholder={t('enter_a_title')}
            />
          </div>
          <VisibilityLevelCategories />
        </div>
      </div>

      <div className={styles.questions}>
        {questions.map((question, index) => (
          <CreateQuestionAnswer
            key={question.id}
            id={question.id}
            index={index + 1} // Порядковий номер для відображення
            onDelete={handleDeleteQuestion}
          />
        ))}

        {/* Кнопка для додавання нового питання */}
        <div className={styles.addQuestionButton} onClick={addQuestionCard}>
          <div className={styles.buttonText}>
            <div className={styles.buttonLabel}>+ {t('ADD QUESTION CARD')}</div>
            <div className={styles.buttonBorder}></div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          onClick={editOrCreate === 'create' ? handleCreate : handleUpdate}
          className={styles.createUpdateButtonFooter}
        >
          {editOrCreate === 'edit' ? t('Update') : t('Create')}
        </button>
        <button onClick={handleCancel} className={styles.cancelButton}>
          {t('cancel')}
        </button>
      </div>
    </div>
  );
}

export default CreateEditSet;
