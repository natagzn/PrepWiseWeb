import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchUserProfile } from 'api/apiUser';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AdminRoute = ({ element }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const checkAdminPrivileges = async () => {
      try {
        const userProfile = await fetchUserProfile();
        if (userProfile.email === 'admin@gmail.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Помилка перевірки профілю: ', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminPrivileges();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Вирівнювання по горизонталі
          alignItems: 'center', // Вирівнювання по вертикалі
          height: '100vh', // Повна висота екрану
        }}
      >
        <Spinner /> {/* Спінер буде відображатися по центру екрану */}
      </div>
    );
  }

  if (!isAdmin) {
    toast.error(t('This account does not have access to these features'));
    return <Navigate to={location.state?.from || '/home'} replace />;
  }

  return element;
};

export default AdminRoute;
