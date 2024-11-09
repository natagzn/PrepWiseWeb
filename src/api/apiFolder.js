import axios from 'axios';
import { getSessionToken } from './apiUser';
import { isClickableInput } from '@testing-library/user-event/dist/utils';
import { fetchSetById } from './apiSet';

// Функція для отримання всіх сетів користувача для папок
export const fetchSetForFolders = async () => {
  const url = `${process.env.REACT_APP_API_URL}/setsAll`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.map((set) => ({
      id: set.question_set_id,
      name: set.name,
      count: set.questions.length,
      date: set.data,
    }));
  } catch (error) {
    console.error('Error fetching sets:', error);
    return { success: false, message: error.message };
  }
};

// Функція для створення папок
export const createFolder = async (name, sets) => {
  const url = `${process.env.REACT_APP_API_URL}/folders`;
  const token = getSessionToken();

  try {
    const response = await axios.post(
      url,
      {
        name: name,
        sets: sets,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating folder:', error);
    return { success: false, message: error.message };
  }
};

export const fetchAllFolderUser = async () => {
  const url = `${process.env.REACT_APP_API_URL}/folders-with-all`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching folders:', error);
    return { success: false, message: error.message };
  }
};

export const fetchFolderById = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/folders/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    // Перетворення структури даних
    const formattedData = {
      title: data.name,
      itemsCount: data.sets.length,
      date: data.date.slice(0, 10),
      isLiked: data.isFavourite,
      sets: data.sets, // Залишаємо тільки set_id
    };

    console.log(formattedData);

    return formattedData;
  } catch (error) {
    console.error('Error fetching set:', error);
    return { success: false, message: error.message };
  }
};

export const fetchLookFolder = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/folders/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    //console.log('data', data);
    let countQ = 0;

    // Отримання даних для кожного сету за допомогою fetchSetById
    const sets = await Promise.all(
      data.sets.map(async (set) => {
        const setDetails = await fetchSetById(set);
        //console.log('setDetails', setDetails);
        countQ += setDetails.questionCount;
        return {
          id: set,
          name: setDetails.name,
          date: setDetails.createdAt.slice(0, 10),
          count: setDetails.questionCount,
        };
      })
    );

    // Перетворення структури даних
    const formattedData = {
      title: data.name,
      itemsCount: sets.length,
      date: data.date.slice(0, 10),
      isLiked: data.isFavourite,
      sets: sets, // Додаємо деталі сетів до результату
      countQ: countQ,
    };

    return formattedData;
  } catch (error) {
    console.error('Error fetching folder:', error);
    return { success: false, message: error.message };
  }
};

export const updateFolderById = async (id, name) => {
  const url = `${process.env.REACT_APP_API_URL}/folders/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.put(
      url,
      { name },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating folder:', error);
    return { success: false, message: error.message };
  }
};

export const addSetToFolder = async (id, setId) => {
  const url = `${process.env.REACT_APP_API_URL}/folders/${id}/add-set`;
  const token = getSessionToken();

  try {
    const response = await axios.post(
      url,
      { setId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.error('Error adding set to folder:', error);
    return { success: false, message: error.message };
  }
};

export const deleteSetFromFolder = async (folderId, setId) => {
  const url = `${process.env.REACT_APP_API_URL}/folders-set?folderId=${folderId}&setId=${setId}`;
  const token = getSessionToken();

  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting set from folder:', error);
    return { success: false, message: error.message };
  }
};

export const deleteFolder = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/folders/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting set from folder:', error);
    return { success: false, message: error.message };
  }
};
