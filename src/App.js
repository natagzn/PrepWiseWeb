import './App.css';
import { useTranslation } from 'react-i18next';
import { FolderComponent } from './components/UI/FolderComponent';
import { SaveNot } from './components/UI/SaveNot';
import QuestionSetComponent from './components/UI/QuestionSetComponent'; // Змінити на default імпорт

import ResourceComponent from './components/UI/ResourceComponent';
import HeaderComponent from './components/UI/HeaderComponent';
import { tr } from 'framer-motion/client';
import SearchComponent from './components/UI/SearchComponent';
import AvatarMenu from './components/UI/AvatarMenu';
import NotificationsList from './components/UI/NotificationComponent/NotificationList';
import AuthPage from './pages/Auth';
import MainPage from './pages/MainPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import YourLibraryPage from './pages/YourLibraryPage';
import NotificationPage from './pages/NotificationPage';

import PeopleComponent from './components/UI/PeopleComponent';
import PeoplePage from './pages/PeoplePage';
import SettingsPage from './pages/SettingsPage';
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import NewPassword from './pages/Auth/NewPassword';
import PasswordReset from './pages/Auth/PasswordReset';
import ConfirmEmail from './pages/Auth/ConfirmEmail';
import BuyPremium from './pages/BuyPremium';
import PeopleProfilePage from './pages/PeopleProfilePage';
import LookFolder from './pages/Folders/LookFolder';
import CreateEditFolder from './pages/Folders/CreateEditFolder';
import CreateEditSet from './pages/Sets/CreateEditSet';
import FavoritePage from './pages/FavoritePage';
import LookSet from 'pages/Sets/LookSet';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleSearchClick = (searchQuery) => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/confirmEmail" element={<ConfirmEmail />} />

      <Route path="/passwordreset" element={<PasswordReset />} />
      <Route path="/newpassword" element={<NewPassword />} />

      <Route path="/home" element={<MainPage />} />
      <Route path="/library" element={<YourLibraryPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/settings" element={<SettingsPage />} />

      <Route path="/buyPremium" element={<BuyPremium />} />
      <Route path="/profileUser" element={<PeopleProfilePage />} />

      <Route
        path="/folder"
        element={
          <LookFolder
            folderName="Folder name"
            visibility="Public"
            count="2"
            countQ="11"
          />
        }
      />

      <Route path="/createFolder" element={<CreateEditFolder />} />
      <Route
        path="/createSet"
        element={<CreateEditSet editOrCreate={'edit'} />}
      />

      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/lookSet" element={<LookSet />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

/* <div
      style={{
        width: '100vw',
      }}
    >
      
        <QuestionSetComponent
          questionsCount={10}
          categories={['Without category', 'Second']}
          username="username"
          date="12.10.2002"
          level="trainee"
        />
      

      <FolderComponent />
      <ResourceComponent />
    </div>*/

export default App;
