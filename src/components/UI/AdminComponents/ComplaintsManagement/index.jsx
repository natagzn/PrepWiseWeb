import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import HeaderAdmin from '../Header';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Імпортуємо Spinner для індикатора завантаження
import { getAllReports } from 'api/apiReports';

const ComplaintsManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Стан для збереження скарг
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); // Стан завантаження
  const [error, setError] = useState('');

  // Викликаємо функцію при завантаженні компоненту для отримання скарг
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true); // Встановлюємо loading в true перед запитом
      const response = await getAllReports();
      if (response.success) {
        setComplaints(response.data);
      } else {
        setError(response.message || 'Error fetching complaints');
      }
      setLoading(false); // Завантаження завершено
    };

    fetchComplaints();
  }, []);

  const handleViewClick = (complaint) => {
    console.log('comp', complaint);
    if (complaint.resources_id !== undefined) {
      navigate(`/admin/resources/${complaint.resources_id}`);
    } else if (complaint.set_id !== undefined) {
      navigate(`/admin/set/${complaint.set_id}`);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container my-4">
        <h2>{t('Manage complaints')}</h2>
        {loading ? ( // Відображення індикатора завантаження
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>{t('ID')}</th>
                <th>{t('User ID')}</th>
                <th>{t('Complaint Type')}</th>
                <th>{t('Material Name')}</th> {/* Новий стовпець */}
                <th>{t('Context')}</th>
                <th>{t('Date')}</th>
                <th>{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.complaint_id}>
                  <td>{complaint.complaint_id}</td>
                  <td>{complaint.user_id}</td>
                  <td>{complaint.resources_id ? 'Resource' : 'Set'}</td>
                  <td className={styles.materialName}>
                    {complaint.material_name} {/* Виводимо назву матеріалу */}
                  </td>
                  <td>{complaint.context}</td>
                  <td>{new Date(complaint.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleViewClick(complaint)}
                    >
                      {t('View')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ComplaintsManagement;
