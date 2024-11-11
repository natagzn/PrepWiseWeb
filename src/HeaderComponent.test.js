import { render, screen } from '@testing-library/react';
import HeaderComponent from 'components/UI/HeaderComponent';
import { BrowserRouter as Router } from 'react-router-dom';

// Загальний компонент-обгортка для тестування HeaderComponent
const Wrapper = ({ showPlus }) => (
  <Router>
    <HeaderComponent showPlus={showPlus} />
  </Router>
);

describe('HeaderComponent', () => {
  test('відображає PlusButton, коли showPlus=true', () => {
    render(<Wrapper showPlus={true} />);

    // Перевіряємо, чи відображається кнопка PlusButton через alt текст
    const plusButton = screen.getByAltText(/plusButton/i);
    expect(plusButton).toBeInTheDocument();
  });

  test('не відображає PlusButton, коли showPlus=false', () => {
    render(<Wrapper showPlus={false} />);

    // Перевіряємо, чи не відображається кнопка PlusButton
    const plusButton = screen.queryByAltText(/plusButton/i);
    expect(plusButton).not.toBeInTheDocument();
  });
});
