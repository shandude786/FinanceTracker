import { useLocalStorage } from './useLocalStorage';
import { filterTransactions } from '../utils/dateHelpers';
import { SEED_DATA } from '../data/seedData';

const STORAGE_KEY = 'finance_tracker_transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEY, SEED_DATA);

  /** Add a new transaction */
  const addTransaction = ({ type, categoryId, description, amount, date }) => {
    const newTransaction = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      type,
      categoryId,
      description: description ? description.trim() : '',
      amount: parseFloat(amount),
      date,
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  /** Remove a transaction by id */
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  /** Update editable fields of an existing transaction */
  const updateTransaction = (id, { type, categoryId, description, amount }) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              type,
              categoryId,
              description: description ? description.trim() : '',
              amount: parseFloat(amount),
            }
          : t
      )
    );
  };

  /** Return transactions matching the current tab + date */
  const getFiltered = (tab, dateKey) =>
    filterTransactions(transactions, tab, dateKey);

  return { transactions, addTransaction, deleteTransaction, updateTransaction, getFiltered };
};
