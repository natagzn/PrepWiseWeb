import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';
import HeaderComponent from '../../../components/UI/HeaderComponent';
import VisibilityLevelCategories from './VisibilityLevelCategories';
import CreateQuestionAnswer from './CreateQuestionAnswer';
import { createSet } from 'api/apiService';

function CreateEditSet({ editOrCreate }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setId } = useParams();

  const [setTitle, setSetTitle] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, question: '', answer: '' },
  ]);
  const [visibility, setVisibility] = useState('public');
  const [level, setLevel] = useState({});
  const [categories, setCategories] = useState([]);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    if (editOrCreate === 'edit' && setId) {
      fetchSetDataById(setId);
    }
  }, [editOrCreate, setId]);

  const fetchSetDataById = (id) => {
    const fetchedData = {
      title: 'Set number 1',
      visibility: 'private',
      level: { id: 2, name: 'junior' },
      categories: [
        { id: 1, name: 'C#' },
        { id: 3, name: 'JavaScript' },
      ],
      questions: [
        {
          id: 1,
          question: 'What is React?',
          answer: 'A JavaScript library for building user interfaces',
        },
        {
          id: 2,
          question: 'What is JSX?',
          answer: 'A syntax extension for JavaScript',
        },
      ],
    };

    setSetTitle(fetchedData.title);
    setVisibility(fetchedData.visibility);
    setLevel(fetchedData.level);
    setCategories(fetchedData.categories);
    setQuestions(fetchedData.questions);
    setInitialData(fetchedData);
  };

  const handleTitleChange = (e) => setSetTitle(e.target.value);

  const handleCreate = async () => {
    if (!setTitle.trim()) {
      toast.error(t('Please enter a title.'));
      return;
    }
    if (questions.some((q) => !q.question.trim())) {
      toast.error(t('All questions must be filled.'));
      return;
    }
    if (questions.length === 0) {
      toast.error(t("You can't create set without questions"));
      return;
    }

    const access = visibility === 'public'; // Обчислюємо доступ
    const levelId = level.id; // Ваш вибраний рівень
    const categoriesIds = categories.map((cat) => cat.id); // Витягуємо ID категорій

    console.log(setTitle, access, levelId, categoriesIds, questions);

    try {
      const result = await createSet(
        setTitle,
        access,
        levelId,
        categoriesIds,
        questions
      );
      if (result.success) {
        console.log('Set created successfully:', result.message);
        toast.success(t('Set created successfully!'));
        navigate(-1);
      } else {
        console.error('Error creating set:', result.message);
        toast.error(t('Error creating set'));
      }
    } catch (error) {
      toast.error(t('Error creating set'));
      console.error(error);
    }
  };

  const handleUpdate = () => {
    const updatedData = { setTitle, visibility, level, categories, questions };

    // Зберігаємо ID запитань
    const initialQuestionsIds = initialData.questions.map((q) => q.id);
    const updatedQuestionsIds = updatedData.questions.map((q) => q.id);

    console.log('Initial: ', initialQuestionsIds);
    console.log('Update: ', updatedQuestionsIds);

    // Оновлюємо існуючі запитання
    updatedData.questions.forEach((question) => {
      const initialQuestion = initialData.questions.find(
        (q) => q.id === question.id
      );
      if (initialQuestion) {
        // Логіка оновлення запитань у базі даних
        console.log(`Updating question ID ${question.id}`);
        // API для оновлення запитання
      } else {
        // Логіка для створення нового запитання
        console.log('Creating new question:', question);
        //API для створення нового запитання
      }
    });

    // Видалення запитань, яких немає в оновлених даних
    initialQuestionsIds.forEach((id) => {
      if (!updatedQuestionsIds.includes(id)) {
        console.log(`Deleting question ID ${id}`);
        // API для видалення запитання
      }
    });

    // Перевірка на зміни
    if (JSON.stringify(initialData) !== JSON.stringify(updatedData)) {
      toast.success(t('Set updated successfully!'));
    } else {
      toast.info(t('No changes made.'));
    }
    navigate(-1);
  };

  const handleCancel = () => navigate(-1);

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (id, newQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, question: newQuestion } : q
      )
    );
  };

  const handleAnswerChange = (id, newAnswer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, answer: newAnswer } : q))
    );
  };

  const addQuestionCard = () => {
    const newId = -1 * (questions.length + 1); // Генерація мінусового ID
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: newId, question: '', answer: '', status: 'Still learning' },
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
          <VisibilityLevelCategories
            onLevelChange={setLevel}
            onCategoryChange={setCategories}
            onVisibilityChange={setVisibility}
            initialLevel={level}
            initialVisibility={visibility}
            initialCategories={categories}
          />
        </div>
      </div>
      <div className={styles.questions}>
        {questions.map((question, index) => (
          <CreateQuestionAnswer
            key={question.id}
            id={question.id}
            index={index + 1}
            question={question.question}
            answer={question.answer}
            onDelete={handleDeleteQuestion}
            onQuestionChange={(newQuestion) =>
              handleQuestionChange(question.id, newQuestion)
            }
            onAnswerChange={(newAnswer) =>
              handleAnswerChange(question.id, newAnswer)
            }
          />
        ))}
        <div className={styles.addQuestionButton} onClick={addQuestionCard}>
          <div className={styles.buttonText}>
            <div className={styles.buttonLabel}>+ {t('ADD QUESTION CARD')}</div>
            <div className={styles.buttonBorder}></div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button
          onClick={editOrCreate === 'edit' ? handleUpdate : handleCreate}
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
