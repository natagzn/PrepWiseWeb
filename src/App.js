import './App.css';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import MainPage from './pages/MainPage';
import PrivateRoute from './components/PrivateRoute'; // Імпортуємо PrivateRoute

// Інші імпорти сторінок
import ConfirmEmail from './pages/Auth/ConfirmEmail';
import PasswordReset from './pages/Auth/PasswordReset';
import NewPassword from './pages/Auth/NewPassword';
import YourLibraryPage from './pages/YourLibraryPage';
import NotificationPage from './pages/NotificationPage';
import PeoplePage from './pages/PeoplePage';
import SettingsPage from './pages/SettingsPage';
import { getSessionToken } from 'api/apiUser';
import BuyPremium from 'pages/BuyPremium';
import PeopleProfilePage from 'pages/PeopleProfilePage';
import LookFolder from 'pages/Folders/LookFolder';
import CreateEditFolder from 'pages/Folders/CreateEditFolder';
import CreateEditSet from 'pages/Sets/CreateEditSet';
import FavoritePage from 'pages/FavoritePage';
import LookSet from 'pages/Sets/LookSet';
import Flashcard from 'components/UI/Flashcard';
import FlashcardPage from 'pages/FlashcardsPage';
import ResultFlashcards from 'pages/FlashcardsPage/ResultPage';
import GlobalSearchPage from 'pages/GlobalSearch';
import CategoryManagement from 'components/UI/AdminComponents/CategoryManagment';
import LevelsManagement from 'components/UI/AdminComponents/LevelsManagment';
import ComplaintsManagement from 'components/UI/AdminComponents/ComplaintsManagement';
import ResourceDetail from 'components/UI/AdminComponents/ResourceDetail';
import SetDetails from 'components/UI/AdminComponents/SetDetail';
import SupportManagement from 'components/UI/AdminComponents/SupportManagment';

function App() {
  return (
    <>
      {/* Додаємо ToastContainer один раз на рівні App */}
      <ToastContainer />

      <Routes>
        {/* Якщо токен є, перенаправляємо з логіна на /home */}
        <Route
          path="/login"
          element={
            getSessionToken() ? <Navigate to="/home" replace /> : <LoginForm />
          }
        />
        <Route
          path="/register"
          element={
            sessionStorage.getItem('token') ? (
              <Navigate to="/home" replace />
            ) : (
              <RegisterForm />
            )
          }
        />

        {/* Загальні маршрути (доступні без авторизації) */}
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/newpassword" element={<NewPassword />} />

        {/* Приватні маршрути обгортаємо в PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/library" element={<YourLibraryPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/lookPremium" element={<BuyPremium />} />
          <Route path="/profileUser/:id" element={<PeopleProfilePage />} />

          <Route
            path="/lookFolder"
            element={
              <LookFolder
                folderName="Folder name"
                visibility="Public"
                count="2"
                countQ="11"
              />
            }
          />

          <Route
            path="/createFolder"
            element={<CreateEditFolder editOrCreate={'create'} />}
          />
          <Route
            path="/editFolder/:id"
            element={<CreateEditFolder editOrCreate={'edit'} />}
          />
          <Route
            path="/createSet"
            element={<CreateEditSet editOrCreate={'create'} />}
          />

          <Route
            path="/editSet/:id"
            element={<CreateEditSet editOrCreate={'edit'} />}
          />

          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/lookSet/:id" element={<LookSet />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/flashcards" element={<FlashcardPage setId={1} />} />
          <Route path="/flashcard/result" element={<ResultFlashcards />} />

          <Route path="/search/:searchBy" element={<GlobalSearchPage />} />

          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/levels" element={<LevelsManagement />} />
          <Route path="/admin/complaints" element={<ComplaintsManagement />} />
          <Route
            path="/admin/resources/:resourceId"
            element={<ResourceDetail />}
          />
          <Route path="/admin/set/:questionSetId" element={<SetDetails />} />
          <Route path="/admin/supports" element={<SupportManagement />} />
        </Route>

        {/* Перенаправлення на логін, якщо маршрут не знайдений */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
