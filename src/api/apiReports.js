import axios from 'axios';
import { getSessionToken } from './apiUser';

export const createReport = async (type, id, context) => {
  const token = getSessionToken();

  let data = { context };

  if (type === 'set') {
    data.setId = id;
  } else if (type === 'resource') {
    data.resourcesId = id;
  }

  try {
    const url = `${process.env.REACT_APP_API_URL}/complaints`;
    await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating report:', error);
    return { success: false, message: error.message };
  }
};

export const getAllReports = async () => {
  const token = getSessionToken();

  try {
    const url = `${process.env.REACT_APP_API_URL}/complaints`;
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const formattedData = response.data.data
      .map((item) => {
        let materialName = '';
        let set_id = '';
        let resources_id = '';

        if (item.set_id !== null) {
          materialName = item.set.name;
          set_id = item.set_id;
        } else if (item.resources_id !== null) {
          materialName = item.resource ? item.resource.title : '';
          resources_id = item.resources_id;
        }

        return {
          complaint_id: item.complaint_id,
          user_id: item.user_id,
          material_name: materialName,
          context: item.context,
          date: item.created_at.slice(0, 10),
          set_id: set_id || undefined,
          resources_id: resources_id || undefined,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Сортування за `created_at`

    return { success: true, data: formattedData };
  } catch (error) {
    console.error('Error fetching support requests:', error);
    return { success: false, message: error.message };
  }
};
