import axios from 'axios';
import { getSessionToken } from './apiUser';

// Функція для отримання категорій
export const fetchCategories = async () => {
  const url = `${process.env.REACT_APP_API_URL}/categories`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Функція для отримання рівнів
export const fetchLevels = async () => {
  const url = `${process.env.REACT_APP_API_URL}/levels`;
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
  const token = getSessionToken();
  try {
    const response = await axios.post(
      url,
      { title, description, levelId, categoryId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
