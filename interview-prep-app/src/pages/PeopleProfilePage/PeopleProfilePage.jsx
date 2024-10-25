import React, { useState } from 'react';
import styles from './PeopleProfilePage.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent/HeaderComponent';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import QuestionSetComponent from '../../components/UI/QuestionSetComponent/QuestionSetComponent';
import ResourceComponent from '../../components/UI/ResourceComponent/ResourceComponent';

Modal.setAppElement('#root');

function PeopleProfilePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sets');

  const [isFollowing, setIsFollowing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Фейкові дані для sets
  const questionSets = [
    {
      id: 1,
      title: 'Основи програмування',
      questionsCount: 10,
      categories: ['Програмування', 'Бази даних'],
      username: 'annanahalka',
      date: '2024-10-24',
      level: 'Середній',
      isLiked: true,
      visibility: 'Public',
    },
    {
      id: 2,
      title: 'JavaScript для початківців',
      questionsCount: 15,
      categories: ['JavaScript', 'Веб'],
      username: 'annanahalka',
      date: '2024-10-23',
      level: 'Легкий',
      isLiked: false,
      visibility: 'Public',
    },
    {
      id: 3,
      title: 'Алгоритми та структури даних',
      questionsCount: 12,
      categories: ['Алгоритми', 'ОПП'],
      username: 'annanahalka',
      date: '2024-10-22',
      level: 'Важкий',
      isLiked: true,
      visibility: 'Public',
    },
    {
      id: 4,
      title: 'Алгоритми та структури даних',
      questionsCount: 12,
      categories: ['Алгоритми', 'ОПП'],
      username: 'annanahalka',
      date: '2024-10-22',
      level: 'Важкий',
      isLiked: true,
      visibility: 'Public',
    },
  ];

  // Фейкові дані для resources
  const resources = [
    {
      id: 1,
      title: 'Вивчення React',
      category: 'Веб-розробка',
      username: 'annanahalka',
      date: '2024-10-20',
      description: 'Поглиблене керівництво по React для розробників.',
    },
    {
      id: 2,
      title: 'Довідник з SQL',
      category: 'Бази даних',
      username: 'annanahalka',
      date: '2024-10-18',
      description: 'Всі основи SQL, які вам потрібно знати.',
    },
    {
      id: 3,
      title: 'JavaScript: Поглиблене вивчення',
      category: 'Програмування',
      username: 'annanahalka',
      date: '2024-10-16',
      description: 'Розширене навчання JavaScript.',
    },
    {
      id: 4,
      title: 'JavaScript: Поглиблене вивчення',
      category: 'Програмування',
      username: 'annanahalka',
      date: '2024-10-16',
      description: 'Розширене навчання JavaScript.',
    },
    {
      id: 5,
      title: 'JavaScript: Поглиблене вивчення',
      category: 'Програмування',
      username: 'annanahalka',
      date: '2024-10-16',
      description: 'Розширене навчання JavaScript.',
    },
  ];

  const handleFollowClick = () => {
    if (isFollowing) {
      setIsModalOpen(true);
    } else {
      setIsFollowing(true);
    }
  };

  const confirmUnfollow = () => {
    setIsFollowing(false);
    setIsModalOpen(false);
  };

  const cancelUnfollow = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <HeaderComponent />
      <div className={styles.container}>
        <img
          className={styles.avatar}
          src="https://via.placeholder.com/120x120"
          alt="avatar"
        />
        <div className={styles.userInfo}>
          <div className={styles.userHeader}>
            <div className={styles.username}>annanahalka</div>
            <div className={styles.stats}>
              10 {t('followers_profile')} | 70 {t('followings')}
            </div>
            <motion.div
              className={styles.followButton}
              onClick={handleFollowClick}
              whileHover={{ scale: 1.05, backgroundColor: '#f0f0f0' }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.followButtonText}>
                {isFollowing ? t('following') : t('follow')}
              </div>
              <div className={styles.icon}></div>
            </motion.div>
          </div>
          <div className={styles.description}>
            {t('description')}: I am student of HPK
          </div>
          <div className={styles.location}>
            {t('location')}: Хмельницька область
          </div>
        </div>
      </div>

      {/* Модальне вікно підтвердження */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelUnfollow}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>
          <p>{t('unfollow_confirmation')}</p>
          <div className={styles.modalButtons}>
            <button className={styles.confirmButton} onClick={confirmUnfollow}>
              {t('yes')}
            </button>
            <button className={styles.cancelButton} onClick={cancelUnfollow}>
              {t('no')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Вкладки (sets та resources) */}
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 'sets' ? styles.active : ''}`}
          onClick={() => setActiveTab('sets')}
        >
          {t('question_sets')} - {questionSets.length}
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'resources' ? styles.active : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          {t('resources')} - {resources.length}
        </div>
      </div>

      {/* Контент для активної вкладки */}
      <div className={styles.tabContent}>
        {activeTab === 'sets' ? (
          <div className={styles.questionSetsGrid}>
            {questionSets.map((set) => (
              <div key={set.id}>
                <QuestionSetComponent
                  questionsCount={set.questionsCount}
                  title={set.title}
                  categories={set.categories}
                  username={set.username}
                  date={set.date}
                  level={set.level}
                  isLiked={set.isLiked}
                  visibility={set.visibility}
                  style={{ width: '500px' }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.resourcesList}>
            {resources.map((resource) => (
              <ResourceComponent
                key={resource.id}
                title={resource.title}
                category={resource.category}
                username={resource.username}
                date={resource.date}
                description={resource.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PeopleProfilePage;
