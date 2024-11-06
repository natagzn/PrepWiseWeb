import axios from 'axios';
import { getSessionToken } from './apiUser';

export const updateQuestionStatus = async (id, status) => {
  const url = `${process.env.REACT_APP_API_URL}/questions/${id}`;
  const token = getSessionToken();

  try {
    const response = await axios.put(
      url,
      { status },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating question status:', error);
    return error.response ? error.response.data : 'An error occurred';
  }
};

export const resetProgressForAllQuestions = async (questions) => {
  const token = getSessionToken();
  const url = `${process.env.REACT_APP_API_URL}/questions`;

  try {
    // Проходимо по всіх запитаннях і оновлюємо статус на false
    const updatePromises = questions.map((question) => {
      return axios.put(
        `${url}/${question.question_id}`,
        { status: false },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    });

    // Виконуємо всі запити паралельно
    const results = await Promise.all(updatePromises);
    return results.map((response) => response.data);
  } catch (error) {
    console.error('Error resetting progress for questions:', error);
    return error.response ? error.response.data : 'An error occurred';
  }
};
