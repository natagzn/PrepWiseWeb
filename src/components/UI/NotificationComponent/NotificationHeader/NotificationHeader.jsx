// NotificationHeader.js
import styles from './NotificationHeader.module.css';

const NotificationHeader = ({ iconColor, title, count, icon }) => {
  // Перевірка, чи це awardIcon
  const isAwardIcon = icon && icon.includes('award'); // Змінюйте на правильний шлях або назву, якщо потрібно

  return (
    <div className={styles.headerContainer}>
      <div className={styles.icon} style={{ background: iconColor }}>
        {/* Відображаємо іконку, якщо вона є */}
        {icon && (
          <img
            src={icon}
            alt={title}
            className={
              isAwardIcon ? styles.iconImageLarge : styles.iconImageSmall
            }
          />
        )}
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{title}</div>
        {count && (
          <div className={styles.count}>
            <div className={styles.countText}>{count}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationHeader;
