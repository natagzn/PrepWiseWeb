import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './styles.module.css';
import ConfirmationModal from 'components/UI/ConfirmModal';
import ReportComponent from 'components/UI/ReportComponent';
import { useTranslation } from 'react-i18next';
import SelectFolderModal from '../SelectFolderModal';
import SettingsShare from '../SettingShare';
import { resetProgressForAllQuestions } from 'api/apiSet';

const SetMenu = ({ id, isAuthor, isCoauthor, questions }) => {
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

  // Function to open/close menu
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleEdit = () => {
    navigate(`/editSet/${id}`);
    setMenuOpen(false);
  };

  const handleShare = () => {
    setShareOpen(true);
    setMenuOpen(false);
  };

  const handleExport = () => {
    console.log('Export to PDF action triggered');
    setMenuOpen(false);
  };

  const handleReset = () => {
    setResetModalOpen(true);
    setMenuOpen(false);
  };

  const handleAddToFolder = () => {
    setFolderModalOpen(true);
    setMenuOpen(false);
  };

  const handleReport = () => {
    setReportOpen(true);
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

  const handleModalConfirmReset = async () => {
    console.log('Reset progress confirmed');

    try {
      const updatedQuestions = await resetProgressForAllQuestions(questions);
      //toast.success(t('Progress has been reset successfully!'));
      window.location.reload();
      handleModalCancel();
    } catch (error) {
      // Якщо сталася помилка, відображаємо повідомлення про помилку
      console.error('Error resetting progress:', error);
      toast.error(t('Failed to reset progress. Please try again.'));
    }
  };

  const handleModalConfirmDelete = () => {
    console.log('Delete action confirmed');
    toast.success(t('Set has been deleted successfully!'));
    handleModalCancel();
    navigate(-1);
  };

  const menuItems = [
    { icon: '/icons/menu/IconEdit.svg', label: t('edit'), action: handleEdit },
    {
      icon: '/icons/menu/IconShare.svg',
      label: t('share'),
      action: handleShare,
    },
    {
      icon: '/icons/menu/IconPdf.svg',
      label: t('export to pdf'),
      action: handleExport,
    },
    {
      icon: '/icons/menu/IconReset.svg',
      label: t('reset progress'),
      action: handleReset,
    },
    {
      icon: '/icons/menu/IconFolder.svg',
      label: t('add to folder'),
      action: handleAddToFolder,
    },
    {
      icon: '/icons/menu/IconReport.svg',
      label: t('report'),
      action: handleReport,
    },
    {
      icon: '/icons/menu/IconDelete.svg',
      label: t('delete'),
      action: handleDelete,
    },
  ];

  // Effect to handle clicks outside the menu
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
      <button ref={iconRef} onClick={toggleMenu} className={styles.dotsButton}>
        ⋮
      </button>

      {/* Options menu */}
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

      {/* Confirmation modals */}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        onRequestClose={handleModalCancel}
        onConfirm={handleModalConfirmReset}
        text={t('Are you sure you want to reset your progress?')}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleModalCancel}
        onConfirm={handleModalConfirmDelete}
        text={t('Are you sure you want to delete this set?')}
      />

      {/* Additional Components */}
      {isReportOpen && (
        <ReportComponent type="set" onClose={handleModalCancel} />
      )}
      {isFolderModalOpen && (
        <SelectFolderModal
          isOpen={isFolderModalOpen}
          onClose={handleModalCancel}
          onSelect={(folderTitle) => {
            toast.success(`${t('Set added to')} '${folderTitle}'`);
            handleModalCancel();
          }}
        />
      )}
      {isShareOpen && <SettingsShare onClose={handleModalCancel} setId={id} />}
    </div>
  );
};

export default SetMenu;
