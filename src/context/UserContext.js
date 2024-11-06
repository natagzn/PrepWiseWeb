import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(() => {
    const storedIsPremium = localStorage.getItem('isPremium');
    // Перевіряємо, чи є значення в localStorage, і якщо ні, ставимо за замовчуванням false
    return storedIsPremium !== null ? JSON.parse(storedIsPremium) : false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    // Перевіряємо, чи є значення в localStorage, і якщо ні, ставимо за замовчуванням false
    return storedIsAdmin !== null ? JSON.parse(storedIsAdmin) : false;
  });

  useEffect(() => {
    // Перевіряємо, чи потрібно зберігати значення в localStorage
    if (isPremium !== null) {
      localStorage.setItem('isPremium', JSON.stringify(isPremium));
    }
  }, [isPremium]);

  useEffect(() => {
    // Перевіряємо, чи потрібно зберігати значення в localStorage
    if (isAdmin !== null) {
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    }
  }, [isAdmin]);

  const value = {
    isPremium,
    setIsPremium,
    isAdmin,
    setIsAdmin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
