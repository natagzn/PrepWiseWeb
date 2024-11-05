import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Ініціалізація станів, перевіряючи Local Storage
  const [user_id, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('user_id');
    return storedUserId !== 'undefined' ? storedUserId : null;
  });

  const [isPremium, setIsPremium] = useState(() => {
    const storedIsPremium = localStorage.getItem('isPremium');
    return storedIsPremium !== 'undefined'
      ? JSON.parse(storedIsPremium)
      : false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    return storedIsAdmin !== 'undefined' ? JSON.parse(storedIsAdmin) : false;
  });

  // Зберігаємо дані в Local Storage при кожній зміні
  useEffect(() => {
    localStorage.setItem('user_id', user_id);
  }, [user_id]);

  useEffect(() => {
    localStorage.setItem('isPremium', JSON.stringify(isPremium));
  }, [isPremium]);

  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  const value = {
    user_id,
    setUserId,
    isPremium,
    setIsPremium,
    isAdmin,
    setIsAdmin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
