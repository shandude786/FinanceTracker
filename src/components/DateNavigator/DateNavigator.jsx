import {
  formatDayDisplay,
  formatMonthDisplay,
  formatYearDisplay,
} from '../../utils/dateHelpers';
import { formatCurrency } from '../../utils/formatCurrency';
import styles from './DateNavigator.module.css';

const DateNavigator = ({ activeTab, selectedDate, savings, onNavigate }) => {
  const getDisplay = () => {
    if (activeTab === 'daily') return formatDayDisplay(selectedDate);
    if (activeTab === 'monthly')
      return { primary: formatMonthDisplay(selectedDate), secondary: null };
    return { primary: formatYearDisplay(selectedDate), secondary: null };
  };

  const { primary, secondary } = getDisplay();

  const savingsClass =
    savings > 0
      ? styles.positive
      : savings < 0
      ? styles.negative
      : styles.neutral;

  return (
    <div className={styles.navigator}>
      <button
        className={styles.arrow}
        onClick={() => onNavigate(-1)}
        aria-label="Previous"
      >
        ‹
      </button>

      <div className={styles.center}>
        {secondary && <span className={styles.secondary}>{secondary}</span>}
        <span className={styles.primary}>{primary}</span>
        <span className={`${styles.savingsBadge} ${savingsClass}`}>
          Savings:&nbsp;{formatCurrency(savings)}
        </span>
      </div>

      <button
        className={styles.arrow}
        onClick={() => onNavigate(1)}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
};

export default DateNavigator;
