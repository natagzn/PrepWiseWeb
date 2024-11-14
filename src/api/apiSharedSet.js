import axios from 'axios';
import { getSessionToken } from './apiUser';

export const addSharing = async (set_id, user_id, edit) => {
  console.log(set_id, user_id, edit);

  const url = `${process.env.REACT_APP_API_URL}/shared-sets`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.post(
      url,
      { setId: set_id, userId: user_id, edit },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, message: setResponse.message };
  } catch (error) {
    console.error('Error adding share:', error);
    return { success: false, message: error.message };
  }
};

export const getSharedSet = async () => {
  const url = `${process.env.REACT_APP_API_URL}/shared-sets`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: setResponse.data };
  } catch (error) {
    console.error('Error creating set:', error);
    return { success: false, message: error.message };
  }
};

export const getSharedSetById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/shared-sets/${id}`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: setResponse.data };
  } catch (error) {
    console.error('Error getting set:', error);
    return { success: false, message: error.message };
  }
};

export const putSharedSetById = async (id, edit) => {
  const url = `${process.env.REACT_APP_API_URL}/shared-sets/${id}`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.put(
      url,
      { edit },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: setResponse.data };
  } catch (error) {
    console.error('Error creating set:', error);
    return { success: false, message: error.message };
  }
};

export const deleteSharedSetById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/shared-sets/${id}`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: setResponse.data };
  } catch (error) {
    console.error('Error creating set:', error);
    return { success: false, message: error.message };
  }
};

export const getIdAuthorSharedSet = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/shared-sets/${id}/author`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: setResponse.data };
  } catch (error) {
    console.error('Error creating set:', error);
    return { success: false, message: error.message };
  }
};

export const getAllSharedSet = async () => {
  const url = `${process.env.REACT_APP_API_URL}/shared-sets-all`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Відбираємо лише необхідні поля
    const filteredData = setResponse.data.sharedSets.map((set) => ({
      setId: set.setInfo.id,
      author: set.author,
      sharedWithUsers: set.sharedWithUsers,
    }));

    return { success: true, data: filteredData };
  } catch (error) {
    console.error('Error fetching shared sets:', error);
    return { success: false, message: error.message };
  }
};

export const getAllSharingSet = async () => {
  const url = `${process.env.REACT_APP_API_URL}/shared-sets-by-user`;
  const token = getSessionToken();
  try {
    const setResponse = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const filteredData = setResponse.data.setsSharedByUser.map((set) => ({
      setId: set.setInfo.id,
      author: set.author,
      sharedWithUsers: set.sharedWithUsers,
    }));

    console.log('allSharingSet', filteredData);

    return { success: true, data: filteredData };
  } catch (error) {
    console.error('Error creating set:', error);
    return { success: false, message: error.message };
  }
};
