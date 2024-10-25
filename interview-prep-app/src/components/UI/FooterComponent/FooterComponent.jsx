import React from 'react';
import styles from './FooterComponent.module.css';

import iconsSocial from './inst, faceb, tw.svg';

function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>PrepWise</div>
        <div className={styles.links}>
          <a href="/terms" className={styles.link}>
            Terms of Service
          </a>
          <a href="/privacy" className={styles.link}>
            Privacy Policy
          </a>
          <a href="/contact" className={styles.link}>
            Contact Us
          </a>
        </div>
        <div className={styles.socialMedia}>
          <a href="#" className={styles.socialIcon}>
            <img src={iconsSocial} alt="icons" />
          </a>
        </div>
      </div>
      <div className={styles.copyRight}>
        &copy; {new Date().getFullYear()} PrepWise. All rights reserved.
      </div>
    </footer>
  );
}

export default FooterComponent;
