import React from 'react';
import styles from './styles.module.css';

const AnswerCard = ({ avatar, username, date, answer }) => (
  <div className={styles.answerCard}>
    <div className={styles.userInfo}>
      {/*<img
        className={styles.avatar}
        src={avatar}
        alt={`${username}'s avatar`}
      />*/}
      <div className={styles.userInfoColumn}>
        <div className={styles.username}>{username}</div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
    <div className={styles.answerText}>{answer}</div>
  </div>
);

const AnswersModal = ({ questionID, onClose }) => {
  // Згенеровані відповіді для тестування
  const answers = [
    {
      avatar: '/path/to/avatar1.jpg',
      username: 'VeryLongUsernameThatExceedsNormalLength1',
      date: '2024-10-29 22:22',
      text: 'This is a very long answer to the question that has been asked. It goes into great detail and provides a comprehensive explanation of the topic at hand.',
    },
    {
      avatar: '/path/to/avatar2.jpg',
      username: 'AnotherLongUsernameThatShouldBeChecked2',
      date: '2024-10-28 20:20',
      text: 'Here is another lengthy response, which includes multiple points and thorough discussions about various aspects of the question. It is essential to provide detailed information for clarity.',
    },
    {
      avatar: '/path/to/avatar3.jpg',
      username: 'YetAnotherUsernameThatIsLong3',
      date: '2024-10-27 20:20',
      text: 'An insightful answer that elaborates on the original question with rich context and examples. The length of this answer is deliberate to ensure complete understanding.',
    },
    {
      avatar: '/path/to/avatar4.jpg',
      username: 'UserWithAnExtremelyLongNameThatMightCauseLayoutIssues4',
      date: '2024-10-26 20:20',
      text: 'A concise yet profound answer that captures the essence of the query while maintaining a good length for discussion. It encourages further conversation about the topic.',
    },
    {
      avatar: '/path/to/avatar5.jpg',
      username: 'FinalLongUsernameToCheckAdaptivity5',
      date: '2024-10-25 20:20',
      text: 'This response is meant to provide an exhaustive insight into the subject, covering all necessary details to help others understand the complexity of the question.',
    },
  ];

  return (
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Answers</h2>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
      </div>
      <div className={styles.answersList}>
        {answers.map((answer, index) => (
          <AnswerCard
            key={index}
            avatar={answer.avatar}
            username={answer.username}
            date={answer.date}
            answer={answer.text}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswersModal;
