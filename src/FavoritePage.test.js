// FavoritePage.test.js
import { render, screen, waitFor } from '@testing-library/react';
import FavoritePage from 'pages/FavoritePage';
import { fetchLevels, fetchCategories } from 'api/apiService';

// Мокування функцій
jest.mock('api/apiService', () => ({
  fetchLevels: jest.fn(),
  fetchCategories: jest.fn(),
}));

describe('FavoritePage', () => {
  it('повинен здійснити запити на отримання рівнів та категорій при завантаженні', async () => {
    // Підготовка моків
    fetchLevels.mockResolvedValue([{ name: 'Junior' }, { name: 'Middle' }]);
    fetchCategories.mockResolvedValue([{ name: 'Java' }, { name: 'C++' }]);

    render(<FavoritePage />);

    // Перевірка, що функції були викликані
    await waitFor(() => {
      expect(fetchLevels).toHaveBeenCalledTimes(1);
      expect(fetchCategories).toHaveBeenCalledTimes(1);
    });
  });
});
