import React, { useState } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import NotificationItem from '../../components/UI/NotificationComponent/NotificationItem/NotificationItem';
import NewFollowersModal from '../../components/UI/NewFollowersModal';
import { useTranslation } from 'react-i18next';
import AnswerToQuestionModal from 'components/UI/NotificationComponent/AnswerToQuestionModal';

const NotificationPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState(null);

  const openFollowersModal = () => setIsModalOpen(true);
  const closeFollowersModal = () => setIsModalOpen(false);

  const openQuestionModal = (questionId) => {
    const question = notifications.find(
      (notif) => notif.questionId === questionId
    );
    setQuestionData(question);
  };

  const closeQuestionModal = () => setQuestionData(null);

  const handleSendAnswer = (answerText) => {
    console.log('Answer sent:', answerText);
  };

  const notifications = [
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
  ];

  return (
    <div>
      <HeaderComponent />
      <div className={styles.container}>
        <h1 className={styles.title}>{t('notifications')}</h1>
        <div className={styles.notificationsListContainer}>
          <NotificationItem
            type="People"
            title="New followers"
            count="3"
            onClick={openFollowersModal}
            style={{ cursor: 'pointer' }}
          />
          <div className={styles.separator} />
          {notifications
            .filter((notification) => notification.type !== 'People')
            .map((notification, index) => (
              <NotificationItem
                key={index}
                {...notification}
                onQuestionClick={openQuestionModal}
              />
            ))}
        </div>

        {isModalOpen && <NewFollowersModal onClose={closeFollowersModal} />}
        {questionData && (
          <AnswerToQuestionModal
            questionFrom={questionData.title} // передайте title для "from"
            questionId={questionData.questionId}
            onClose={closeQuestionModal}
            onSend={handleSendAnswer} // зміна тут
          />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
