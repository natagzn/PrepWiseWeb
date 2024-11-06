import React from 'react';
import styles from './styles.module.css';
import HelpComponent from '../HelpComponent';

const QuestionAnswerComponent = ({ question, answer, status, id, help }) => {
  console.log('Q', question);
  return (
    <div className={styles.card}>
      <div className={styles.question}>{question}</div>
      <div className={styles.answer}>{answer}</div>
      <div className={styles.icon}>{help && <HelpComponent id={id} />}</div>
    </div>
  );
};

export default QuestionAnswerComponent;
