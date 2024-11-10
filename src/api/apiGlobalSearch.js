import axios from 'axios';
import { getSessionToken } from './apiUser';

export const globalSearch = async (query) => {
  const url = `${process.env.REACT_APP_API_URL}/global-search?query=${encodeURIComponent(query)}`;
  const token = getSessionToken();
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const transformedData = {
      sets: response.data.sets.map((set) => set.question_set_id),
      resources: response.data.resources.map(
        (resource) => resource.resource_id
      ),
      users: response.data.users.map((user) => user.user_id),
    };

    return transformedData;
  } catch (error) {
    console.error('Error while search:', error);
    throw error;
  }
};
