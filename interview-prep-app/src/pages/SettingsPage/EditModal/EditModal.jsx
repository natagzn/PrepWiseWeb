import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import styles from './EditModal.module.css';

const EditModal = ({ isOpen, onClose, userData, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(userData);
  const [avatar, setAvatar] = useState(null);
  const [countries, setCountries] = useState([]); // Стан для країн
  const [locationInput, setLocationInput] = useState(''); // Стан для вибору країни

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

  const handleFileChange = (e) => {
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
  };

  const handleLocationChange = (e) => {
    setLocationInput(e.target.value); // Зберігаємо вибране значення
  };

  const handleSave = () => {
    // Перевіряємо, чи введена країна є в списку
    if (!countries.includes(locationInput)) {
      toast.error(t('invalid_location')); // Відображаємо повідомлення про помилку
      return;
    }

    const updatedData = { ...formData, avatar, location: locationInput };
    onSave(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{t('edit_information')}</h2>
        <div>
          <label>{t('avatar')}:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {avatar && (
            <img
              src={avatar}
              alt={t('avatar_preview')}
              className={styles.avatarPreview}
            />
          )}
        </div>
        <div>
          <label>{t('username')}:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('email')}:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('description')}:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{t('location')}:</label>
          <select
            name="location"
            value={locationInput}
            onChange={handleLocationChange}
          >
            <option value="">{t('select_country')}</option>{' '}
            {/* Заглушка для випадаючого списку */}
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
          <button onClick={onClose} className={styles.cancelButton}>
            {t('cancel')}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditModal;
