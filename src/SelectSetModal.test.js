import { render, screen, waitFor } from '@testing-library/react';
import { getAllSetsName } from 'api/apiSet'; // шлях до функції API
import SelectSetModal from 'components/UI/PlusButton/CreateQuestion/SelectSetModal';
import { Spinner } from 'react-bootstrap'; // перевірка спінера

jest.mock('api/apiSet'); // Мокуємо API

describe('SelectSetModal', () => {
  test('відображається спінер під час завантаження даних', async () => {
    // Мокаємо відповіді від API
    getAllSetsName.mockResolvedValue([
      { id: 1, name: 'Set 1' },
      { id: 2, name: 'Set 2' },
    ]);

    render(
      <SelectSetModal isOpen={true} onClose={() => {}} onSelect={() => {}} />
    );

    // Перевіряємо, чи відображається спінер
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Чекаємо, поки дані будуть завантажені, і перевіряємо, що спінер зникає
    await waitFor(() =>
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    );
  });

  test('відображається список сетів після завантаження', async () => {
    // Мокаємо відповіді від API
    getAllSetsName.mockResolvedValue([
      { id: 1, name: 'Set 1' },
      { id: 2, name: 'Set 2' },
    ]);

    render(
      <SelectSetModal isOpen={true} onClose={() => {}} onSelect={() => {}} />
    );

    // Чекаємо, поки дані будуть завантажені
    await waitFor(() => expect(screen.getByText('Set 1')).toBeInTheDocument());

    // Перевіряємо, що списки сетів відображаються після завантаження
    expect(screen.getByText('Set 1')).toBeInTheDocument();
    expect(screen.getByText('Set 2')).toBeInTheDocument();
  });
});
