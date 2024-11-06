import axios from 'axios';

const token = localStorage.getItem('token');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const fetchAllFavorite = async () => {
  const url = `${process.env.REACT_APP_API_URL}/favorites`;
  try {
    const response = await axios.get(url, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching sets:', error);
    return { success: false, message: error.message };
  }
};

// Функція для додавання лайку на сет
export const likeSet = async (setId) => {
  const url = `${process.env.REACT_APP_API_URL}/favorites/set`;
  try {
    const response = await axios.post(
      url,
      { questionListId: setId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`Liked set with id ${setId}`);
    return response.data;
  } catch (error) {
    console.error(`Error liking set with id ${setId}:`, error);
    return { success: false, message: error.message };
  }
};

// Функція для видалення лайку з сета
export const unlikeSet = async (setId) => {
  const url = `${process.env.REACT_APP_API_URL}/favorites/set`;
  try {
    const response = await axios.delete(url, {
      data: { questionListId: setId },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Unliked set with id ${setId}`);
    return response.data;
  } catch (error) {
    console.error(`Error unliking set with id ${setId}:`, error);
    return { success: false, message: error.message };
  }
};
