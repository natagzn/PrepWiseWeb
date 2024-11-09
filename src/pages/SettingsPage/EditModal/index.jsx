import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { updateProfile } from 'api/apiUser';

const EditModal = ({ isOpen, onClose, userData, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(userData);
  const [avatar, setAvatar] = useState(null);
  const [countries, setCountries] = useState([]); // Стан для країн
  const [locationInput, setLocationInput] = useState(''); // Стан для вибору країни
  const [message, setMessage] = useState(''); // Стан для повідомлення

  useEffect(() => {
    // Оновлення formData, коли userData змінюється
    setFormData(userData);

    if (userData.location) {
      setLocationInput(userData.location);
    }
  }, [userData]);

  useEffect(() => {
    // Отримання списку країн
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        const sortedCountryNames = countryNames.sort(); // Сортуємо країни
        setCountries(sortedCountryNames);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;

    if (value === 'null') {
      setLocationInput('');
    } else {
      setLocationInput(value);
    }
  };

  const handleClose = () => {
    setFormData(userData);

    if (userData.location) {
      setLocationInput(userData.location);
    }
    onClose();
  };

  const handleSave = async () => {
    const updatedData = {
      ...formData,
      avatar,
      location: locationInput.trim() === '' ? null : locationInput, // Якщо порожньо, то null
      bio: formData.bio.trim() === '' ? null : formData.bio, // Якщо bio порожнє або з пробілами, то використовуємо порожній рядок
    };

    const result = await updateProfile(updatedData, t);
    setMessage(result.message);
    if (result.success) {
      onSave(result.data);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{t('edit_information')}</h2>
        {/*<div>
          <label>{t('avatar')}:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {avatar && (
            <img
              src={avatar}
              alt={t('avatar_preview')}
              className={styles.avatarPreview}
            />
          )}
        </div>*/}
        <div>
          <label>{t('username')}:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled // Блокуємо поле
          />
        </div>
        <div>
          <label>{t('email')}:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled // Блокуємо поле
          />
        </div>
        <div>
          <label>{t('description')}:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </div>
        <div>
          <label>{t('location')}:</label>
          <select
            name="location"
            value={locationInput}
            onChange={handleLocationChange}
          >
            <option value="null">{t('select_country')}</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveButton}>
            {t('save')}
          </button>
          <button onClick={handleClose} className={styles.cancelButton}>
            {t('cancel')}
          </button>
        </div>

        {/* Виводимо повідомлення у модальному вікні 
        {message && <div className={styles.message}>{message}</div>}*/}
      </div>
    </div>
  );
};

export default EditModal;

/*const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    e.target.value = '';

    if (file) {
      if (!validImageTypes.includes(file.type)) {
        toast.error(t('invalid_file_type'));
        setAvatar(null);
        return;
      }

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setAvatar(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };*/
