import axios from 'axios';
import { getSessionToken } from './apiUser';

// Отримання рандомних сетів та папок з підписок
export const getIdsForHomePage = async () => {
  const url = `${process.env.REACT_APP_API_URL}/random`;
  const token = getSessionToken();

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    // Переформатовуємо sets та resources, щоб повернути лише їх ідентифікатори
    const formattedData = {
      sets: data.sets.map((set) => set.question_set_id),
      resources: data.resources.map((resource) => resource.resource_id),
    };

    return formattedData;
  } catch (error) {
    console.error('Error fetching sets:', error);
    return { success: false, message: error.message };
  }
};
