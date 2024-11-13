import React, { useState } from 'react';
import styles from './styles.module.css';
import SupportRequestModal from '../SupportRequestModal';

function FooterComponent({ isLanding }) {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const openSupportModal = () => {
    setIsSupportModalOpen(true);
  };

  const closeSupportModal = () => {
    setIsSupportModalOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>PrepWise</div>
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            Terms of Service
          </a>
          <a href="#" className={styles.link}>
            Privacy Policy
          </a>
          <a href="#" onClick={openSupportModal} className={styles.link}>
            Contact Us
          </a>
        </div>
        <div className={styles.socialMedia}>
          <a
            href="https://www.instagram.com/soonnias"
            className={styles.socialIcon}
          >
            <img src="/icons/FooterComponent/inst,faceb,tw.svg" alt="icons" />
          </a>
        </div>
      </div>
      <div className={styles.copyRight}>
        &copy; {new Date().getFullYear()} PrepWise. All rights reserved.
      </div>

      {/* Модальне вікно для запиту підтримки */}
      {isSupportModalOpen && !isLanding && (
        <SupportRequestModal onClose={closeSupportModal} />
      )}
    </footer>
  );
}

export default FooterComponent;
