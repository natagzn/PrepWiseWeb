// NotificationItem.js
import NotificationHeader from '../NotificationHeader/NotificationHeader';
import NotificationText from '../NotificationText/NotificationText';
import styles from './NotificationItem.module.css';

// Імпортуємо іконки
import threatIcon from '../thr.svg'; // Змініть на актуальний шлях
import awardIcon from '../award.svg'; // Змініть на актуальний шлях
import answerIcon from '../answer.svg'; // Змініть на актуальний шлях
import peopleIcon from '../peple.svg'; // Змініть на актуальний шлях

const iconSettings = {
  Threat: { color: '#FF9900', icon: threatIcon },
  Award: { color: '#F4E04D', icon: awardIcon },
  Answer: { color: '#A9BFAA', icon: answerIcon },
  Question: { color: '#A9BFAA', icon: answerIcon },
  People: { color: '#AFBED1', icon: peopleIcon },
};

const NotificationItem = (props) => {
  const { color, icon } = iconSettings[props.type] || {};
  return (
    <div
      className={styles.notificationItem}
      onClick={props.onClick}
      style={props.style}
    >
      <NotificationHeader
        iconColor={color}
        title={props.title}
        count={props.count}
        icon={icon}
      />
      <NotificationText
        message={props.message}
        description={props.description}
        date={props.date}
      />
    </div>
  );
};

export default NotificationItem;

/*
type,
  title,
  count,
  message,
  description,
  date,
  link,
  onClick,
*/
