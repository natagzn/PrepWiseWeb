import React from 'react';
import styles from './styles.module.css';
import FooterComponent from 'components/UI/FooterComponent';
import HeaderComponent from 'components/UI/HeaderComponent';

const LayoutFooter = ({
  children,
  showSearch = false,
  showPlus = false,
  showPremium = false,
}) => (
  <div className={styles.layoutFooter}>
    <HeaderComponent
      showSearch={showSearch}
      showPlus={showPlus}
      showPremium={showPremium}
    />
    <div className={styles.content}>{children}</div>
    <FooterComponent />
  </div>
);

export default LayoutFooter;
