import axios from 'axios';
// Функція для зберігання токена на 1 день у sessionStorage
const setSessionToken = (token) => {
  const now = new Date().getTime();
  const expirationTime = now + 24 * 60 * 60 * 1000; // 1 день у мілісекундах
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('tokenExpiration', expirationTime.toString());
};

export const getSessionToken = () => {
  const token = sessionStorage.getItem('token');
  const expirationTime = sessionStorage.getItem('tokenExpiration');

  if (token && expirationTime) {
    const now = new Date().getTime();
    if (now < parseInt(expirationTime, 10)) {
      return token;
    } else {
      // Якщо термін дії минув, видаляємо токен
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiration');

      localStorage.removeItem('isPremium');
      localStorage.removeItem('isAdmin');

      window.location.reload();
    }
  }
  return null;
};

// Функція для логіну
export const loginUser = async (email, password) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/login`;
  try {
    const response = await axios.post(
      url,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const token = response.data.token.token;
    setSessionToken(token); // Зберігаємо токен у сесії на 1 день
    return token;
  } catch (error) {
    throw new Error(`Помилка підключення до API: ${error.message}`);
  }
};

// Функція для отримання профілю користувача
export const fetchUserProfile = async () => {
  const url = `${process.env.REACT_APP_API_URL}/profile`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Помилка отримання профілю: ${error.message}`);
  }
};

// src/api.js
export const updateProfile = async (updatedData, t) => {
  const token = getSessionToken();
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (response.ok) {
      return { message: t('update_success'), success: true, data: data.data };
    } else {
      return { message: t('update_failed'), success: false };
    }
  } catch (error) {
    return { message: t('update_failed'), success: false };
  }
};

export const logout = async () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('tokenExpiration');

  localStorage.removeItem('isPremium');
  localStorage.removeItem('isAdmin');

  window.location.reload();
};
