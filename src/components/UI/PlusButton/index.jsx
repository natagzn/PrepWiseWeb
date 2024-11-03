import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import CreateQuestion from './CreateQuestion';
import CreateResource from './CreateResource';
import { useNavigate } from 'react-router-dom';

function PlusButton() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false); // Стан для модального вікна CreateQuestion
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false); // Стан для модального вікна CreateResource
  const optionsRef = useRef(null);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setIsOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const options = [
    {
      id: 1,
      icon: '/icons/question.svg',
      text: t('Question'),
      onClick: () => {
        setIsQuestionModalOpen(true);
        setIsOptionsVisible(false); // Закриваємо варіанти
      },
    },
    {
      id: 2,
      icon: '/icons/set.svg',
      text: t('Question set'),
      onClick: () => {
        navigate('/createSet', {
          state: {
            editOrCreate: 'create',
          },
        });

        setIsOptionsVisible(false); // Закриваємо варіанти
      },
    },
    {
      id: 3,
      icon: '/icons/folder.svg',
      text: t('Folder'),
      onClick: () => {
        navigate('/createFolder', {
          state: {
            editOrCreate: 'create',
          },
        });
        setIsOptionsVisible(false); // Закриваємо варіанти
      },
    },
    {
      id: 4,
      icon: '/icons/resource.svg',
      text: t('Resource'),
      onClick: () => {
        setIsResourceModalOpen(true); // Відкриваємо модальне вікно CreateResource
        setIsOptionsVisible(false); // Закриваємо варіанти
      },
    },
  ];

  return (
    <>
      <div className={styles['plus-box']} onClick={toggleOptions}>
        <img
          src="/icons/plusButton.svg"
          alt="plusButton"
          className={styles['plus-icon']}
        />
        {isOptionsVisible && (
          <div className={styles['options-box']} ref={optionsRef}>
            <div className={styles['options-content']}>
              <div className={styles['title']}>{t('Add new')}</div>
              <div className={styles['divider']}></div>
              {options.map((option) => (
                <React.Fragment key={option.id}>
                  <div className={styles['option']} onClick={option.onClick}>
                    <div className={styles['icon-container']}>
                      <img
                        src={option.icon}
                        alt={option.text}
                        className={styles['icon']}
                      />
                    </div>
                    <div className={styles['option-text']}>{option.text}</div>
                  </div>
                  <div className={styles['divider']}></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
      <CreateQuestion
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
      />
      <CreateResource
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
      />
    </>
  );
}

export default PlusButton;
