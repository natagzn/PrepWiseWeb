import axios from 'axios';
import { getSessionToken } from './apiUser';

// Функція для отримання категорій
export const fetchCategories = async () => {
  const url = `${process.env.REACT_APP_API_URL}/categories`;
  const token = getSessionToken(); // Отримуємо токен вручну
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Ручний заголовок авторизації
      },
    });
    return response.data.categories; // Повертаємо категорії
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Функція для отримання рівнів
export const fetchLevels = async () => {
  const url = `${process.env.REACT_APP_API_URL}/levels`;
  const token = getSessionToken(); // Отримуємо токен вручну
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Ручний заголовок авторизації
      },
    });
    return response.data; // Повертаємо рівні
  } catch (error) {
    console.error('Error fetching levels:', error);
    throw error;
  }
};

// Функція для створення ресурсу
export const postResource = async ({
  title,
  description,
  levelId,
  categoryId,
}) => {
  const url = `${process.env.REACT_APP_API_URL}/resources`;
  const token = getSessionToken(); // Отримуємо токен вручну
  try {
    const response = await axios.post(
      url,
      { title, description, levelId, categoryId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ручний заголовок авторизації
        },
      }
    );
    console.log('Resource created successfully!', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
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
  const token = getSessionToken(); // Отримуємо токен вручну
  try {
    const setResponse = await axios.post(
      url,
      { name, access, level_id: levelId, shared: false, categories },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ручний заголовок авторизації
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
  const token = getSessionToken(); // Отримуємо токен вручну
  try {
    const response = await axios.post(
      url,
      { list_id: listId, status: 'Still learning', content, answer },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ручний заголовок авторизації
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Error adding question:', error);
    return { success: false, message: error.message };
  }
};

// Функція для отримання сета за його ID
export const fetchSetById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/sets/${id}`;
  const token = getSessionToken(); // Отримуємо токен вручну
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Ручний заголовок авторизації
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
  const token = getSessionToken(); // Отримуємо токен вручну
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Ручний заголовок авторизації
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sets:', error);
    return { success: false, message: error.message };
  }
};
