import React from 'react';
import NotificationHeader from '../NotificationHeader';
import NotificationText from '../NotificationText';
import styles from './NotificationItem.module.css';
import threatIcon from '../../../assets/NotifactionComponent/thr.svg';
import awardIcon from '../../../assets/NotifactionComponent/award.svg';
import answerIcon from '../../../assets/NotifactionComponent/answer.svg';
import peopleIcon from '../../../assets/NotifactionComponent/peple.svg';
import { useNavigate } from 'react-router-dom';

const iconSettings = {
  Threat: { color: '#FF9900', icon: threatIcon },
  Award: { color: '#F4E04D', icon: awardIcon },
  Answer: { color: '#A9BFAA', icon: answerIcon },
  Question: { color: '#A9BFAA', icon: answerIcon },
  People: { color: '#AFBED1', icon: peopleIcon },
};

const NotificationItem = (props) => {
  const { color, icon } = iconSettings[props.type] || {};
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    } else if (props.setId) {
      navigate(`/lookSet/${props.setId}`);
    } else if (props.questionId && props.onQuestionClick) {
      props.onQuestionClick(props.questionId);
    }
  };

  return (
    <div
      className={styles.notificationItem}
      onClick={handleClick}
      style={{
        ...props.style,
        cursor:
          props.type === 'Answer' ||
          props.type === 'People' ||
          props.type === 'Question'
            ? 'pointer'
            : 'default',
      }}
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
  setId,
  questionId,
  onClick,
*/
