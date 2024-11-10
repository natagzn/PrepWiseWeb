import axios from 'axios';
import { getSessionToken } from './apiUser';

export const sendRequestForHelp = async (friendId, questionId) => {
  const url = `${process.env.REACT_APP_API_URL}/request-for-help`;
  const token = getSessionToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(
      url,
      { friendId, questionId },
      { headers }
    );
    console.log(`request send ${friendId} ${questionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error sending request:`, error);
    return { success: false, message: error.message };
  }
};
