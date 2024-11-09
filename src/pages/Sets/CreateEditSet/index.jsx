import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';
import HeaderComponent from '../../../components/UI/HeaderComponent';
import VisibilityLevelCategories from './VisibilityLevelCategories';
import CreateQuestionAnswer from './CreateQuestionAnswer';
import {
  createSet,
  fetchSetById,
  addSetCategories,
  createQuestion,
  deleteQuestion,
  deleteSetCategories,
  updateQuestion,
  updateSet,
} from 'api/apiSet';
import { Spinner } from 'react-bootstrap';

function CreateEditSet({ editOrCreate }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [setTitle, setSetTitle] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, question: '', answer: '' },
  ]);
  const [visibility, setVisibility] = useState('public');
  const [level, setLevel] = useState({});
  const [categories, setCategories] = useState([]);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (editOrCreate === 'edit' && setId) {
        const data = await fetchSetById(setId);
        setInfoEdit(data);
      }
    };

    fetchData();
  }, [editOrCreate, setId]);

  const setInfoEdit = (data) => {
    const fetchedData = {
      title: data.name,
      visibility: data.access,
      level: {
        id: data.level.levelId,
        name: data.level.name,
      },
      categories: data.categories,
      questions: data.questions.map((q) => ({
        id: q.question_id, // замість question_id використовуємо id
        question: q.content, // замість content використовуємо question
        answer: q.answer, // answer залишаємо без змін
      })),
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
    setIsLoading(true);
    if (!setTitle.trim()) {
      toast.error(t('Please enter a title.'));
      setIsLoading(false);
      return;
    }
    if (questions.some((q) => !q.question.trim())) {
      toast.error(t('All questions must be filled.'));
      setIsLoading(false);
      return;
    }
    if (questions.length === 0) {
      toast.error(t("You can't create set without questions"));
      setIsLoading(false);
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
        setIsLoading(false);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(t('Error creating set'));
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const updatedData = {
      title: setTitle,
      visibility,
      level: { id: level.id, name: level.name },
      categories: categories.map((cat) => ({ id: cat.id, name: cat.name })),
      questions: questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
      })),
    };

    // Перевірка на обов'язкові поля
    if (!updatedData.title) {
      toast.error(t('Please enter a title.'));
      setIsLoading(false);
      return;
    }
    if (!updatedData.categories || updatedData.categories.length === 0) {
      toast.error(t('Please select at least one category.'));
      setIsLoading(false);
      return;
    }
    if (!updatedData.questions || updatedData.questions.length === 0) {
      toast.error(t('There must be at least one question.'));
      setIsLoading(false);
      return;
    }

    // Перевірка на порожні поля "question" у питаннях
    const emptyQuestions = updatedData.questions.filter((q) => !q.question);
    if (emptyQuestions.length > 0) {
      toast.error(t('All questions must have content.'));
      setIsLoading(false);
      return;
    }

    console.log('Initial Data:', initialData);
    console.log('Updated Data:', updatedData);

    const initialQuestionsIds = initialData.questions.map((q) => q.id);
    const updatedQuestionsIds = updatedData.questions.map((q) => q.id);

    const newQuestions = updatedData.questions.filter(
      (q) => !initialQuestionsIds.includes(q.id)
    );

    const deletedQuestions = initialData.questions.filter(
      (q) => !updatedQuestionsIds.includes(q.id)
    );

    const updatedQuestions = updatedData.questions.filter((q) => {
      const initialQuestion = initialData.questions.find(
        (initQ) => initQ.id === q.id
      );
      return (
        initialQuestion &&
        (initialQuestion.question !== q.question ||
          initialQuestion.answer !== q.answer)
      );
    });

    console.log('New Questions:', newQuestions);
    console.log('Deleted Questions:', deletedQuestions);
    console.log('Updated Questions:', updatedQuestions);

    const hasMainFieldsChanges =
      initialData.title !== updatedData.title ||
      initialData.visibility !== updatedData.visibility ||
      JSON.stringify(initialData.level) !== JSON.stringify(updatedData.level) ||
      JSON.stringify(initialData.categories) !==
        JSON.stringify(updatedData.categories);

    if (hasMainFieldsChanges) {
      console.log('Updating main fields...');
      console.log('Main fields updated data:', {
        title: updatedData.title,
        visibility: updatedData.visibility,
        level: updatedData.level,
        categories: updatedData.categories,
      });

      const updateResult = await updateSet(
        setId,
        updatedData.title,
        updatedData.visibility,
        updatedData.level.id
      );
      if (!updateResult.success) {
        toast.error(t('Error updating set'));
        setIsLoading(false);
        return;
      }

      const deleteResult = await deleteSetCategories(
        setId,
        initialData.categories.map((cat) => cat.id)
      );
      if (!deleteResult.success) {
        toast.error(t('Error deleting old categories'));
        setIsLoading(false);
        return;
      }

      const addResult = await addSetCategories(
        setId,
        updatedData.categories.map((cat) => cat.id)
      );
      if (!addResult.success) {
        toast.error(t('Error adding new categories'));
        setIsLoading(false);
        return;
      }
    }

    for (const question of updatedQuestions) {
      await updateQuestion(question.id, question);
    }

    for (const question of newQuestions) {
      await createQuestion(setId, question);
    }

    for (const question of deletedQuestions) {
      await deleteQuestion(question.id);
    }

    if (
      hasMainFieldsChanges ||
      updatedQuestions.length > 0 ||
      newQuestions.length > 0 ||
      deletedQuestions.length > 0
    ) {
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
      { id: newId, question: '', answer: '', status: false },
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
          {isLoading ? (
            <Spinner animation="border" size="sm" /> // Спінер на кнопці
          ) : editOrCreate === 'edit' ? (
            t('Update')
          ) : (
            t('Create')
          )}
        </button>
        <button onClick={handleCancel} className={styles.cancelButton}>
          {t('cancel')}
        </button>
      </div>
    </div>
  );
}

export default CreateEditSet;
