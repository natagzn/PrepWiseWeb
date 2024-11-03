import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Ініціалізація станів, перевіряючи Local Storage
  const [user_id, setUserId] = useState(
    () => localStorage.getItem('user_id') || null
  );
  const [isPremium, setIsPremium] = useState(
    () => JSON.parse(localStorage.getItem('isPremium')) || false
  );
  const [isAdmin, setIsAdmin] = useState(
    () => JSON.parse(localStorage.getItem('isAdmin')) || false
  );

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
