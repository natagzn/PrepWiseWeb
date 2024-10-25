// NotificationPage.js
import React, { useState } from 'react';
import styles from './NotificationPage.module.css'; // Імпорт стилів
import HeaderComponent from '../../components/UI/HeaderComponent/HeaderComponent';
import NotificationItem from '../../components/UI/NotificationComponent/NotificationItem/NotificationItem';
import NotificationsList from '../../components/UI/NotificationComponent/NotificationList/NotificationList';
import NewFollowersModal from '../../components/UI/NewFollowersModal/NewFollowersModal';
import { useTranslation } from 'react-i18next';

// доробити мови потім
const NotificationPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const notifications = [
    {
      type: 'People',
      title: 'New followers',
      count: 3,
    },
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
      message: 'You have created a new activity thread',
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
    },
    {
      type: 'Answer',
      title: 'From annanahalka',
      message: 'Here is my answer, maybe it will help',
      description: '   Look answer ->',
      date: '7d',
    },
  ];

  return (
    <div>
      <HeaderComponent />
      <div className={styles.container}>
        <h1 className={styles.title}>{t('notifications')}</h1>
        {/*<div className={styles.notificationsContainer}>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} {...notification} />
        ))}
      </div>*/}
        <div className={styles.notificationsListContainer}>
          <NotificationItem
            type="People"
            title="New followers"
            count="3"
            onClick={openModal}
            style={{ cursor: 'pointer' }}
          />
          <div className={styles.separator} />
          <NotificationItem
            type="Award"
            title="Award"
            message="You have won an award"
            description="- You have studied 5 modules. A new profile frame is available to you."
            date="21 Sept."
            link="https://example.com/award" // Додати посилання
          />
          <NotificationItem
            type="Threat"
            title="Threat"
            message="You have created a new activity thread"
            description="- Super! Don`t lose momentum and keep learning."
            date="21 Sept."
            link="https://example.com/award" // Додати посилання
          />
          <NotificationItem
            type="Answer"
            title="From annanahalka"
            message="You have a new answer to your question"
            description="- Check out the response in the discussion."
            date="2d"
            link="https://example.com/answer" // Додати посилання
          />
          <NotificationItem
            type="Question"
            title="From soonnias"
            message="You have a new question asked"
            description="- Someone is seeking your expertise."
            date="3d"
            link="https://example.com/question" // Додати посилання
          />
        </div>

        {isModalOpen && <NewFollowersModal onClose={closeModal} />}
      </div>
    </div>
  );
};

export default NotificationPage;
