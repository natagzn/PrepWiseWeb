import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import NotificationItem from '../../components/UI/NotificationComponent/NotificationItem/NotificationItem';
import NewFollowersModal from '../../components/UI/NewFollowersModal';
import { useTranslation } from 'react-i18next';
import AnswerToQuestionModal from 'components/UI/NotificationComponent/AnswerToQuestionModal';
import FooterComponent from 'components/UI/FooterComponent';
import {
  getAllNotifications,
  getInfoAboutRequestForHelpById,
} from 'api/apiNotifications';
import { Spinner } from 'react-bootstrap';

const NotificationPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { success, data } = await getAllNotifications();

        if (success) {
          // Сортуємо від найновіших до найстаріших
          const sortedData = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );

          // Обробляємо запити з requestId
          const requests = await Promise.allSettled(
            sortedData
              .filter((notif) => notif.requestId !== null)
              .map(async (notif) => {
                const response = await getInfoAboutRequestForHelpById(
                  notif.requestId
                );

                if (response.success && response.data) {
                  const {
                    id,
                    date,
                    questionContent,
                    questionId,
                    friendUserId,
                    friendUsername,
                  } = response.data;
                  return {
                    type: 'Question',
                    title: `${t('From')} ${friendUsername}`,
                    message: t('can_you_help_me_with_question'),
                    description: t('look_question'),
                    date: new Date(date).toLocaleDateString(),
                    questionId,
                    friendUserId,
                    questionContent,
                    friendUsername,
                    id,
                  };
                }
                return null;
              })
          );

          // Фільтруємо fulfilled результати і зберігаємо значення value
          const fulfilledRequests = requests
            .filter((notif) => notif.status === 'fulfilled' && notif.value)
            .map((notif) => notif.value);

          console.log('fulfilledRequests', fulfilledRequests);

          setNotifications(fulfilledRequests);
        }
      } catch (error) {
        console.error('Помилка завантаження повідомлень:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const openFollowersModal = () => setIsModalOpen(true);
  const closeFollowersModal = () => setIsModalOpen(false);

  const openQuestionModal = (questionId, questionContent, friendUsername) => {
    setQuestionData({ questionId, questionContent, friendUsername });
  };

  const closeQuestionModal = () => setQuestionData(null);

  const handleSendAnswer = (answerText) => {
    console.log('Answer sent:', answerText);
  };

  return (
    <div>
      <HeaderComponent showPlus={true} showSearch={true} />
      <div className={styles.container}>
        <h1 className={styles.title}>{t('notifications')}</h1>
        <div className={styles.notificationsListContainer}>
          <NotificationItem
            type="People"
            title={t('new_followers')}
            count="3"
            onClick={openFollowersModal}
            style={{ cursor: 'pointer' }}
          />
          <div className={styles.separator} />
          {!isLoading && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                {...notification}
                onQuestionClick={() =>
                  openQuestionModal(
                    notification.questionId,
                    notification.questionContent,
                    notification.friendUsername
                  )
                }
              />
            ))
          ) : (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          )}
        </div>

        {isModalOpen && <NewFollowersModal onClose={closeFollowersModal} />}
        {questionData && (
          <AnswerToQuestionModal
            questionFrom={`${t('From')} ${questionData.friendUsername}`}
            questionContent={questionData.questionContent}
            questionId={questionData.questionId}
            onClose={closeQuestionModal}
            onSend={handleSendAnswer}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

/*const notifications = [
    {
      type: 'Award',
      title: 'Award',
      message: 'You have won an award!',
      description:
        '- You have studied 5 modules. A new profile frame is available to you.',
      date: '4d',
    },
    {
      type: 'Threat',
      title: 'Thread',
      message: 'You created a new thread',
      description:
        ' - Super! Don`t lose momentum and keep learning. You are super!',
      date: '5d',
    },
    {
      type: 'Question',
      title: 'From soonnias',
      message: 'Can you help me with this question please?',
      description: '   Look question ->',
      date: '6d',
      questionId: 1,
    },
    {
      type: 'Answer',
      title: 'From annanahalka',
      message: 'Here is my answer, maybe it will help',
      description: '   Look answer ->',
      date: '7d',
      setId: 2,
    },
  ];*/
