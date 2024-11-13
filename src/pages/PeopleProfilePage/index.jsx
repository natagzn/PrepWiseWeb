import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import HeaderComponent from '../../components/UI/HeaderComponent';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import QuestionSetComponent from '../../components/UI/QuestionSetComponent';
import ResourceComponent from '../../components/UI/ResourceComponent';
import { getFullInfoUser } from 'api/apiUser';
import { fetchSetById } from 'api/apiSet';
import { fetchResourceById } from 'api/apiResource';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { generateAvatar } from 'components/generateAvatar';
import { toast } from 'react-toastify';
import { addSubscribe, deleteSubscribe } from 'api/apiPeople';
import FooterComponent from 'components/UI/FooterComponent';
import LayoutFooter from 'components/layout/LayoutFooter';

const PeopleProfilePage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sets');
  const [relationshipStatus, setRelationshipStatus] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionSets, setQuestionSets] = useState([]);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { id } = useParams();

  const loadUserProfileData = async () => {
    setIsLoading(true);
    try {
      const userDataResponse = await getFullInfoUser(id);
      const { data } = userDataResponse;
      setUserData(data);

      const setsData = await Promise.all(
        data.publicSetIds.map(async (setId) => {
          const setData = await fetchSetById(setId);
          return setData.success !== false ? { ...setData, id: setId } : null;
        })
      );
      // Сортуємо setsData за createdAt від найновішого до найстарішого
      setQuestionSets(
        setsData
          .filter(Boolean)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );

      const resourcesData = await Promise.all(
        data.resourceIds.map(async (resourceId) => {
          const resourceData = await fetchResourceById(resourceId);
          return resourceData.success !== false
            ? { ...resourceData, id: resourceId }
            : null;
        })
      );
      // Сортуємо resourcesData за date від найновішого до найстарішого
      setResources(
        resourcesData
          .filter(Boolean)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    } catch (error) {
      console.error('Помилка завантаження даних профілю:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfileData();
  }, [id]);

  // Генеруємо аватарку, коли userData оновлено
  useEffect(() => {
    if (userData) {
      const avatarGenerate = generateAvatar(userData.username);
      setAvatar(avatarGenerate);
      switch (userData.relationshipStatus) {
        case 'friend':
          setRelationshipStatus('friends');
          break;
        case 'subscriber':
          setRelationshipStatus('follower');
          break;
        case 'subscription':
          setRelationshipStatus('following');
          break;
        default:
          setRelationshipStatus('follow');
      }
    }
  }, [userData]);

  const handleFollowClick = async () => {
    try {
      if (
        relationshipStatus === 'friends' ||
        relationshipStatus === 'following'
      ) {
        setIsModalOpen(true);
      } else if (relationshipStatus === 'follower') {
        const response = await addSubscribe(userData.id);
        if (response.success) {
          setRelationshipStatus('friends');
          toast.success('Ви стали друзями!');
        }
      } else if (relationshipStatus === 'follow') {
        const response = await addSubscribe(userData.id);
        if (response.success) {
          setRelationshipStatus('following');
          toast.success('Ви почали стежити за користувачем!');
        }
      }
    } catch (error) {
      toast.error('Не вдалося підписатися');
    }
  };

  const confirmUnfollow = async () => {
    try {
      if (relationshipStatus === 'friends') {
        const response = await deleteSubscribe(userData.id);
        if (response.success) {
          setRelationshipStatus('follower');
          toast.success('Дружба скасована');
        }
      } else if (relationshipStatus === 'following') {
        const response = await deleteSubscribe(userData.id);
        if (response.success) {
          setRelationshipStatus('follow');
          toast.success('Підписку скасовано');
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Не вдалося скасувати підписку');
      setIsModalOpen(false);
    }
  };

  const cancelUnfollow = () => {
    setIsModalOpen(false);
  };

  const getButtonText = () => {
    switch (relationshipStatus) {
      case 'friends':
        return t('friends');
      case 'follower':
        return t('follower');
      case 'following':
        return t('following');
      case 'follow':
      default:
        return t('follow');
    }
  };

  const getButtonStyle = () => {
    return relationshipStatus === 'follow'
      ? `${styles.followButton} ${styles.followButtonAlt}`
      : styles.followButton;
  };

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <LayoutFooter showPlus={true} showSearch={true}>
      <div className={styles.container}>
        <div
          className={styles.avatar}
          style={{ backgroundColor: avatar?.backgroundColor }}
        >
          {avatar?.initials || ''}
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userHeader}>
            <div className={styles.username}>{userData.username}</div>
            <div className={styles.stats}>
              {userData.subscriberCount} {t('followers_profile')} |{' '}
              {userData.subscriptionCount} {t('followings')}
            </div>
            <motion.div
              className={getButtonStyle()}
              onClick={handleFollowClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.followButtonText}>{getButtonText()}</div>
              <div className={styles.icon}></div>
            </motion.div>
          </div>
          <div className={styles.description}>
            {t('description')}: {userData.description || t('no_description')}
          </div>
          <div className={styles.location}>
            {t('location')}: {userData.location || t('no_location')}
          </div>
        </div>
      </div>

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

      <div className={styles.tabContent}>
        {activeTab === 'sets' ? (
          questionSets.length > 0 ? (
            <div className={styles.questionSetsGrid}>
              {questionSets.map((set) => (
                <QuestionSetComponent key={set.id} {...set} />
              ))}
            </div>
          ) : (
            <div className={`${styles.noResultsMessage} noResultsMessage`}>
              {t('no_question_sets_profile')}
            </div>
          )
        ) : resources.length > 0 ? (
          <div className={styles.resourcesList}>
            {resources.map((resource) => (
              <ResourceComponent
                key={resource.id}
                {...resource}
                report={true}
              />
            ))}
          </div>
        ) : (
          <div className={`${styles.noResultsMessage} noResultsMessage`}>
            {t('no_resources_profile')}
          </div>
        )}
      </div>
    </LayoutFooter>
  );
};

export default PeopleProfilePage;
