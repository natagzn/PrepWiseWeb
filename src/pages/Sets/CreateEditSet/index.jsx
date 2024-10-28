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
  const [questions, setQuestions] = useState([{}, {}, {}]); // Масив для питань

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

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index); // Видалення питання за індексом
    setQuestions(updatedQuestions); // Оновлення стану
  };

  const addQuestionCard = () => {
    setQuestions((prevQuestions) => [...prevQuestions, {}]); // Додавання нового питання
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
        {questions.map((_, index) => (
          <CreateQuestionAnswer
            key={index}
            index={index}
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
