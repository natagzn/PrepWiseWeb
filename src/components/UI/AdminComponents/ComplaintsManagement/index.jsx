import React, { useState } from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import HeaderAdmin from '../Header';
import { useNavigate } from 'react-router-dom';

const ComplaintsManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Фіктивні дані скарг з доданою датою
  const [complaints, setComplaints] = useState([
    {
      complaint_id: 1,
      user_id: 101,
      user_id_compl: 201,
      resources_id: 1,
      context: 'Проблема з ресурсом A',
      date: '2024-10-01',
    },
    {
      complaint_id: 2,
      user_id: 102,
      user_id_compl: 202,
      set_id: 1,
      context: 'Запит на додавання питання до набору Q',
      date: '2024-10-02',
    },
    {
      complaint_id: 3,
      user_id: 103,
      user_id_compl: 203,
      resources_id: 1,
      context: 'Помилка в ресурсі B',
      date: '2024-10-03',
    },
    {
      complaint_id: 4,
      user_id: 104,
      user_id_compl: 204,
      resources_id: 6,
      context: 'Необхідна підтримка',
      date: '2024-10-04',
    },
  ]);

  const handleViewClick = (complaint) => {
    if (complaint.resources_id) {
      navigate(`/admin/resources/${complaint.resources_id}`);
    } else if (complaint.set_id) {
      navigate(`/admin/set/${complaint.set_id}`);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container my-4">
        <h2>{t('Manage complaints')}</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{t('ID')}</th>
              <th>{t('User ID')}</th>
              <th>{t('Complaint Type')}</th>
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
      </div>
    </div>
  );
};

export default ComplaintsManagement;
