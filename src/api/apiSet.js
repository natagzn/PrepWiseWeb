import axios from 'axios';
import { getSessionToken } from './apiUser';

// Функція для отримання сета за його ID
export const fetchSetById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/sets/${id}`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    // Встановлюємо вручну поле questionCount
    const questionCount = data.questions ? data.questions.length : 0;
    data.questionCount = questionCount;

    return data;
  } catch (error) {
    console.error('Error fetching set:', error);
    return { success: false, message: error.message };
  }
};

// Функція для отримання всіх сетів користувача
export const fetchAllSetUser = async () => {
  const url = `${process.env.REACT_APP_API_URL}/setsAll`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sets:', error);
    return { success: false, message: error.message };
  }
};

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

// Функція для створення сету
export const createSet = async (
  name,
  access,
  levelId,
  categories,
  questions
) => {
  const url = `${process.env.REACT_APP_API_URL}/sets`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.post(
      url,
      { name, access, level_id: levelId, shared: false, categories },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const setData = setResponse.data;
    const questionSetId = setData.set.question_set_id;
    console.log(setData);

    // Додавання питань до сету
    for (const question of questions) {
      const result = await addQuestion(
        questionSetId,
        question.question,
        question.answer
      );
      if (!result.success) {
        throw new Error('Failed to add question');
      }
    }

    console.log(setData.message);
    return { success: true, message: setData.message };
  } catch (error) {
    console.error('Error creating set:', error);
    return { success: false, message: error.message };
  }
};

// Функція для додавання питання до сета
export const addQuestion = async (listId, content, answer) => {
  const url = `${process.env.REACT_APP_API_URL}/questions`;
  const token = getSessionToken();
  try {
    const response = await axios.post(
      url,
      { list_id: listId, status: 'false', content, answer },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Error adding question:', error);
    return { success: false, message: error.message };
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
    return { success: true };
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

export const getTypeAccessToSet = async (setId) => {
  const url = `${process.env.REACT_APP_API_URL}/shared-sets-author/${setId}`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting type access:', error);
    return { success: false, message: error.message };
  }
};

export const getAllSetsName = async () => {
  const url = `${process.env.REACT_APP_API_URL}/setsAll`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Перетворення даних у потрібний формат
    const formattedData = response.data.map((set) => ({
      id: set.question_set_id,
      name: set.name,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching sets:', error);
    return { success: false, message: error.message };
  }
};

export const deleteSetById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/sets/${id}`;
  const token = getSessionToken();
  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting set:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const deleteSetByIdAdmin = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/sets-admin/${id}`;
  const token = getSessionToken();
  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting set:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
