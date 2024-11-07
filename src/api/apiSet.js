import axios from 'axios';
import { getSessionToken } from './apiUser';

export const updateQuestionStatus = async (id, status) => {
  const url = `${process.env.REACT_APP_API_URL}/questions/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.put(
      url,
      { status },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating question status:', error);
    return error.response ? error.response.data : 'An error occurred';
  }
};

export const resetProgressForAllQuestions = async (questions) => {
  const token = getSessionToken();
  const url = `${process.env.REACT_APP_API_URL}/questions`;

  try {
    // Проходимо по всіх запитаннях і оновлюємо статус на false
    const updatePromises = questions.map((question) => {
      return axios.put(
        `${url}/${question.question_id}`,
        { status: false },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    });

    // Виконуємо всі запити паралельно
    const results = await Promise.all(updatePromises);
    return results.map((response) => response.data);
  } catch (error) {
    console.error('Error resetting progress for questions:', error);
    return error.response ? error.response.data : 'An error occurred';
  }
};

export const updateSet = async (setId, name, visibility, levelId) => {
  const url = `${process.env.REACT_APP_API_URL}/sets/${setId}`;
  const token = getSessionToken();

  try {
    const response = await axios.put(
      url,
      {
        name,
        access: (visibility === 'public').toString(),
        level_id: levelId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Error updating set:', error);
    return { success: false, message: error.message };
  }
};

export const deleteSetCategories = async (setId, categoryIds) => {
  const token = getSessionToken();

  try {
    for (const categoryId of categoryIds) {
      const url = `${process.env.REACT_APP_API_URL}/sets/${setId}/categories/${categoryId}`;
      await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting categories:', error);
    return { success: false, message: error.message };
  }
};

export const addSetCategories = async (setId, categoryIds) => {
  const token = getSessionToken();

  try {
    for (const categoryId of categoryIds) {
      const url = `${process.env.REACT_APP_API_URL}/sets/${setId}/categories/${categoryId}`;
      await axios.post(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    return { success: true };
  } catch (error) {
    console.error('Error adding categories:', error);
    return { success: false, message: error.message };
  }
};

// Створення нового питання
export const createQuestion = async (setId, question) => {
  const url = `${process.env.REACT_APP_API_URL}/questions`;
  const token = getSessionToken();

  try {
    const response = await axios.post(
      url,
      {
        list_id: setId,
        status: 'false',
        content: question.question,
        answer: question.answer,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    return { success: false, message: error.message };
  }
};

// Оновлення питання
export const updateQuestion = async (questionId, question) => {
  const url = `${process.env.REACT_APP_API_URL}/questions/${questionId}`;
  const token = getSessionToken();

  try {
    const response = await axios.put(
      url,
      {
        content: question.question,
        answer: question.answer,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    return { success: false, message: error.message };
  }
};

// Видалення питання
export const deleteQuestion = async (questionId) => {
  const url = `${process.env.REACT_APP_API_URL}/questions/${questionId}`;
  const token = getSessionToken();

  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    return { success: false, message: error.message };
  }
};
