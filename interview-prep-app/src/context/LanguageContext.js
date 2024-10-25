import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../i18n/locales/en/translation.json';
import ukTranslations from '../i18n/locales/ua/translation.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Отримуємо збережену мову з localStorage або використовуємо 'uk' як мову за замовчуванням
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'ua'
  );

  // Використовуємо useEffect для збереження мови у localStorage при зміні
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translations = language === 'ua' ? ukTranslations : enTranslations;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ua' ? 'en' : 'ua'));
  };

  return (
    <LanguageContext.Provider
      value={{ language, translations, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
