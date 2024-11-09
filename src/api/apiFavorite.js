import axios from 'axios';
import { getSessionToken } from './apiUser';

export const fetchAllFavorite = async () => {
  const url = `${process.env.REACT_APP_API_URL}/favorites`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    // Переформатовуємо дані, щоб повернути тільки масиви з ID
    const formattedData = {
      sets: data.favourites.sets.map((set) => set.question_set_id),
      folders: data.favourites.folders.map((folder) => folder.folder_id),
      resources: data.favourites.resources
        ? data.favourites.resources.map((resource) => resource.resource_id)
        : [],
    };

    return formattedData;
  } catch (error) {
    console.error('Error fetching sets:', error);
    return { success: false, message: error.message };
  }
};
