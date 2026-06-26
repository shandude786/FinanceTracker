import { ALL_CATEGORIES } from '../../constants/categories';
import { formatCurrency } from '../../utils/formatCurrency';
import styles from './TransactionItem.module.css';

const TransactionItem = ({ transaction, onDelete, onEdit }) => {
  const category = ALL_CATEGORIES.find((c) => c.id === transaction.categoryId);

  return (
    <div className={styles.item}>
      <div className={styles.iconWrap}>{category?.icon ?? '💰'}</div>

      <div className={styles.details}>
        <span className={styles.description}>
          {transaction.description || category?.label || 'Transaction'}
        </span>
        <span className={styles.meta}>{category?.label}</span>
      </div>

      <span
        className={`${styles.amount} ${
          transaction.type === 'income' ? styles.income : styles.expense
        }`}
      >
        {transaction.type === 'income' ? '+' : '−'}&nbsp;
        {formatCurrency(transaction.amount)}
      </span>

      <div className={styles.actions}>
        <button
          className={styles.editBtn}
          onClick={() => onEdit(transaction)}
          aria-label="Edit transaction"
          title="Edit"
        >
          ✏️
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(transaction.id)}
          aria-label="Delete transaction"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
