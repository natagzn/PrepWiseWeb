import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './styles.module.css';
import ConfirmationModal from 'components/UI/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { deleteFolder } from 'api/apiFolder';

const FolderMenu = ({ id, isAuthor, isCoauthor }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isReportOpen, setReportOpen] = useState(false);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  // Функція для зміни стану меню
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleEdit = () => {
    navigate(`/editFolder/${id}`);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
    setMenuOpen(false);
  };

  const handleModalCancel = () => {
    setResetModalOpen(false);
    setDeleteModalOpen(false);
    setReportOpen(false);
    setFolderModalOpen(false);
    setShareOpen(false);
  };

  const handleModalConfirmDelete = async () => {
    const result = await deleteFolder(id);

    if (result.success) {
      toast.success(t('Folder has been deleted successfully!'));
      navigate(-1);
    } else {
      toast.error(t(`Error deleting folder: ${result.message}`));
    }

    handleModalCancel();
  };

  const menuItems = [
    { icon: '/icons/menu/IconEdit.svg', label: t('edit'), action: handleEdit },
    {
      icon: '/icons/menu/IconDelete.svg',
      label: t('delete'),
      action: handleDelete,
    },
  ];

  // Натиск поза межами модального вікна
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
      {/* Іконка 3 крапок*/}
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
        text={t('Are you sure you want to delete this folder?')}
      />
    </div>
  );
};

export default FolderMenu;
