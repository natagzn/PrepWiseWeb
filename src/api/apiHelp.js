import axios from 'axios';
import { getSessionToken } from './apiUser';

export const sendRequestForHelp = async (friendId, questionId) => {
  const url = `${process.env.REACT_APP_API_URL}/request-for-help`;
  const token = getSessionToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  //console.log(friendId, questionId);

  try {
    const response = await axios.post(
      url,
      { friendId, questionId },
      { headers }
    );
    console.log(`request send ${friendId} ${questionId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error sending request:`, error);
    return { success: false, message: error.message };
  }
};

export const sendAnswerOnQuestion = async (questionId, content) => {
  const url = `${process.env.REACT_APP_API_URL}/help-answers`;
  const token = getSessionToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      url,
      { questionId, content },
      { headers }
    );
    console.log(`answer send ${questionId} ${content}`);
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error sending request:`, error);
    return { success: false, message: error.message };
  }
};

export const getAnswersFromFriendByQuestionId = async (questionId) => {
  const url = `${process.env.REACT_APP_API_URL}/help-answers-for-questions/${questionId}`;
  const token = getSessionToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(url, { headers });
    const helpAnswers = response.data.helpAnswers || [];
    return { success: true, data: helpAnswers };
  } catch (error) {
    console.error(`Error sending request:`, error);
    return { success: false, message: error.message };
  }
};
