// LandingPage/index.jsx
import React from 'react';
import styles from './styles.module.css';
import Header from './Header';
import AboutSection from './AboutSection';
import OurMainFeatures from './OurMainFeatures';
import FlashcardBlock from './FlashCardBlock';
import DescriptionPremium from './DescriptionPremium';
import FooterComponent from 'components/UI/FooterComponent';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/login');
  };
  return (
    <div className={styles.landingPage}>
      <Header handleOnClick={handleOnClick} />
      <AboutSection handleOnClick={handleOnClick} />
      <OurMainFeatures />
      <FlashcardBlock handleOnClick={handleOnClick} />
      <DescriptionPremium handleOnClick={handleOnClick} />
      <FooterComponent isLanding={true} />
    </div>
  );
};

export default LandingPage;
