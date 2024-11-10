import axios from 'axios';
import { getSessionToken } from './apiUser';

export const addSubscribe = async (friendUserId) => {
  const url = `${process.env.REACT_APP_API_URL}/people`;
  const token = getSessionToken();

  try {
    const response = await axios.post(
      url,
      { friendUserId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding subscribe:', error);
    throw error;
  }
};

export const deleteSubscribe = async (friendUserId) => {
  const url = `${process.env.REACT_APP_API_URL}/people/delete/${friendUserId}`;
  const token = getSessionToken();

  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error deleting subscribe:', error);
    throw error;
  }
};

export const getFollowing = async () => {
  const url = `${process.env.REACT_APP_API_URL}/following`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Повертаємо лише масив addedUserIds
    return response.data.addedUserIds || [];
  } catch (error) {
    console.error('Error getting following:', error);
    throw error;
  }
};

export const getFriends = async () => {
  const url = `${process.env.REACT_APP_API_URL}/friends`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Повертаємо лише масив mutualFriendsIds
    return response.data.mutualFriendsIds || [];
  } catch (error) {
    console.error('Error getting friends:', error);
    throw error;
  }
};

export const getSubscribers = async () => {
  const url = `${process.env.REACT_APP_API_URL}/subscribers`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Повертаємо лише масив subscriberIds
    return response.data.subscriberIds || [];
  } catch (error) {
    console.error('Error getting subscribers:', error);
    throw error;
  }
};
