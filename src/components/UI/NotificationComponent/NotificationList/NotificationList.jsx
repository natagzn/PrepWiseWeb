import NotificationItem from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.css';

const NotificationsList = () => {
  return (
    <div className={styles.notificationsListContainer}>
      <NotificationItem
        type="People"
        title="New followers"
        count="3"
        link="https://example.com/followers" // Додати посилання
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
  );
};

export default NotificationsList;
