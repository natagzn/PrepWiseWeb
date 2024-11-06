import { getSessionToken } from 'api/apiUser';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Перевірка наявності токена в sessionStorage
  const token = getSessionToken();

  // Якщо токен є, надаємо доступ до маршруту, якщо ні — перенаправляємо на логін
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
