import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';
import { createReport } from 'api/apiReports';

const ReportComponent = ({ id, type, onClose }) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('');
  const [otherText, setOtherText] = useState('');
  const [isReported, setIsReported] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option !== 'other') {
      setOtherText('');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const reasons = t('reasons', { returnObjects: true });

  const handleReport = async () => {
    let reportFunction;

    // Перевірка, чи обрано радіо-баттон
    if (!selectedOption) {
      toast.error(t('Please select a reporting reason.'));
      return;
    }

    // Перевірка, чи обрано 'other' і чи є текст у текстовому полі
    if (
      (selectedOption.toLowerCase() === 'other' ||
        selectedOption.toLowerCase() === 'інше') &&
      otherText.trim() === ''
    ) {
      toast.error(t('Please provide a description for your reason.'));
      return;
    }

    // Формуємо контекст з selectedOption та otherText
    const context = `${selectedOption} ${otherText}`;

    // Викликаємо функцію для створення звіту
    try {
      switch (type) {
        case 'set':
          await createReport('set', id, context);
          break;
        case 'resource':
          await createReport('resource', id, context);
          break;
        case 'user':
          await createReport('user', id, context);
          break;
        default:
          console.error('Unknown report type:', type);
          return;
      }

      toast.success(t('Your report has been sent successfully!'));
      setIsReported(true); // Встановлюємо, що звіт надіслано
    } catch (error) {
      toast.error(
        t('There was an error submitting your report. Please try again.')
      );
      console.error('Error creating report:', error);
    }
  };

  const handleClose = () => {
    setIsReported(false);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalBackground} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span>{t('reportThis', { type })}</span>
          <button className={styles.closeButton} onClick={handleClose}>
            X
          </button>
        </div>
        {isReported ? (
          <p className={styles.subheader}>{t('text reported')}</p>
        ) : (
          <>
            <p className={styles.subheader}>{t('whyReport')}</p>
            <div className={styles.options}>
              {reasons.map((option, index) => {
                const value =
                  option === t('other') ? 'other' : option.toLowerCase();
                return (
                  <label
                    key={index}
                    className={`${styles.option} ${selectedOption === value ? styles.selected : ''}`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={value}
                      checked={selectedOption === value}
                      onChange={() => handleOptionChange(value)}
                      className={styles.radio}
                    />
                    <span>{option}</span>
                    {(option === 'Other' || option === 'Інше') &&
                      (selectedOption === 'other' ||
                        selectedOption === 'інше') && (
                        <textarea
                          className={styles.inlineOtherInput}
                          value={otherText}
                          onChange={(e) => setOtherText(e.target.value)}
                          placeholder={t('describeReason')}
                        />
                      )}
                  </label>
                );
              })}
            </div>
            <button className={styles.reportButton} onClick={handleReport}>
              {t('reportButton')}
            </button>
          </>
        )}
        {isReported && (
          <button className={styles.okButton} onClick={handleClose}>
            OK
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ReportComponent;
