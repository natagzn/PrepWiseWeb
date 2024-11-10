import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import HeaderAdmin from '../Header';
import Spinner from 'react-bootstrap/Spinner';
import { getAllSupportRequests } from 'api/apiSupportRequest';

const SupportManagement = () => {
  const { t } = useTranslation();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      const result = await getAllSupportRequests();
      if (result.success) {
        setFeedbacks(result.data);
      } else {
        console.error(result.message);
      }
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  const handleEmailClick = (email) => {
    const subject = encodeURIComponent(t('support_response_subject'));
    const body = encodeURIComponent(
      `${t('greeting')},\n\n${t('feedback_thanks')}\n\n${t('best_regards')},\n${t('support_team')}`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    const newTab = window.open(gmailUrl, '_blank');

    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      alert(t('error_opening_gmail'));
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container my-4">
        <h2>{t('Support Management')}</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>{t('Feedback ID')}</th>
                <th>{t('User ID')}</th>
                <th>{t('Username')}</th>
                <th>{t('Email')}</th>
                <th>{t('Content')}</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.feedback_id}>
                  <td>{feedback.feedback_id}</td>
                  <td>{feedback.user_id}</td>
                  <td>{feedback.username}</td>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEmailClick(feedback.email);
                      }}
                      className={styles.emailLink}
                    >
                      {feedback.email}
                    </a>
                  </td>
                  <td>{feedback.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SupportManagement;
