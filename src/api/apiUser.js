import axios from 'axios';

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
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    throw new Error(`Помилка підключення до API: ${error.message}`);
  }
};

// Функція для отримання профілю користувача
export const fetchUserProfile = async (token) => {
  const url = `${process.env.REACT_APP_API_URL}/profile`;
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
