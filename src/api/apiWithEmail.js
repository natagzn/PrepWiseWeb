import axios from 'axios';
import { getSessionToken } from './apiUser';

export const sendCodeRegister = async (email) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/send-code-register`;
  const token = getSessionToken();

  console.log(email);

  try {
    const response = await axios.post(
      url,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error send code:', error);
    return { success: false, message: error.message };
  }
};

export const checkCodeRegister = async (email, resetCode) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/check-code`;
  const token = getSessionToken();

  console.log(email, resetCode);

  try {
    const response = await axios.post(
      url,
      {
        email,
        resetCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error check code:', error);
    return { success: false, message: error.message };
  }
};

export const sendCodeResetPassword = async (email) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/reset-password`;
  const token = getSessionToken();

  console.log(email);

  try {
    const response = await axios.post(
      url,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error send code:', error);
    return { success: false, message: error.message };
  }
};

export const checkResetCode = async (email, resetCode) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/check-reset-code`;
  const token = getSessionToken();

  console.log(email, resetCode);

  try {
    const response = await axios.post(
      url,
      {
        email,
        resetCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error check code:', error);
    return { success: false, message: error.message };
  }
};
