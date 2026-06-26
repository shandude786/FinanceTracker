import TransactionItem from '../TransactionItem/TransactionItem';
import styles from './TransactionList.module.css';

const TransactionList = ({ incomeTransactions, expenseTransactions, onDelete, onEdit }) => {
  const hasIncome = incomeTransactions.length > 0;
  const hasExpense = expenseTransactions.length > 0;

  if (!hasIncome && !hasExpense) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📭</span>
        <p className={styles.emptyTitle}>No transactions yet</p>
        <p className={styles.emptyHint}>Tap the + button to add one</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {hasIncome && (
        <div className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={`${styles.dot} ${styles.incomeDot}`} />
            <span className={styles.groupTitle}>Income</span>
            <span className={styles.badge}>{incomeTransactions.length}</span>
          </div>
          <div>
            {incomeTransactions.map((t) => (
              <TransactionItem key={t.id} transaction={t} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        </div>
      )}

      {hasExpense && (
        <div className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={`${styles.dot} ${styles.expenseDot}`} />
            <span className={styles.groupTitle}>Expense</span>
            <span className={styles.badge}>{expenseTransactions.length}</span>
          </div>
          <div>
            {expenseTransactions.map((t) => (
              <TransactionItem key={t.id} transaction={t} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
