import axios from 'axios';
import { getSessionToken } from './apiUser';

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

// Функція для додавання лайку на папку
export const likeFolder = async (folderId) => {
  const url = `${process.env.REACT_APP_API_URL}/favorites/folder`;
  const token = getSessionToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(url, { folderId: folderId }, { headers });
    console.log(`Liked folder with id ${folderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error liking folder with id ${folderId}:`, error);
    return { success: false, message: error.message };
  }
};

// Функція для видалення лайку з папки
export const unlikeFolder = async (folderId) => {
  const url = `${process.env.REACT_APP_API_URL}/favorites/folder`;
  const token = getSessionToken(); // Отримуємо токен вручну
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Заголовок авторизації з токеном
  };

  try {
    const response = await axios.delete(url, {
      data: { folderId: folderId },
      headers,
    });
    console.log(`Unliked folder with id ${folderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error unliking folder with id ${folderId}:`, error);
    return { success: false, message: error.message };
  }
};
