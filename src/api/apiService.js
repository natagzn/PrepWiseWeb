// src/api/apiService.js
import axios from 'axios';

const token = localStorage.getItem('token');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const fetchCategories = async () => {
  const url = `${process.env.REACT_APP_API_URL}/categories`;
  try {
    const response = await axios.get(url, { headers });
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchLevels = async () => {
  const url = `${process.env.REACT_APP_API_URL}/levels`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching levels:', error);
    throw error;
  }
};

export const postResource = async ({
  title,
  description,
  levelId,
  categoryId,
}) => {
  const url = `${process.env.REACT_APP_API_URL}/resources`;
  try {
    console.log(title, description, levelId, categoryId);
    const response = await axios.post(
      url,
      { title, description, levelId, categoryId },
      { headers }
    );
    console.log('Resource created successfully!');
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
  try {
    const setResponse = await axios.post(
      url,
      { name, access, level_id: levelId, shared: false, categories },
      { headers }
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

// Функція для додавання питання
export const addQuestion = async (listId, content, answer) => {
  const url = `${process.env.REACT_APP_API_URL}/questions`;
  console.log(listId, content, answer);
  try {
    await axios.post(
      url,
      { list_id: listId, status: 'Still learning', content, answer },
      { headers }
    );

    return { success: true };
  } catch (error) {
    console.error('Error adding question:', error);
    return { success: false, message: error.message };
  }
};

export const fetchSetById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/sets/${id}`;
  try {
    const response = await axios.get(url, { headers });
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

export const fetchAllSetUser = async () => {
  const url = `${process.env.REACT_APP_API_URL}/setsAll`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching sets:', error);
    return { success: false, message: error.message };
  }
};
