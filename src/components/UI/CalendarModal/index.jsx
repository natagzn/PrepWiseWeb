import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import styles from './styles.module.css';
import './CalendarGlobal.css';
import { useTranslation } from 'react-i18next';

const generateLoginDays = () => {
  const loginDays = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  for (let i = 0; i < 5; i++) {
    const randomDay = Math.floor(Math.random() * 28) + 1;
    loginDays.push(
      new Date(currentYear, currentMonth, randomDay).toDateString()
    );
  }
  return loginDays;
};

const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language') || 'en';
};

const CalendarComponent = ({ onClose }) => {
  const [loginDays] = useState(generateLoginDays);
  const [language] = useState(getLanguageFromLocalStorage);
  const calendarRef = useRef(null);

  const { t } = useTranslation();

  const tileClassName = ({ date }) => {
    return loginDays.includes(date.toDateString())
      ? 'react-calendar__tile--login-day'
      : null;
  };

  const formatMonthYear = (locale, date) => {
    return date.toLocaleString(language, {
      month: 'long',
      year: 'numeric',
    });
  };

  const formatShortWeekday = (locale, date) => {
    return date.toLocaleString(language, { weekday: 'short' });
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={calendarRef} className={styles.calendarContainer}>
      <div className={styles.title}>{t('Activity calendar')}</div>
      <Calendar
        tileClassName={tileClassName}
        className={styles.customCalendar}
        prevLabel="&lt;"
        nextLabel="&gt;"
        prev2Label={null}
        next2Label={null}
        formatMonthYear={formatMonthYear}
        formatShortWeekday={formatShortWeekday}
      />
    </div>
  );
};

export default CalendarComponent;
