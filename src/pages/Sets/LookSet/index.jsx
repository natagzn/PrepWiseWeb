import React from 'react';
import SetInfoComponent from './SetInfoComponent';

import styles from './styles.module.css';
import SetQuickReviewComponent from './SetQuickReviewComponent';
import HeaderComponent from 'components/UI/HeaderComponent';
import CardBlock from './CardsBlock';

function LookSet() {
  const id = 2;
  const title = 'Title of Set';
  const author = 'nahalkaanna';
  const questionCount = 5;
  const level = 'Junior';
  const categories = ['JavaScript', 'FullStack'];
  const visibility = 'Public';
  const onSave = () => alert('Set saved!');
  const isLiked = false;
  const isAuthor = true;

  // Список об'єктів Question/Answer
  const questionsAnswers = [
    {
      id: 0,
      question: 'What is JavaScript?',
      answer: 'A programming language',
      status: 'know',
    },
    {
      id: 1,
      question:
        'What is a closure?What is a closure?What is a closure?What is a closure?What is a closure?What is a closure?What is a closure?What is a closure?What is a closure?What is a closure?What is a closure?What is a closure?',
      answer:
        'A function with its own lexical scope A function with its own lexical scope A function with its own lexical scope A function with its own lexical scope A function with its own lexical scope A function with its own lexical scope v ',
      status: 'stilllearning',
    },
    {
      id: 2,
      question: 'Explain event delegation.',
      answer: 'A technique to manage events efficiently',
      status: 'know',
    },
    {
      id: 3,
      question: 'What is a promise?',
      answer:
        'An object representing the eventual completion or failure of an asynchronous operation',
      status: 'stilllearning',
    },
    {
      id: 4,
      question: 'What is the difference between let and var?',
      answer: 'let is block scoped, var is function scoped',
      status: 'know',
    },
  ];

  return (
    <div>
      <HeaderComponent showPremium={true} />
      <div className={styles.container}>
        <SetInfoComponent
          title={title}
          author={author}
          questionCount={questionCount}
          level={level}
          categories={categories}
          visibility={visibility}
          onSave={onSave}
          isAuthor={isAuthor}
          id={id}
        />
        <div className={styles.separator} />
        <SetQuickReviewComponent
          questionsAnswers={questionsAnswers}
          setId={id}
          isAuthor={isAuthor}
        />
        <div className={styles.separator} />
        <CardBlock questionsAnswers={questionsAnswers} isAuthor={isAuthor} />
      </div>
    </div>
  );
}

export default LookSet;
