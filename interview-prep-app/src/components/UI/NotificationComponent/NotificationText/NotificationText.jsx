import styles from './NotificationText.module.css';

const NotificationText = ({ message, description, date }) => {
  return (
    <div className={styles.textContainer}>
      <div className={styles.textGroup}>
        <div className={styles.message}>{message}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

export default NotificationText;
