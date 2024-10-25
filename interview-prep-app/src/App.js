import './App.css';
import { useTranslation } from 'react-i18next';
import { FolderComponent } from './components/UI/FolderComponent/FolderComponent';
import { SaveNot } from './components/UI/SaveNot/SaveNot';
import QuestionSetComponent from './components/UI/QuestionSetComponent/QuestionSetComponent'; // Змінити на default імпорт

import ResourceComponent from './components/UI/ResourceComponent/ResourceComponent';
import HeaderComponent from './components/UI/HeaderComponent/HeaderComponent';
import { tr } from 'framer-motion/client';
import SearchComponent from './components/UI/SearchComponent/SearchComponent';
import AvatarMenu from './components/UI/AvatarMenu/AvatarMenu';
import NotificationsList from './components/UI/NotificationComponent/NotificationList/NotificationList';
import AuthPage from './pages/Auth/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import YourLibraryPage from './pages/YourLibraryPage/YourLibraryPage';
import NotificationPage from './pages/NotificationPage/NotificationPage';

import PeopleComponent from './components/UI/PeopleComponent/PeopleComponent';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import LoginForm from './pages/Auth/LoginForm/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm/RegisterForm';
import NewPassword from './pages/Auth/NewPassword/NewPassword';
import PasswordReset from './pages/Auth/PasswordReset/PasswordReset';
import ConfirmEmail from './pages/Auth/ConfirmEmail/ConfirmEmail';
import BuyPremium from './pages/BuyPremium/BuyPremium';
import PeopleProfilePage from './pages/PeopleProfilePage/PeopleProfilePage';
import LookFolder from './pages/Folders/LookFolder/LookFolder';
import CreateEditFolder from './pages/Folders/CreateEditFolder/CreateEditFolder';

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
      {/* Додай інші сторінки за потреби */}
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
