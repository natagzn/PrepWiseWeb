import axios from 'axios';
import { getSessionToken } from './apiUser';

export const addSubscription = async () => {
  const url = `${process.env.REACT_APP_API_URL}/subscription`;
  const token = getSessionToken();
  let typeId = 2;
  try {
    const setResponse = await axios.post(
      url,
      { typeId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, message: setResponse.message };
  } catch (error) {
    console.error('Error buy subscription:', error);
    return { success: false, message: error.message };
  }
};

export const getUserSubscriptions = async () => {
  const url = `${process.env.REACT_APP_API_URL}/subscription`;
  const token = getSessionToken();
  try {
    const subscriptions = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: subscriptions.data };
  } catch (error) {
    console.error('Error get subscription:', error);
    return { success: false, message: error.message };
  }
};
