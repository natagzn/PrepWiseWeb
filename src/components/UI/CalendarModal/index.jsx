import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import styles from './styles.module.css';
import './CalendarGlobal.css';
import { useTranslation } from 'react-i18next';
import { fetchDateOfVisits } from 'api/apiCalendar';

const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language') || 'en';
};

const CalendarComponent = ({ onClose }) => {
  const [loginDays, setLoginDays] = useState([]);
  const [language] = useState(getLanguageFromLocalStorage);
  const calendarRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const dates = await fetchDateOfVisits();
      const localDates = dates.map((date) => {
        const [year, month, day] = date.split('-');
        return new Date(year, month - 1, day).toISOString().split('T')[0];
      });
      console.log(localDates);
      setLoginDays(localDates);
    };

    fetchData();
  }, []);

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    return loginDays.some((day) => day === dateString)
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
