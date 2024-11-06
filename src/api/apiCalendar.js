import axios from 'axios';
import { getSessionToken } from './apiUser';

export const fetchDateOfVisits = async () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/date-of-visits`;
  const token = getSessionToken();

  if (!token) {
    console.log('Не вдалося знайти токен авторизації.');
    return [];
  }

  try {
    // Виконуємо запит з використанням axios
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const dateArray = response.data.map((item) => item.date);

    return dateArray;
  } catch (error) {
    console.log('Помилка під час отримання даних:', error);
    return [];
  }
};
