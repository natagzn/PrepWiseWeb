import axios from 'axios';
import { getSessionToken } from './apiUser';

export const getAllNotifications = async () => {
  const url = `${process.env.REACT_APP_API_URL}/notifications-user`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error getting notification:', error);
    return { success: false, message: error.message };
  }
};

export const getInfoAboutRequestForHelpById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/request-for-help/${id}`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('response', response.data.data);

    const { id, date, question } = response.data.data;
    const filteredData = {
      id,
      date,
      questionContent: question.content,
      questionId: question.question_id,
      friendUserId: question.set.user_id, // взято з question.set.user_id
      friendUsername: question.set.user.username, // взято з question.set.user.username
    };

    console.log('filteredData', filteredData);

    return { success: true, data: filteredData };
  } catch (error) {
    console.error('Error getting info about request:', error);
    return { success: false, message: error.message };
  }
};
