import axios from 'axios';
import { getSessionToken } from './apiUser';

// Функція для отримання всіх сетів користувача
export const fetchAllResourceUser = async () => {
  const url = `${process.env.REACT_APP_API_URL}/resources`;
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
    console.error('Error fetching resources:', error);
    return { success: false, message: error.message };
  }
};

// Функція для отримання сета за його ID
export const fetchResourceById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/resources/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    // Перетворення структури даних
    const formattedData = {
      title: data.title,
      category: data.category.name,
      level: data.level.name,
      username: data.author.username,
      date: data.created_at.slice(0, 10), // Формат YYYY-MM-DD
      description: data.description,
      likes: data.likes,
      dislikes: data.dislikes,
      isLiked:
        data.userReaction === 'liked'
          ? true
          : data.userReaction === 'disliked'
            ? false
            : null,
      isAuthor: data.isAuthor,
    };

    //console.log('fpormdata', formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error fetching set:', error);
    return { success: false, message: error.message };
  }
};

export const addFavoriteResource = async (resourceId, like = true) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/resources-likes`,
      { resourceId, like }, // передаємо resourceId та like (булевий параметр)
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getSessionToken()}`, // функція для отримання токена
        },
      }
    );
    console.log('add favorite', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavoriteResource = async (resourceId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/resources-likes/${resourceId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getSessionToken()}`,
        },
      }
    );
    console.log('remove favorite', response.data);
    return response.data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

export const deleteResource = async (resourceId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/resources/${resourceId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getSessionToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};
