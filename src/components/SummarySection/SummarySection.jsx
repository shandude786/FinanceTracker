import { formatCurrency } from '../../utils/formatCurrency';
import styles from './SummarySection.module.css';

const SummarySection = ({ totalIncome, totalExpense }) => {
  return (
    <div className={styles.section}>
      <div className={`${styles.card} ${styles.incomeCard}`}>
        <span className={styles.icon}>💰</span>
        <div className={styles.body}>
          <span className={styles.label}>Income</span>
          <span className={styles.amount}>{formatCurrency(totalIncome)}</span>
        </div>
      </div>

      <div className={`${styles.card} ${styles.expenseCard}`}>
        <span className={styles.icon}>💸</span>
        <div className={styles.body}>
          <span className={styles.label}>Expense</span>
          <span className={styles.amount}>{formatCurrency(totalExpense)}</span>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
