import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './styles.module.css';
import ConfirmationModal from 'components/UI/ConfirmModal';
import { useTranslation } from 'react-i18next';

const ResourceMenu = ({ id }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleDelete = () => {
    setDeleteModalOpen(true);
    setMenuOpen(false);
  };

  const handleModalCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleModalConfirmDelete = () => {
    console.log('Delete action confirmed');
    toast.success(t('Resource has been deleted successfully!'));
    handleModalCancel();
    window.location.reload();
  };

  const menuItems = [
    {
      icon: '/icons/menu/IconDelete.svg',
      label: t('delete'),
      action: handleDelete,
    },
  ];

  // Функція при натиску за межі меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !iconRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.menuWrapper}>
      {/* Іконка 3 крапок */}
      <button ref={iconRef} onClick={toggleMenu} className={styles.dotsButton}>
        ⋮
      </button>

      {/* Варіанти меню */}
      {isMenuOpen && (
        <div ref={menuRef} className={styles.menuContainer}>
          <div className={styles.menuList}>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={styles.menuItem}
                onClick={item.action}
              >
                <img src={item.icon} alt={item.label} className={styles.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleModalCancel}
        onConfirm={handleModalConfirmDelete}
        text={t('Are you sure you want to delete this resource?')}
      />
    </div>
  );
};

export default ResourceMenu;
