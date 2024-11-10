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
  let { location, bio } = updatedData;

  if (!location || location.trim() === '') {
    location = '-';
  }

  if (!bio || bio.trim() === '') {
    bio = '- ';
  }

  console.log(location, bio);
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ location, bio }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.data);
      return { message: t('update_success'), success: true, data: data.data };
    } else {
      return { message: t('update_failed'), success: false };
    }
  } catch (error) {
    return { message: t('update_failed'), success: false };
  }
};

export const logout = async () => {
  const token = getSessionToken(); // Отримуємо токен вручну
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Заголовок авторизації
  };

  try {
    // Викликаємо API POST /logout
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      {},
      { headers }
    );

    // Перевіряємо, чи успішно виконано запит
    console.log(response.data);
    if (response.data) {
      // Якщо все успішно, очищаємо sessionStorage та localStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiration');

      localStorage.removeItem('isPremium');
      localStorage.removeItem('isAdmin');

      // Перезавантажуємо сторінку
      window.location.reload();
    } else {
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getShortUserInfoById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/search/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Отримуємо дані та перетворюємо їх у потрібний формат
    const data = response.data;
    return {
      id: data.id,
      username: data.username,
      setsCount: data.publicSets.length,
      resourcesCount: data.resources.length,
    };
  } catch (error) {
    throw new Error(`Помилка отримання профілю: ${error.message}`);
  }
};

export const getFullInfoUser = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/another-profile/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Отримуємо дані та перетворюємо їх у потрібний формат
    const data = response.data;
    return { data };
  } catch (error) {
    throw new Error(`Помилка отримання профілю: ${error.message}`);
  }
};
