import axios from 'axios';
import { getSessionToken } from './apiUser';

export const createSupporRequest = async (content) => {
  const token = getSessionToken();

  try {
    const url = `${process.env.REACT_APP_API_URL}/feedback`;
    await axios.post(
      url,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Error sending support request:', error);
    return { success: false, message: error.message };
  }
};

export const getAllSupportRequests = async () => {
  const token = getSessionToken();

  try {
    const url = `${process.env.REACT_APP_API_URL}/feedback`;
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const formattedData = response.data
      .map((item) => ({
        feedback_id: item.feedback_id,
        user_id: item.user.user_id,
        username: item.user.username,
        email: item.user.email,
        content: item.content,
        created_at: item.created_at,
      }))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Сортування за `created_at`

    return { success: true, data: formattedData };
  } catch (error) {
    console.error('Error fetching support requests:', error);
    return { success: false, message: error.message };
  }
};
