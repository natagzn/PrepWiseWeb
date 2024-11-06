import axios from 'axios';
import { getSessionToken } from './apiUser';

// Функція для отримання всіх улюблених
export const fetchAllFavorite = async () => {
  const url = `${process.env.REACT_APP_API_URL}/favorites`;
  const token = getSessionToken(); // Отримуємо токен вручну
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Заголовок авторизації з токеном
  };

  try {
    const response = await axios.get(url, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return { success: false, message: error.message };
  }
};

// Функція для додавання лайку на сет
export const likeSet = async (setId) => {
  const url = `${process.env.REACT_APP_API_URL}/favorites/set`;
  const token = getSessionToken(); // Отримуємо токен вручну
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Заголовок авторизації з токеном
  };

  try {
    const response = await axios.post(
      url,
      { questionListId: setId },
      { headers }
    );
    console.log(`Liked set with id ${setId}`);
    return response.data;
  } catch (error) {
    console.error(`Error liking set with id ${setId}:`, error);
    return { success: false, message: error.message };
  }
};

// Функція для видалення лайку з сета
export const unlikeSet = async (setId) => {
  const url = `${process.env.REACT_APP_API_URL}/favorites/set`;
  const token = getSessionToken(); // Отримуємо токен вручну
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Заголовок авторизації з токеном
  };

  try {
    const response = await axios.delete(url, {
      data: { questionListId: setId },
      headers,
    });
    console.log(`Unliked set with id ${setId}`);
    return response.data;
  } catch (error) {
    console.error(`Error unliking set with id ${setId}:`, error);
    return { success: false, message: error.message };
  }
};
